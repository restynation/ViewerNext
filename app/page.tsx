"use client";

import { useState } from "react";

export default function LowResViewer() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

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
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label>Width:</label>
              <input
                type="range"
                min="50"
                max="200"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-32"
              />
              <span>{width}%</span>
            </div>
            <div className="flex items-center gap-2">
              <label>Height:</label>
              <input
                type="range"
                min="50"
                max="200"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-32"
              />
              <span>{height}%</span>
            </div>
          </div>
          <div className="w-full border rounded overflow-hidden p-6">
            <div className="relative w-full h-[720px] overflow-hidden bg-black">
              <iframe
                src={submittedUrl}
                className="absolute top-0 left-0 w-[200%] h-[200%] scale-[0.5] transform origin-top-left"
                style={{
                  filter: "blur(0.7px) contrast(0.9)",
                  imageRendering: "pixelated",
                  pointerEvents: "auto",
                  width: `${width}%`,
                  height: `${height}%`,
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
