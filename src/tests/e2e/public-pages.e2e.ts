import { test, expect } from "@playwright/test";

/**
 * E2E tests for public-facing pages.
 * These run against the live stack and verify that key pages load,
 * data is rendered, and navigation works correctly.
 */

test.describe("Public leaderboard — /leaderboard", () => {
  test("page loads and displays team rankings", async ({ page }) => {
    await page.goto("/leaderboard");

    // The page should load without error
    await expect(page).not.toHaveTitle(/error|404|not found/i);

    // There should be at least one leaderboard entry visible
    // (assumes the database has been seeded)
    await expect(
      page.getByRole("table").or(page.locator("[data-testid='leaderboard-row']")).or(
        page.getByText(/rank|points|team/i)
      )
    ).toBeVisible({ timeout: 10_000 });
  });

  test("leaderboard shows team names and points", async ({ page }) => {
    await page.goto("/leaderboard");
    await page.waitForLoadState("networkidle");

    // After seeding, the leaderboard should show team names from the seed data
    // Kabayan Connect is the highest-scoring team in the seed (46 points)
    await expect(
      page.getByText(/Kabayan|Tindahan|team/i)
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Teams page — /teams", () => {
  test("page loads and displays team cards", async ({ page }) => {
    await page.goto("/teams");

    await expect(page).not.toHaveTitle(/error|404/i);
    await expect(
      page.getByRole("main").or(page.locator("[data-testid='team-card']")).or(
        page.getByText(/hacker|hustler|hipster|hound/i)
      )
    ).toBeVisible({ timeout: 10_000 });
  });

  test("clicking a team card navigates to the team detail page", async ({ page }) => {
    await page.goto("/teams");
    await page.waitForLoadState("networkidle");

    // Click the first team card/link
    const firstTeamLink = page.getByRole("link").filter({ hasText: /team|tech|labs|squad/i }).first();
    const href = await firstTeamLink.getAttribute("href");

    if (href) {
      await firstTeamLink.click();
      await page.waitForLoadState("networkidle");
      expect(page.url()).toContain("/teams/");
    }
  });
});

test.describe("Landing page — /", () => {
  test("home page loads without error", async ({ page }) => {
    await page.goto("/");
    await expect(page).not.toHaveTitle(/error|404|not found/i);
    // The main hero content should be visible
    await expect(page.getByRole("main")).toBeVisible({ timeout: 10_000 });
  });

  test("apply button links to the application form", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const applyLink = page.getByRole("link", { name: /apply|join/i }).first();
    const href = await applyLink.getAttribute("href");
    expect(href).toMatch(/\/apply/);
  });
});

test.describe("Curriculum page — /curriculum", () => {
  test("page loads and shows week-by-week curriculum", async ({ page }) => {
    await page.goto("/curriculum");

    await expect(page).not.toHaveTitle(/error|404/i);
    await expect(
      page.getByText(/week 1|week 2|landing page|12.week/i)
    ).toBeVisible({ timeout: 10_000 });
  });
});
