import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockReset } from "vitest-mock-extended";

// ---------------------------------------------------------------------------
// Module mocks
// The async factory pattern works with ESM: vi.mock is hoisted but the factory
// runs asynchronously, allowing dynamic imports of the shared mock singleton.
// ---------------------------------------------------------------------------

vi.mock("@/lib/prisma", async () => {
  const { prismaMock } = await import("@/tests/helpers/prisma-mock");
  return { prisma: prismaMock };
});

vi.mock("bcryptjs", () => ({
  compare: vi.fn(),
}));

import { compare } from "bcryptjs";
import { authOptions } from "@/lib/auth-options";
import { prismaMock } from "@/tests/helpers/prisma-mock";

// Pull the authorize function from the resolved providers array.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const provider = (authOptions.providers[0] as any).options as {
  authorize: (
    credentials: Record<string, string> | undefined,
    req: Request
  ) => Promise<unknown>;
};

const fakeAdmin = {
  id: "admin-cuid-001",
  email: "admin@sbv.one",
  password: "hashed-admin-password",
  createdAt: new Date(),
};

const fakeMember = {
  id: "member-cuid-001",
  email: "member@team.ph",
  name: "Ana Santos",
  role: "HACKER" as const,
  avatar: null,
  skills: ["React"],
  bio: "Developer",
  password: "hashed-member-password",
  teamId: "team-cuid-001",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// =============================================================================
// authorize callback
// =============================================================================

describe("authOptions.providers[0].authorize — credentials guard", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    vi.clearAllMocks();
  });

  it("returns null when credentials argument is null/undefined", async () => {
    const result = await provider.authorize(undefined, {} as Request);
    expect(result).toBeNull();
    expect(prismaMock.admin.findUnique).not.toHaveBeenCalled();
  });

  it("returns null when email is an empty string", async () => {
    const result = await provider.authorize({ email: "", password: "pw" }, {} as Request);
    expect(result).toBeNull();
  });

  it("returns null when password is an empty string", async () => {
    const result = await provider.authorize({ email: "a@b.com", password: "" }, {} as Request);
    expect(result).toBeNull();
  });
});

describe("authOptions.providers[0].authorize — admin path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    vi.clearAllMocks();
  });

  it("returns an admin user object with role 'admin' on correct credentials", async () => {
    prismaMock.admin.findUnique.mockResolvedValue(fakeAdmin as never);
    vi.mocked(compare).mockResolvedValue(true as never);

    const result = await provider.authorize(
      { email: fakeAdmin.email, password: "correct-password" },
      {} as Request
    ) as Record<string, unknown>;

    expect(result).not.toBeNull();
    expect(result.id).toBe(fakeAdmin.id);
    expect(result.email).toBe(fakeAdmin.email);
    expect(result.role).toBe("admin");
    expect(result.name).toBe("Admin");
    expect(result.teamId).toBeUndefined();
  });

  it("returns null when admin password is wrong", async () => {
    prismaMock.admin.findUnique.mockResolvedValue(fakeAdmin as never);
    vi.mocked(compare).mockResolvedValue(false as never);

    const result = await provider.authorize(
      { email: fakeAdmin.email, password: "wrong-password" },
      {} as Request
    );
    expect(result).toBeNull();
  });

  it("does NOT fall through to member lookup when admin exists and password is correct", async () => {
    prismaMock.admin.findUnique.mockResolvedValue(fakeAdmin as never);
    vi.mocked(compare).mockResolvedValue(true as never);

    await provider.authorize({ email: fakeAdmin.email, password: "correct" }, {} as Request);

    expect(prismaMock.teamMember.findUnique).not.toHaveBeenCalled();
  });

  it("does NOT fall through to member lookup when admin exists and password is wrong", async () => {
    prismaMock.admin.findUnique.mockResolvedValue(fakeAdmin as never);
    vi.mocked(compare).mockResolvedValue(false as never);

    await provider.authorize({ email: fakeAdmin.email, password: "wrong" }, {} as Request);

    expect(prismaMock.teamMember.findUnique).not.toHaveBeenCalled();
  });
});

describe("authOptions.providers[0].authorize — member path", () => {
  beforeEach(() => {
    mockReset(prismaMock);
    vi.clearAllMocks();
    prismaMock.admin.findUnique.mockResolvedValue(null);
  });

  it("returns a member user object with role 'member' on correct credentials", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(fakeMember as never);
    vi.mocked(compare).mockResolvedValue(true as never);

    const result = await provider.authorize(
      { email: fakeMember.email, password: "correct-password" },
      {} as Request
    ) as Record<string, unknown>;

    expect(result).not.toBeNull();
    expect(result.id).toBe(fakeMember.id);
    expect(result.role).toBe("member");
    expect(result.teamId).toBe(fakeMember.teamId);
  });

  it("returns null when member password is wrong", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(fakeMember as never);
    vi.mocked(compare).mockResolvedValue(false as never);

    const result = await provider.authorize(
      { email: fakeMember.email, password: "wrong" },
      {} as Request
    );
    expect(result).toBeNull();
  });

  it("returns null when member has a null password (passwordless account)", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue({ ...fakeMember, password: null } as never);

    const result = await provider.authorize(
      { email: fakeMember.email, password: "any-password" },
      {} as Request
    );

    expect(result).toBeNull();
    expect(compare).not.toHaveBeenCalled();
  });

  it("returns null when no admin or member exists for the given email", async () => {
    prismaMock.teamMember.findUnique.mockResolvedValue(null);
    const result = await provider.authorize(
      { email: "ghost@nowhere.com", password: "anything" },
      {} as Request
    );
    expect(result).toBeNull();
  });
});

// =============================================================================
// JWT callback
// =============================================================================

describe("authOptions.callbacks.jwt", () => {
  const jwtCallback = authOptions.callbacks!.jwt!;

  it("stores id, role and teamId in token on first sign-in", async () => {
    const result = await jwtCallback({
      token: { sub: "u1" },
      user: { id: "u1", email: "m@t.ph", name: "Ana", role: "member" as never, teamId: "team-001" },
      trigger: "signIn",
      account: null,
      isNewUser: false,
    } as Parameters<typeof jwtCallback>[0]);

    expect(result.id).toBe("u1");
    expect(result.role).toBe("member");
    expect(result.teamId).toBe("team-001");
  });

  it("stores admin role and undefined teamId", async () => {
    const result = await jwtCallback({
      token: { sub: "a1" },
      user: { id: "a1", email: "admin@sbv.one", name: "Admin", role: "admin" as never },
      trigger: "signIn",
      account: null,
      isNewUser: false,
    } as Parameters<typeof jwtCallback>[0]);

    expect(result.role).toBe("admin");
    expect(result.teamId).toBeUndefined();
  });

  it("does not mutate token when user is absent (JWT refresh)", async () => {
    const token = { sub: "u1", id: "u1", role: "member", teamId: "team-001" };
    const result = await jwtCallback({
      token,
      trigger: "update",
      user: undefined as never,
      account: null,
      isNewUser: false,
    } as Parameters<typeof jwtCallback>[0]);

    expect(result.id).toBe("u1");
    expect(result.role).toBe("member");
    expect(result.teamId).toBe("team-001");
  });
});

// =============================================================================
// session callback
// =============================================================================

describe("authOptions.callbacks.session", () => {
  const sessionCallback = authOptions.callbacks!.session!;

  it("maps token fields onto session.user", async () => {
    const result = await sessionCallback({
      session: { user: { email: "m@t.ph", name: "Ana", image: null }, expires: "2099" } as never,
      token: { sub: "u1", id: "u1", role: "member", teamId: "team-001" } as never,
    } as Parameters<typeof sessionCallback>[0]);

    expect(result.user.id).toBe("u1");
    expect(result.user.role).toBe("member");
    expect(result.user.teamId).toBe("team-001");
  });

  it("maps admin token correctly — teamId is undefined", async () => {
    const result = await sessionCallback({
      session: { user: { email: "admin@sbv.one", name: "Admin", image: null }, expires: "2099" } as never,
      token: { sub: "a1", id: "a1", role: "admin", teamId: undefined } as never,
    } as Parameters<typeof sessionCallback>[0]);

    expect(result.user.id).toBe("a1");
    expect(result.user.role).toBe("admin");
    expect(result.user.teamId).toBeUndefined();
  });
});

// =============================================================================
// authOptions configuration
// =============================================================================

describe("authOptions configuration", () => {
  it("uses JWT session strategy", () => {
    expect(authOptions.session?.strategy).toBe("jwt");
  });

  it("session maxAge is 8 hours", () => {
    expect(authOptions.session?.maxAge).toBe(8 * 60 * 60);
  });

  it("signIn page is '/admin'", () => {
    expect(authOptions.pages?.signIn).toBe("/admin");
  });

  it("has exactly one credentials provider", () => {
    expect(authOptions.providers).toHaveLength(1);
  });
});
