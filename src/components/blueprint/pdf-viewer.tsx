"use client";

import dynamic from "next/dynamic";

const InternalViewer = dynamic(() => import("./pdf-viewer-internal"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-white/60 text-sm">Loading PDF viewer...</div>
    </div>
  ),
});

export function PdfViewer({ fileUrl }: { fileUrl: string }) {
  return <InternalViewer fileUrl={fileUrl} />;
}
