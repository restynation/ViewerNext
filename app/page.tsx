"use client";

import { useState, useEffect } from "react";

export default function LowResViewer() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUrl(url);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ width: dimensions.width, height: dimensions.height });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setDimensions({
      width: startSize.width + deltaX,
      height: startSize.height + deltaY
    });
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, startPos, startSize]);

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
        <div className="w-full border rounded overflow-hidden p-6">
          <div className="relative w-full h-[720px] overflow-hidden bg-black">
            <div
              className="absolute top-0 left-0"
              style={{
                width: `${dimensions.width}%`,
                height: `${dimensions.height}%`,
                cursor: isResizing ? 'grabbing' : 'grab'
              }}
            >
              <iframe
                src={submittedUrl}
                className="w-full h-full"
                style={{
                  filter: "blur(0.7px) contrast(0.9)",
                  imageRendering: "pixelated",
                  pointerEvents: "auto",
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
              <div
                className="absolute bottom-0 right-0 w-5 h-5 bg-white cursor-se-resize"
                onMouseDown={handleMouseDown}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
