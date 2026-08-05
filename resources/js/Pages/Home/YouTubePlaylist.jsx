import { useState } from "react";

export default function YouTubePlaylist({ videos = [] }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="outer-wrapper mb-16 lg:mb-32">
      <div className="inner-wrapper !items-start">
        <h1 className="section-title mb-6 lg:mb-10 text-2xl lg:text-4xl self-center">
          Video Ekopraksis
        </h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {videos.map((video) => (
            <button
              key={video.video_id}
              onClick={() => setSelectedVideo(video)}
              className="
                group
                bg-white
                text-left
                overflow-hidden
                shadow-basic
                transition
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                  absolute
                  inset-0
                  bg-black/20
                  flex
                  items-center
                  justify-center
                  group-hover:bg-black/40
                  transition
                "
                >
                  <div
                    className="
                    w-14
                    h-14
                    rounded-full
                    bg-white/90
                    flex
                    items-center
                    justify-center
                    text-b200
                    text-xl
                    shadow-lg
                  "
                  >
                    ▶
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2
                  className="
                  text-lg
                  lg:text-xl
                  leading-snug
                  line-clamp-2
                "
                >
                  {video.title}
                </h2>

                <p
                  className="
                  mt-3
                  text-sm
                  font-secondary
                  text-gray-500
                "
                >
                  {new Date(video.published_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* VIDEO MODAL */}

      {selectedVideo && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/90
            flex
            items-center
            justify-center
            p-4
          "
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="
              w-full
              max-w-5xl
              bg-black
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1`}
                title={selectedVideo.title}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="bg-white p-6">
              <h2
                className="
                text-xl
                lg:text-2xl
                leading-tight
              "
              >
                {selectedVideo.title}
              </h2>

              <p
                className="
                mt-2
                text-sm
                font-secondary
                text-gray-500
              "
              >
                {new Date(selectedVideo.published_at).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>

              {selectedVideo.description && (
                <p
                  className="
                  mt-5
                  font-secondary
                  text-sm
                  leading-relaxed
                  max-h-32
                  overflow-y-auto
                "
                >
                  {selectedVideo.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
