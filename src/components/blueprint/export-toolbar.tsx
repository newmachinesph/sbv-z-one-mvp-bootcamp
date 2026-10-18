"use client";

import { useState } from "react";
import { Download, ImageIcon } from "lucide-react";

/**
 * Clone a page element into an offscreen container positioned at (0,0)
 * so html-to-image captures it without centering margin offsets.
 */
function createOffscreenClone(el: HTMLElement, w: number, h: number) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `position:fixed;left:0;top:0;width:${w}px;height:${h}px;z-index:-9999;overflow:hidden;`;
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.margin = "0";
  clone.style.width = `${w}px`;
  clone.style.maxWidth = `${w}px`;
  clone.style.height = `${h}px`;
  clone.style.aspectRatio = "auto";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);
  return { wrapper, clone };
}

export function ExportToolbar() {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState("");

  async function handlePDF() {
    setExporting(true);
    setProgress("Preparing...");

    try {
      const [{ toCanvas }, { default: jsPDF }] = await Promise.all([
        import("html-to-image"),
        import("jspdf"),
      ]);

      const pages = document.querySelectorAll("[data-blueprint-page]");
      const A4_W = 210;
      const A4_H = 297;
      const PX_W = 960;
      const PX_H = Math.round(PX_W * (A4_H / A4_W)); // 1357
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      for (let i = 0; i < pages.length; i++) {
        setProgress(`Rendering page ${i + 1} of ${pages.length}...`);

        // Clone into offscreen container at (0,0) to avoid centering offset
        const { wrapper, clone } = createOffscreenClone(
          pages[i] as HTMLElement,
          PX_W,
          PX_H
        );

        // Let browser reflow
        await new Promise((r) => setTimeout(r, 100));

        const canvas = await toCanvas(clone, {
          pixelRatio: 2,
          cacheBust: true,
          width: PX_W,
          height: PX_H,
        });

        // Clean up
        document.body.removeChild(wrapper);

        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, A4_W, A4_H);
      }

      setProgress("Saving PDF...");
      pdf.save("Z1-Forge-Blueprint.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      setProgress("Export failed. Check console.");
      setTimeout(() => setProgress(""), 3000);
      return;
    } finally {
      setExporting(false);
      setProgress("");
    }
  }

  async function handleImage() {
    setExporting(true);
    setProgress("Capturing image...");

    try {
      const { toPng } = await import("html-to-image");
      const root = document.getElementById("blueprint-root");
      if (!root) return;

      const dataUrl = await toPng(root, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "Z1-Forge-Blueprint.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image export failed:", err);
      setProgress("Export failed. Check console.");
      setTimeout(() => setProgress(""), 3000);
      return;
    } finally {
      setExporting(false);
      setProgress("");
    }
  }

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 print:hidden">
      {/* Progress overlay */}
      {exporting && progress && (
        <span
          className="rounded-full bg-black/90 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {progress}
        </span>
      )}

      {/* Download PDF */}
      <button
        type="button"
        onClick={handlePDF}
        disabled={exporting}
        className="inline-flex items-center gap-2 rounded-full bg-[rgba(31,26,11,0.85)] backdrop-blur-[24px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#F59E0B] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <Download className="h-4 w-4" />
        Download PDF
      </button>

      {/* Save as Image */}
      <button
        type="button"
        onClick={handleImage}
        disabled={exporting}
        className="inline-flex items-center gap-2 rounded-full bg-[rgba(31,26,11,0.85)] backdrop-blur-[24px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#F59E0B] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <ImageIcon className="h-4 w-4" />
        Save as Image
      </button>
    </div>
  );
}
