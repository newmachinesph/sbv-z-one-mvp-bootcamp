import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.resolve(
  __dirname,
  "../public/blueprint/Z-One-Forge-Blueprint.pdf"
);
const URL = "http://localhost:3000/blueprint/render";

// A4 dimensions in mm
const A4_W = 210;
const A4_H = 297;

async function main() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Viewport: 960px wide, A4 proportions
  const PX_W = 960;
  const PX_H = Math.round(PX_W * (A4_H / A4_W));
  await page.setViewport({ width: PX_W, height: PX_H, deviceScaleFactor: 2 });

  console.log(`Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

  // Wait for all images to load
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve(undefined);
            img.onload = () => resolve(undefined);
            img.onerror = () => resolve(undefined);
          })
      )
    );
  });

  // Extra wait for fonts and rendering
  await new Promise((r) => setTimeout(r, 3000));

  // Hide Vercel dev toolbar / Next.js debug overlays
  await page.evaluate(() => {
    // Vercel toolbar
    document.querySelectorAll("[data-vercel-toolbar]").forEach((el) => el.remove());
    // Next.js dev indicator
    document.querySelectorAll("nextjs-portal, [data-nextjs-dialog-overlay], [data-nextjs-toast]").forEach((el) => el.remove());
    // Any fixed/sticky element at bottom-left that isn't part of whitepaper
    document.querySelectorAll("body > div").forEach((el) => {
      const s = window.getComputedStyle(el);
      if ((s.position === "fixed" || s.position === "sticky") && !el.id?.includes("blueprint")) {
        el.remove();
      }
    });
  });

  // Get bounding boxes for each whitepaper page element
  const boxes = await page.evaluate(() => {
    const pages = document.querySelectorAll("[data-blueprint-page]");
    return Array.from(pages).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });
  });

  console.log(`Found ${boxes.length} pages, capturing screenshots...`);

  // Screenshot each page element individually, then assemble into PDF
  // Using jsPDF via a simple approach: screenshot each page -> compose PDF
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let i = 0; i < boxes.length; i++) {
    console.log(`  Page ${i + 1} of ${boxes.length}...`);

    const el = (await page.$$("[data-blueprint-page]"))[i];
    const screenshot = await el.screenshot({
      type: "jpeg",
      quality: 92,
      encoding: "base64",
    });

    if (i > 0) pdf.addPage();
    pdf.addImage(
      `data:image/jpeg;base64,${screenshot}`,
      "JPEG",
      0,
      0,
      A4_W,
      A4_H
    );
  }

  console.log("Saving PDF...");
  const fs = await import("fs");
  fs.writeFileSync(OUTPUT, Buffer.from(pdf.output("arraybuffer")));

  console.log(`PDF saved to ${OUTPUT}`);
  await browser.close();
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
