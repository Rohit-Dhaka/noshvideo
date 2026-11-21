import { useState, useRef } from "react";

// Cloudinary URL ko chhota/optimized banata hai
const optimizeVideo = (url) =>
  url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto,w_540/")
    : url;

// Video ka pehla frame image bana deta hai (poster)
const getPoster = (url) =>
  url.includes("/upload/")
    ? url
        .replace("/upload/", "/upload/so_0,f_jpg,q_auto,w_540/")
        .replace(/\.(mp4|mov|webm)$/i, ".jpg")
    : undefined;

export default function LazyVideo({ src, className = "" }) {
  const [active, setActive] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setActive(true);
    // src set hone ke baad play karo
    setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
  };

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        src={active ? optimizeVideo(src) : undefined}
        poster={getPoster(src)}
        preload="none"
        playsInline
        controls={active}
        className="h-full w-full object-cover"
      />

      {!active && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black">
            ▶
          </span>
        </button>
      )}
    </div>
  );
}