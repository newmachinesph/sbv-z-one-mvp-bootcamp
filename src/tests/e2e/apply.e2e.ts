import { test, expect } from "@playwright/test";

/**
 * E2E tests for the application form at /apply.
 *
 * Prerequisites:
 *   - A running dev/staging server (configured via PLAYWRIGHT_BASE_URL)
 *   - An empty or test-isolated database (no existing applicant with the
 *     test email address)
 *
 * These tests run against the real application stack including the actual
 * POST /api/apply route and database. Do NOT run against production.
 */

// Use a unique email per test run to avoid 409 conflicts on re-runs.
// The timestamp suffix ensures uniqueness within a test session.
const uniqueEmail = () => `e2e-applicant-${Date.now()}@test-only.invalid`;

test.describe("Application form — /apply", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/apply");
    // Wait for the form to be interactive
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });
  });

  // ---------------------------------------------------------------------------
  // Happy path
  // ---------------------------------------------------------------------------

  test("happy path: submits a complete application and shows success state", async ({ page }) => {
    // Fill in all required fields using stable selectors
    await page.getByLabel(/full name/i).fill("E2E Test Applicant");
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/linkedin/i).fill("https://linkedin.com/in/e2e-test-applicant");
    await page.getByLabel(/location/i).fill("Manila, Philippines");

    // Role selector — use whatever role selector the UI renders
    const roleSelect = page.getByRole("combobox").filter({ hasText: /role/i }).or(
      page.locator("select[name='preferredRole'], [data-testid='role-select']")
    );
    // If it's a native select, use selectOption; otherwise click the first option
    await roleSelect.first().selectOption({ value: "hacker" }).catch(async () => {
      await roleSelect.first().click();
      await page.getByRole("option", { name: /hacker/i }).click();
    });

    await page.getByLabel(/skills/i).fill("JavaScript, React, TypeScript");
    await page.getByLabel(/experience/i).fill(
      "3 years building web applications at various startups and agencies."
    );
    await page.getByLabel(/motivation/i).fill(
      "I want to build products that truly help people. The 4H team framework is exactly the kind of structured environment where I can contribute my best work and learn the most."
    );

    await page.getByRole("button", { name: /submit/i }).click();

    // After successful submission, the form should show a confirmation
    await expect(
      page.getByText(/application submitted/i).or(page.getByText(/received/i)).or(page.getByText(/thank you/i))
    ).toBeVisible({ timeout: 15_000 });
  });

  // ---------------------------------------------------------------------------
  // Client-side validation
  // ---------------------------------------------------------------------------

  test("shows validation error when email field is empty on submit", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("Test Name");
    // Leave email empty
    await page.getByRole("button", { name: /submit/i }).click();

    // Browser native validation or custom error message
    const emailField = page.getByLabel(/email/i);
    const isInvalid = await emailField.evaluate(
      (el) => (el as HTMLInputElement).validity?.valueMissing || (el as HTMLInputElement).validity?.typeMismatch
    );
    if (!isInvalid) {
      // Custom validation message
      await expect(page.getByText(/email.*required|invalid email/i)).toBeVisible({ timeout: 5_000 });
    }
  });

  test("shows error when LinkedIn URL does not match the expected pattern", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("Test Name");
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/linkedin/i).fill("https://github.com/not-linkedin");
    await page.getByLabel(/location/i).fill("Manila");
    await page.getByLabel(/motivation/i).fill("x".repeat(60));
    await page.getByLabel(/experience/i).fill("1 year experience");
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(
      page.getByText(/linkedin/i).or(page.getByText(/valid.*url/i))
    ).toBeVisible({ timeout: 5_000 });
  });

  test("shows error for motivation that is too short", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("Test Name");
    await page.getByLabel(/email/i).fill(uniqueEmail());
    await page.getByLabel(/linkedin/i).fill("https://linkedin.com/in/test");
    await page.getByLabel(/location/i).fill("Manila");
    await page.getByLabel(/motivation/i).fill("Too short");
    await page.getByLabel(/experience/i).fill("1 year");
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(
      page.getByText(/at least 50|motivation/i)
    ).toBeVisible({ timeout: 5_000 });
  });

  // ---------------------------------------------------------------------------
  // Duplicate detection
  // ---------------------------------------------------------------------------

  test("shows duplicate error when submitting with an already-used email", async ({ page }) => {
    // Use a static test email that we expect already exists in the test DB
    // (pre-seeded or from a prior run). Adjust this email if the test DB is fresh.
    const duplicateEmail = "duplicate-test@test-only.invalid";

    // First submission
    await page.getByLabel(/full name/i).fill("First Submission");
    await page.getByLabel(/email/i).fill(duplicateEmail);
    await page.getByLabel(/linkedin/i).fill("https://linkedin.com/in/first-sub");
    await page.getByLabel(/location/i).fill("Manila");
    await page.getByLabel(/motivation/i).fill(
      "This is my motivation to join the bootcamp and build something meaningful."
    );
    await page.getByLabel(/experience/i).fill("2 years");
    await page.getByRole("button", { name: /submit/i }).click();

    // Whether this is the first or second submission, wait for any response
    await page.waitForTimeout(2_000);

    // Reset and try again with the same email
    await page.goto("/apply");
    await expect(page.locator("form")).toBeVisible({ timeout: 10_000 });

    await page.getByLabel(/full name/i).fill("Second Submission");
    await page.getByLabel(/email/i).fill(duplicateEmail);
    await page.getByLabel(/linkedin/i).fill("https://linkedin.com/in/second-sub");
    await page.getByLabel(/location/i).fill("Cebu");
    await page.getByLabel(/motivation/i).fill(
      "This is my second attempt. I really want to join this cohort because it aligns with my goals."
    );
    await page.getByLabel(/experience/i).fill("3 years");
    await page.getByRole("button", { name: /submit/i }).click();

    await expect(
      page.getByText(/already exists|duplicate|already applied/i)
    ).toBeVisible({ timeout: 10_000 });
  });
});
