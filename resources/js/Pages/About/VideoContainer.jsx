import { useRef, useState } from "react";

export default function VideoContainer() {
  const [showVideo, setShowVideo] = useState(true);
  const contentRef = useRef(null);

  return (
    <>
      <button
        className="mt-10 text-b300 font-semibold flex items-center gap-2 font-secondary tracking-wider uppercase text-2xl cursor-pointer transition-all"
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
          maxHeight: showVideo
            ? `${contentRef?.current?.scrollHeight}px`
            : "0px",
          opacity: showVideo ? 1 : 0,
        }}
      >
        <iframe
          className="w-full aspect-video mt-5"
          src="https://www.youtube.com/embed/gVESdZBrT-E?si=wD7QoRjMGN4CV9iG"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
