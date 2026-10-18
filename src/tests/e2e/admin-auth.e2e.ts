import { test, expect } from "@playwright/test";

/**
 * E2E tests for admin authentication and protected route access.
 *
 * Prerequisites:
 *   - A running dev/staging server with a seeded database
 *   - Environment variables TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD set
 *     (these should match what was seeded via prisma/seed.ts or a test-specific admin)
 *
 * Set these in a .env.test.local file or your CI secrets:
 *   TEST_ADMIN_EMAIL=ryan@sbv.one
 *   TEST_ADMIN_PASSWORD=<the seeded password>
 *
 * IMPORTANT: Never run these tests against production with real admin credentials.
 */

const ADMIN_EMAIL = process.env.TEST_ADMIN_EMAIL || "ryan@sbv.one";
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD ?? "";

test.describe("Admin login — /admin", () => {
  test.skip(!ADMIN_PASSWORD, "Set TEST_ADMIN_PASSWORD to run the admin login tests.");

  test.beforeEach(async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  // ---------------------------------------------------------------------------
  // Successful login
  // ---------------------------------------------------------------------------

  test("redirects to /admin/dashboard after successful login", async ({ page }) => {
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password/i).fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/admin\/dashboard/, { timeout: 15_000 });
  });

  test("admin dashboard is accessible after login", async ({ page }) => {
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password/i).fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();

    await page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 });
    // Dashboard should show at least one stat card or heading
    await expect(
      page.getByRole("heading", { name: /dashboard/i }).or(
        page.getByText(/teams|applications|members/i)
      )
    ).toBeVisible({ timeout: 10_000 });
  });

  // ---------------------------------------------------------------------------
  // Failed login
  // ---------------------------------------------------------------------------

  test("shows error message with incorrect password", async ({ page }) => {
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password/i).fill("completely-wrong-password-xyz");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Should stay on /admin and show an error
    await expect(page).toHaveURL(/\/admin/, { timeout: 10_000 });
    await expect(
      page.getByText(/invalid credentials|incorrect|failed|error/i)
    ).toBeVisible({ timeout: 5_000 });
  });

  test("shows error with a non-existent email", async ({ page }) => {
    await page.getByLabel(/email/i).fill("nobody@doesnotexist.invalid");
    await page.getByLabel(/password/i).fill("anypassword");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/admin/, { timeout: 10_000 });
    await expect(
      page.getByText(/invalid credentials|incorrect|not found|error/i)
    ).toBeVisible({ timeout: 5_000 });
  });

  test("does not redirect to dashboard on failed login", async ({ page }) => {
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password/i).fill("wrong-password");
    await page.getByRole("button", { name: /sign in/i }).click();

    // Wait a moment then verify we did NOT end up on the dashboard
    await page.waitForTimeout(2_000);
    expect(page.url()).not.toContain("/admin/dashboard");
  });
});

test.describe("Admin protected routes — unauthenticated access", () => {
  test("redirects /admin/dashboard to login when not authenticated", async ({ page }) => {
    // Navigate directly without logging in
    await page.goto("/admin/dashboard");
    // Should be redirected to /admin (the sign-in page)
    await expect(page).toHaveURL(/\/admin(\?|$)/, { timeout: 10_000 });
  });

  test("redirects /admin/applications to login when not authenticated", async ({ page }) => {
    await page.goto("/admin/applications");
    await expect(page).toHaveURL(/\/admin(\?|$)/, { timeout: 10_000 });
  });

  test("redirects /admin/teams to login when not authenticated", async ({ page }) => {
    await page.goto("/admin/teams");
    await expect(page).toHaveURL(/\/admin(\?|$)/, { timeout: 10_000 });
  });
});

test.describe("Admin logout", () => {
  test.beforeEach(async ({ page }) => {
    // Log in first
    await page.goto("/admin");
    await page.getByLabel(/email/i).fill(ADMIN_EMAIL);
    await page.getByLabel(/password/i).fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 });
  });

  test("admin can sign out and is redirected away from dashboard", async ({ page }) => {
    // Find and click the sign-out button (could be in sidebar, dropdown, etc.)
    const signOutButton = page.getByRole("button", { name: /sign out|logout|log out/i });
    await signOutButton.click();

    // After sign-out, should be redirected to /admin login page
    await expect(page).toHaveURL(/\/admin(\?|$)/, { timeout: 10_000 });
  });

  test("accessing dashboard after sign-out redirects to login", async ({ page }) => {
    const signOutButton = page.getByRole("button", { name: /sign out|logout|log out/i });
    await signOutButton.click();
    await page.waitForURL(/\/admin(\?|$)/, { timeout: 10_000 });

    // Try accessing dashboard directly
    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/admin(\?|$)/, { timeout: 10_000 });
  });
});
