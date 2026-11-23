import { useState, useRef, useEffect } from "react";


const optimizeVideo = (url) => {
  if (!url || !url.includes("/upload/")) return url;

  return url.replace("/upload/", "/upload/f_auto,q_auto,w_540/");
};


const getPoster = (url) => {
  if (!url || !url.includes("/upload/")) return undefined;

  return url
    .replace("/upload/", "/upload/so_0,f_jpg,q_auto,w_540/")
    .replace(/\.(mp4|mov|webm|m4v)$/i, ".jpg");
};

export default function LazyVideo({ src, className = "" }) {
  const [active, setActive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (active) {
      videoRef.current?.play().catch(() => {});
      return;
    }

    setActive(true);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !active) return;

    video.load();

    const playVideo = () => {
      video.play().catch(() => {
        setPlaying(false);
      });
    };

    video.addEventListener("loadeddata", playVideo, { once: true });

    return () => {
      video.removeEventListener("loadeddata", playVideo);
    };
  }, [active, src]);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        src={active ? optimizeVideo(src) : undefined}
        poster={getPoster(src)}
        preload="none"
        playsInline
        controls={active}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="h-full w-full object-cover"
      />

      {!active && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl text-black shadow-lg transition-transform duration-300 hover:scale-110">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}