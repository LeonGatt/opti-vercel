import { expect, test } from "@playwright/test";
// import AxeBuilder from '@axe-core/playwright'

test("homepage has title and loads", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("heading", { name: "404" });
  // const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

  // expect(accessibilityScanResults.violations).toEqual([])
  // expect(await page.screenshot()).toMatchSnapshot('homepage.png')
});
