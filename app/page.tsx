"use client";

import { useState } from "react";

export default function LowResViewer() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUrl(url);
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="border px-4 py-2 w-full rounded"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          보기
        </button>
      </form>

      {submittedUrl && (
        <div className="w-full border rounded overflow-hidden">
          <div className="relative w-full h-[720px] overflow-hidden bg-black">
            <iframe
              src={submittedUrl}
              className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] transform origin-top-left"
              style={{
                filter: "blur(0.7px) contrast(0.9)",
                imageRendering: "pixelated",
                pointerEvents: "auto",
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </div>
  );
}
