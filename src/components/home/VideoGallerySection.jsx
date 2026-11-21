
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

  // Play active center slide video
  const playActiveVideo = (swiper) => {
    if (!swiper || swiper.destroyed) return;

    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (video) {
        video.pause();
      }
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    const activeVideo = activeSlide?.querySelector("video");

    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  };

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
        closePlayer();
      }
    };

    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo]);

  // Pause gallery videos when modal opens
  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    if (selectedVideo) {
      swiper.slides.forEach((slide) => {
        slide.querySelector("video")?.pause();
      });
    } else {
      playActiveVideo(swiper);
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
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-blue-700 shadow-sm backdrop-blur-md">
                <Sparkles
                  size={14}
                  className="animate-pulse text-blue-600"
                />

                <span>SELECTED WORKS // 2026 SHOWREEL</span>
              </div>

              {/* Heading */}
              <h2 className="font-['Outfit'] text-4xl font-black uppercase leading-[0.95] text-slate-950 sm:text-5xl lg:text-6xl">
                Built For Feeds.
                <span className="my-1 block font-serif text-[1.15em] font-bold normal-case tracking-normal text-blue-600">
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
                playActiveVideo(swiper);
              }}
              onSlideChange={(swiper) => {
                const targetIndex =
                  swiper.realIndex % (filteredVideos.length || 1);

                setActiveIndex(targetIndex);
                playActiveVideo(swiper);
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
                        <video
                          src={item.video}
                          poster={item.thumbnail}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Vignette Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />

                        {/* Top Badges */}
                        <div className="absolute left-3.5 right-3.5 top-3.5 flex items-center justify-between">
                          <span className="rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
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
                            className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/20 text-white backdrop-blur-md transition-all duration-300 ${
                              isActive
                                ? "scale-100 opacity-100"
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
                                className="rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border-4 border-white/20 bg-slate-950 shadow-2xl sm:max-w-md"
            >
              <video
                ref={playerRef}
                src={selectedVideo.video}
                autoPlay
                controls
                playsInline
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={closePlayer}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition hover:bg-blue-600"
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



// import { useRef, useState, useEffect, useCallback } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow, Autoplay } from "swiper/modules";
// import {
//   X,
//   Play,
//   Maximize2,  
//   ArrowLeft,
//   ArrowRight,
//   ArrowUpRight,
//   Clapperboard,
// } from "lucide-react";

// import { videos } from "../../data/videos.data";

// import "swiper/css";
// import "swiper/css/effect-coverflow";

// const VideoGallerySection = () => {
//   const swiperRef = useRef(null);
//   const playerRef = useRef(null);

//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   // Play only the centered video, pause + reset the rest
//   const playActiveVideo = useCallback(
//     (swiper) => {
//       if (!swiper || swiper.destroyed || selectedVideo) return;

//       swiper.slides.forEach((slide) => {
//         const video = slide.querySelector("video");
//         if (!video) return;

//         if (slide.classList.contains("swiper-slide-active")) {
//           video.muted = true;
//           video.defaultMuted = true;
//           video.playsInline = true;

//           if (video.readyState >= 2) {
//             video.play().catch(() => {});
//           } else {
//             video.load();
//           }
//         } else {
//           video.pause();
//           video.currentTime = 0;
//         }
//       });
//     },
//     [selectedVideo],
//   );

//   // Pause every slider video
//   const pauseGalleryVideos = useCallback(() => {
//     const swiper = swiperRef.current;
//     if (!swiper || swiper.destroyed) return;

//     swiper.slides.forEach((slide) => {
//       slide.querySelector("video")?.pause();
//     });
//   }, []);

//   // Stop slider while the full-screen player is open
//   useEffect(() => {
//     const swiper = swiperRef.current;
//     if (!swiper || swiper.destroyed) return;

//     if (selectedVideo) {
//       swiper.autoplay?.stop();
//       pauseGalleryVideos();
//     } else {
//       playActiveVideo(swiper);
//       swiper.autoplay?.start();
//     }
//   }, [selectedVideo, pauseGalleryVideos, playActiveVideo]);

//   // Start the modal video
//   useEffect(() => {
//     if (!selectedVideo || !playerRef.current) return;

//     const player = playerRef.current;
//     player.muted = false;
//     player.play().catch(() => {});
//   }, [selectedVideo]);

//   const closePlayer = useCallback(() => {
//     playerRef.current?.pause();
//     setSelectedVideo(null);
//   }, []);

//   // Escape key closes the player
//   useEffect(() => {
//     if (!selectedVideo) return;

//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") closePlayer();
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [selectedVideo, closePlayer]);

//   const openPlayer = (video) => {
//     if (!video) return;
//     swiperRef.current?.autoplay?.stop();
//     pauseGalleryVideos();
//     setSelectedVideo(video);
//   };

//   // Side card click: bring it to the center. Center card click: open player.
//   const handleSlideClick = (swiper) => {
//     const clickedSlide = swiper.clickedSlide;
//     if (!clickedSlide) return;

//     const clickedIndex = Number(
//       clickedSlide.getAttribute("data-swiper-slide-index"),
//     );
//     const video = videos[clickedIndex];
//     if (!video) return;

//     if (clickedIndex === swiper.realIndex) {
//       openPlayer(video);
//     } else {
//       swiper.slideToLoop(clickedIndex);
//     }
//   };

//   const handleSwiperInit = (swiper) => {
//     swiperRef.current = swiper;
//     setActiveIndex(swiper.realIndex);

//     requestAnimationFrame(() => {
//       if (!swiper.destroyed) playActiveVideo(swiper);
//     });
//   };

//   const handleSlideChange = (swiper) => {
//     setActiveIndex(swiper.realIndex);
//     if (!selectedVideo) playActiveVideo(swiper);
//   };

//   const handleTransitionEnd = (swiper) => {
//     if (!selectedVideo) playActiveVideo(swiper);
//   };

//   if (!videos.length) return null;

//   const activeVideo = videos[activeIndex] ?? videos[0];
//   const progress = ((activeIndex + 1) / videos.length) * 100;

//   return (
//     <>
//       <section id="videos" className="relative overflow-hidden bg-white">
//         <div className="relative mx-auto w-full max-w-[1400px] py-14 lg:py-16">
//           {/* TOP: heading + description */}
//           <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center px-5 text-center sm:px-10">
        

//             <h2 className="mt-5 font-['Outfit'] text-3xl font-semibold leading-[1.1] tracking-tight text-black sm:text-5xl">
//               Not Just Videos.
//               <span className="block text-blue-600">Visual Stories.</span>
//             </h2>

//             <p className="mt-4 max-w-xl text-sm leading-7 text-black/60 sm:text-base">
//               A look at the reels, ad films and brand stories we have edited
//               for startups and agencies. Every frame is cut to hold attention
//               and move people to act.
//             </p>
//           </div>

//           <div className="relative">
//           <Swiper
//             modules={[EffectCoverflow, Autoplay]}
//             effect="coverflow"
//             centeredSlides
//             grabCursor
//             slidesPerView="auto"
//             spaceBetween={-24}
//             loop={videos.length > 2}
//             loopAdditionalSlides={videos.length}
//             speed={800}
//             watchSlidesProgress
//             coverflowEffect={{
//               rotate: 0,
//               stretch: 0,
//               depth: 260,
//               modifier: 1,
//               slideShadows: false,
//             }}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true,
//             }}
//             onSwiper={handleSwiperInit}
//             onClick={handleSlideClick}
//             onSlideChange={handleSlideChange}
//             onSlideChangeTransitionEnd={handleTransitionEnd}
//             className="video-coverflow !overflow-visible py-8"
//           >
//             {videos.map((video) => (
//               <SwiperSlide
//                 key={video.id}
//                 className="!h-auto !w-[210px] sm:!w-[250px] lg:!w-[290px]"
//               >
//                 {({ isActive }) => (
//                   <div
//                     className={`group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-100 transition-shadow duration-500 ${
//                       isActive
//                         ? "shadow-[0_25px_60px_-15px_rgba(15,23,42,0.45)]"
//                         : "shadow-[0_15px_35px_-15px_rgba(15,23,42,0.35)]"
//                     }`}
//                   >
//                     <video
//                       className="h-full w-full object-cover"
//                       src={video.video}
//                       poster={video.thumbnail}
//                       muted
//                       loop
//                       playsInline
//                       preload="metadata"
//                       onLoadedData={(event) => {
//                         const swiper = swiperRef.current;
//                         if (!swiper || swiper.destroyed || selectedVideo) {
//                           return;
//                         }

//                         const slide =
//                           event.currentTarget.closest(".swiper-slide");

//                         if (slide?.classList.contains("swiper-slide-active")) {
//                           event.currentTarget.play().catch(() => {});
//                         }
//                       }}
//                     />

//                     {/* Small play badge on side cards */}
//                     {!isActive && (
//                       <span className="pointer-events-none absolute bottom-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 shadow">
//                         <Play size={10} fill="currentColor" className="ml-px" />
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           {/* Expand button: opens the centered video in full screen */}
//           <button
//             type="button"
//             onClick={() => openPlayer(videos[activeIndex])}
//             aria-label="Open video in full screen"
//             className="absolute bottom-6 right-5 z-[400] flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-slate-900 hover:text-white sm:right-10 lg:right-16"
//           >
//             <Maximize2 size={20} />
//           </button>
//           </div>

//           {/* BOTTOM: active video details + controls */}
//           <div className="mx-auto mt-6 max-w-5xl px-5 sm:px-10">
//             <div className="flex flex-col gap-6 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
//               {/* Active video info */}
//               <div className="flex items-center gap-4">
//                 <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white">
//                   <Clapperboard size={20} />
//                 </span>
//                 <div className="min-w-0">
//                   <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-600">
//                     {activeVideo?.category || "Showreel"}
//                   </p>
//                   <h3 className="mt-0.5 truncate font-['Outfit'] text-lg font-semibold text-black sm:text-xl">
//                     {activeVideo?.title || "Creative Showreel"}
//                   </h3>
//                   {activeVideo?.duration && (
//                     <p className="mt-0.5 text-xs text-black/50">
//                       Duration {activeVideo.duration}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Counter + progress + arrows */}
//               <div className="flex items-center gap-4">
//                 <p className="font-['Outfit'] text-lg font-semibold text-black">
//                   {String(activeIndex + 1).padStart(2, "0")}
//                   <span className="text-sm text-black/30">
//                     {" "}
//                     / {String(videos.length).padStart(2, "0")}
//                   </span>
//                 </p>

//                 <div className="relative h-px w-24 bg-black/15 sm:w-32">
//                   <div
//                     className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-blue-600 transition-all duration-500"
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={() => swiperRef.current?.slidePrev()}
//                     aria-label="Previous video"
//                     className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-black transition hover:bg-black hover:text-white"
//                   >
//                     <ArrowLeft size={17} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => swiperRef.current?.slideNext()}
//                     aria-label="Next video"
//                     className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-black"
//                   >
//                     <ArrowRight size={17} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Stats + CTA */}
//             <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-black px-6 py-6 text-white sm:flex-row sm:px-8">
//               <div className="grid w-full grid-cols-3 gap-4 sm:w-auto sm:gap-10">
//                 {[
//                   { value: "500+", label: "Videos Edited" },
//                   { value: "50+", label: "Happy Brands" },
//                   { value: "48h", label: "Fast Delivery" },
//                 ].map((stat) => (
//                   <div key={stat.label}>
//                     <p className="font-['Outfit'] text-2xl font-semibold sm:text-3xl">
//                       {stat.value}
//                     </p>
//                     <p className="mt-0.5 text-[11px] text-white/50 sm:text-xs">
//                       {stat.label}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <a
//                 href="#contact"
//                 className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
//               >
//                 Start Your Project
//                 <ArrowUpRight size={16} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FULL SCREEN VIDEO PLAYER */}
//       {selectedVideo && (
//         <div className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black">
//           <video
//             ref={playerRef}
//             key={selectedVideo.id}
//             src={selectedVideo.video}
//             poster={selectedVideo.thumbnail}
//             className="h-full w-full object-contain"
//             controls
//             autoPlay
//             playsInline
//           />

//           <button
//             type="button"
//             onClick={closePlayer}
//             aria-label="Close full-screen video"
//             className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white transition-colors hover:bg-red-600 sm:right-8 sm:top-8"
//           >
//             <X size={23} />
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default VideoGallerySection;


//  give me need for you