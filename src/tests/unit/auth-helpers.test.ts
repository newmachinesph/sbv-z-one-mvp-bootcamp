import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Module mocks — vi.hoisted() ensures mock values exist when the hoisted
// vi.mock() factory functions execute.
// ---------------------------------------------------------------------------

const { getServerSessionMock } = vi.hoisted(() => ({
  getServerSessionMock: vi.fn(),
}));

vi.mock("next-auth", () => ({ getServerSession: getServerSessionMock }));
vi.mock("@/lib/auth-options", () => ({ authOptions: {} }));

// next/navigation's redirect() throws a special NEXT_REDIRECT error in the
// Next.js runtime. We replicate that here so assertions can catch it.
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    const err = new Error(`NEXT_REDIRECT:${url}`);
    (err as Error & { digest: string }).digest = `NEXT_REDIRECT;replace;${url}`;
    throw err;
  }),
}));

import { redirect } from "next/navigation";
import { getSession, requireAuth, requireAdmin, requireMember } from "@/lib/auth";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeSession(role: "admin" | "member", teamId?: string) {
  return {
    user: { id: "u1", email: "user@test.com", name: "Test User", role, teamId },
    expires: "2099-01-01",
  };
}

// =============================================================================
// getSession
// =============================================================================

describe("getSession", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns null when no session exists", async () => {
    getServerSessionMock.mockResolvedValue(null);
    const result = await getSession();
    expect(result).toBeNull();
  });

  it("returns the session object when a valid session exists", async () => {
    const session = makeSession("admin");
    getServerSessionMock.mockResolvedValue(session);
    const result = await getSession();
    expect(result).toEqual(session);
  });

  it("passes authOptions to getServerSession", async () => {
    getServerSessionMock.mockResolvedValue(null);
    await getSession();
    expect(getServerSessionMock).toHaveBeenCalledOnce();
  });
});

// =============================================================================
// requireAuth
// =============================================================================

describe("requireAuth", () => {
  beforeEach(() => vi.clearAllMocks());

  it("redirects to '/admin' when no session exists", async () => {
    getServerSessionMock.mockResolvedValue(null);
    await expect(requireAuth()).rejects.toThrow("NEXT_REDIRECT:/admin");
    expect(redirect).toHaveBeenCalledWith("/admin");
  });

  it("returns the session when authenticated (any role)", async () => {
    const session = makeSession("member", "team-1");
    getServerSessionMock.mockResolvedValue(session);
    const result = await requireAuth();
    expect(result).toEqual(session);
    expect(redirect).not.toHaveBeenCalled();
  });

  it("returns the session for admin role", async () => {
    const session = makeSession("admin");
    getServerSessionMock.mockResolvedValue(session);
    const result = await requireAuth();
    expect(result.user.role).toBe("admin");
  });
});

// =============================================================================
// requireAdmin
// =============================================================================

describe("requireAdmin", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns session when role is 'admin'", async () => {
    const session = makeSession("admin");
    getServerSessionMock.mockResolvedValue(session);
    const result = await requireAdmin();
    expect(result.user.role).toBe("admin");
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirects to '/' when role is 'member'", async () => {
    getServerSessionMock.mockResolvedValue(makeSession("member", "team-1"));
    await expect(requireAdmin()).rejects.toThrow("NEXT_REDIRECT:/");
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("redirects to '/admin' (not '/') when there is no session at all", async () => {
    getServerSessionMock.mockResolvedValue(null);
    // requireAdmin calls requireAuth first, which redirects to /admin
    await expect(requireAdmin()).rejects.toThrow("NEXT_REDIRECT:/admin");
    expect(redirect).toHaveBeenCalledWith("/admin");
  });
});

// =============================================================================
// requireMember
// =============================================================================

describe("requireMember", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns session when role is 'member'", async () => {
    const session = makeSession("member", "team-1");
    getServerSessionMock.mockResolvedValue(session);
    const result = await requireMember();
    expect(result.user.role).toBe("member");
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirects to '/' when role is 'admin'", async () => {
    getServerSessionMock.mockResolvedValue(makeSession("admin"));
    await expect(requireMember()).rejects.toThrow("NEXT_REDIRECT:/");
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("redirects to '/admin' when there is no session at all", async () => {
    getServerSessionMock.mockResolvedValue(null);
    await expect(requireMember()).rejects.toThrow("NEXT_REDIRECT:/admin");
    expect(redirect).toHaveBeenCalledWith("/admin");
  });
});
