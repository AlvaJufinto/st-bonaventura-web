import { useEffect, useRef, useState } from "react";

export default function VideoContainer() {
  const [showVideo, setShowVideo] = useState(true);
  const parentRef = useRef(null);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(showVideo ? `${contentRef.current.scrollHeight}px` : "0px");

      if (showVideo) {
        parentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [showVideo]);

  return (
    <div ref={parentRef} className="w-full">
      <button
        className="pt-24 text-b300 font-semibold flex items-center gap-2 font-secondary tracking-wider uppercase text-2xl cursor-pointer transition-all"
        onClick={() => setShowVideo(!showVideo)}
      >
        Tonton Video
        <span
          className={`transition-transform duration-300 ${
            showVideo ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        className="w-full overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight,
          opacity: showVideo ? 1 : 0,
        }}
      >
        <iframe
          className="w-full aspect-video mt-5"
          src="https://www.youtube.com/embed/J6f4IxZFJnU?si=aGS42nKDPDjmbZiE"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
