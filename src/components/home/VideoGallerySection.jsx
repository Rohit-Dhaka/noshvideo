import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  Play,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { videos } from "../../data/videos.data";

import "swiper/css";
import "swiper/css/effect-coverflow";

const categories = [
  "All",
  "3D Motion",
  "UGC Reel",
  "Commercial",
  "Product Video",
];

// Cloudinary video ko chhota + optimized banata hai (.mov bhi .mp4 ban jata hai)
const optimizeVideo = (url, width = 540) =>
  url && url.includes("/upload/")
    ? url
        .replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
        .replace(/\.(mov|mp4|webm)$/i, ".mp4")
    : url;

// Video ka pehla frame (agar thumbnail na ho)
const getPoster = (url) =>
  url && url.includes("/upload/")
    ? url
        .replace("/upload/", "/upload/so_0,f_jpg,q_auto,w_400/")
        .replace(/\.(mov|mp4|webm)$/i, ".jpg")
    : undefined;

const VideoGallerySection = () => {
  const swiperRef = useRef(null);
  const playerRef = useRef(null);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) =>
          v.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const displayVideos =
    filteredVideos.length === 0
      ? []
      : filteredVideos.length < 6
        ? [...filteredVideos, ...filteredVideos, ...filteredVideos]
        : filteredVideos;

  const canLoop = displayVideos.length >= 6;

  // Close full-screen video
  const closePlayer = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }

    setSelectedVideo(null);
  };

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo]);

  // Modal khulne par autoplay roko, band hone par chalao
  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed || !swiper.autoplay) return;

    if (selectedVideo) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [selectedVideo]);

  return (
    <>
      <section
        id="videos"
        className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-white py-20 text-slate-950 transition-colors duration-500 lg:py-28"
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto w-full px-5 sm:px-8 lg:px-12">
          {/* SECTION HEADER */}
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              {/* Label */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 shadow-sm">
                <Sparkles size={14} className="text-blue-600" />

                <span>SELECTED WORKS // 2026 SHOWREEL</span>
              </div>

              {/* Heading */}
              <h2 className="font-['Outfit'] text-[36px] font-black uppercase leading-[0.95] text-slate-950 sm:text-5xl lg:text-6xl">
                Built For Feeds.
                <span className="my-1 sm:block font-serif sm: font-bold normal-case tracking-normal text-blue-600">
                  Designed To Convert.
                </span>
              </h2>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "scale-105 border-blue-600 bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)]"
                      : "border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 3D COVERFLOW SWIPER */}
          <div className="relative mx-auto w-full">
            <Swiper
              key={activeCategory}
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              centeredSlides
              grabCursor
              slidesPerView="auto"
              loop={canLoop}
              speed={750}
              coverflowEffect={{
                rotate: 22,
                stretch: 0,
                depth: 180,
                modifier: 1.2,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const targetIndex =
                  swiper.realIndex % (filteredVideos.length || 1);

                setActiveIndex(targetIndex);
              }}
              className="!overflow-visible py-10"
            >
              {displayVideos.map((item, index) => (
                <SwiperSlide
                  key={`${item.id}-${index}`}
                  className="!h-auto !w-[220px] sm:!w-[260px] md:!w-[290px] lg:!w-[310px]"
                >
                  {({ isActive }) => (
                    <div
                      onClick={() => setSelectedVideo(item)}
                      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-[4px] bg-slate-950 transition-all duration-500 sm:border-[6px] ${
                        isActive
                          ? "z-20 scale-105 border-blue-600 shadow-[0_20px_50px_rgba(37,99,235,0.28)]"
                          : "scale-95 border-white opacity-85 shadow-md hover:opacity-100"
                      }`}
                    >
                      {/* Vertical Video */}
                      <div className="relative aspect-[9/16] w-full overflow-hidden">
                        {/* Thumbnail: hamesha dikhta hai, sirf chhoti image load hoti hai */}
                        <img
                          src={item.thumbnail || getPoster(item.video)}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Video sirf center (active) slide me load hoti hai */}
                        {isActive && !selectedVideo && (
                          <video
                            key={item.video}
                            src={optimizeVideo(item.video, 540)}
                            poster={item.thumbnail || getPoster(item.video)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}

                        {/* Vignette Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />

                        {/* Top Badges */}
                        <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between">
                          <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white">
                            {item.resolution}
                          </span>

                          <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-extrabold text-white shadow-sm">
                            <Eye size={11} />
                            <span>{item.views}</span>
                          </span>
                        </div>

                        {/* Play Button */}
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/30 text-white transition-all duration-300 ${
                              isActive
                                ? "scale-100 opacity-0 group-hover:opacity-100"
                                : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                            }`}
                          >
                            <Play
                              size={22}
                              fill="currentColor"
                              className="ml-1"
                            />
                          </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-sky-300">
                            {item.category}
                          </p>

                          <h3 className="mt-1 font-['Outfit'] text-lg font-black leading-tight text-white">
                            {item.title}
                          </h3>

                          {/* Tags */}
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white/90"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Empty State */}
            {filteredVideos.length === 0 && (
              <div className="py-16 text-center text-sm font-medium text-slate-500">
                No videos found in this category.
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous video"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-800 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>

            <span className="font-mono text-xs font-bold tracking-wider text-blue-600">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(filteredVideos.length || 1).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next video"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-slate-800 shadow-sm transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePlayer}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border-4 border-white/20 bg-slate-950 shadow-2xl sm:max-w-md"
            >
              <video
                ref={playerRef}
                src={optimizeVideo(selectedVideo.video, 720)}
                poster={selectedVideo.thumbnail || getPoster(selectedVideo.video)}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={closePlayer}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-blue-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoGallerySection;