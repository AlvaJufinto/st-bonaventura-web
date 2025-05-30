import { useState } from "react";

import LazyImage from "./LazyImage";

export default function ImagePreviewer({ src, alt, className }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <div className="cursor-zoom-in" onClick={() => setIsPreviewOpen(true)}>
        <LazyImage src={src} alt={alt} className={className} />
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsPreviewOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </>
  );
}
