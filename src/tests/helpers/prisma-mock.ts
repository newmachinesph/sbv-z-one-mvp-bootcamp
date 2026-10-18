/**
 * Shared Prisma mock helper for tests.
 *
 * Usage in test files:
 *   import { prismaMock } from "@/tests/helpers/prisma-mock";
 *   vi.mock("@/lib/prisma", () => import("@/tests/helpers/prisma-mock").then(m => ({ prisma: m.prismaMock })));
 *
 * Or more idiomatically:
 *   vi.mock("@/lib/prisma", async () => {
 *     const { prismaMock } = await import("@/tests/helpers/prisma-mock");
 *     return { prisma: prismaMock };
 *   });
 *
 * NOTE: Because vi.mock is hoisted and the factory must be synchronous when
 * using the object return pattern, the simplest approach that works with ESM
 * vitest-mock-extended is to create the mock instance once here and re-use it.
 * Call mockReset(prismaMock) in beforeEach to clear state between tests.
 */
import { mockDeep } from "vitest-mock-extended";
import type { PrismaClient } from "@prisma/client";

export const prismaMock = mockDeep<PrismaClient>();
