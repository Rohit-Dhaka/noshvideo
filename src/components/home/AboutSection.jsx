import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  
  Scissors,
  Video,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";


const highlights = [
  "Creative storytelling with purpose",
  "Professional and polished editing",
  "Visual content that captures attention",
];

const process = [
  { number: "01", title: "Create", icon: Video },
  { number: "02", title: "Edit", icon: Scissors },
  { number: "03", title: "Impact", icon: Sparkles },
];
const CompanyVideo2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241015/fiza1.mp4";
const CompanyVideo = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795243516/saloni5_1.mp4";

const avatars = ["A", "R", "S", "M", "K", "P", "D", "N"];
const avatarShades = [
  "bg-blue-600",
  "bg-blue-400",
  "bg-blue-800",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-blue-700",
  "bg-sky-600",
];

const emojis = ["😡", "😕", "🙂", "😊", "😍"];

const tracks = [
  [
    { w: "38%", c: "bg-white/90" },
    { w: "26%", c: "bg-blue-300" },
    { w: "24%", c: "bg-white/70" },
  ],
  [
    { w: "20%", c: "bg-blue-300" },
    { w: "44%", c: "bg-white/80" },
    { w: "28%", c: "bg-blue-200" },
  ],
  [
    { w: "56%", c: "bg-blue-200" },
    { w: "34%", c: "bg-white/90" },
  ],
];

const AboutSection = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [rating, setRating] = useState(4);

  // Autoplay the video on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    return () => {
      video.pause();
    };
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-white py-14 text-black lg:py-24"
    >
      <style>{`
        @keyframes ab-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ab-scan {
          from { left: 4%; }
          to { left: 94%; }
        }
        @keyframes ab-draw {
          from { stroke-dashoffset: 320; }
          to { stroke-dashoffset: 0; }
        }
        .ab-float { animation: ab-float 5s ease-in-out infinite; }
        .ab-float-slow { animation: ab-float 7s ease-in-out infinite 1s; }
        .ab-scan { animation: ab-scan 6s linear infinite alternate; }
        .ab-draw {
          stroke-dasharray: 320;
          animation: ab-draw 1.2s ease-out .6s both;
        }
        .ab-btn-slant {
          clip-path: polygon(0 0, 100% 0, 93% 100%, 0 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .ab-float, .ab-float-slow, .ab-scan, .ab-draw { animation: none; }
        }
      `}</style>

      {/* soft background glow */}
      <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: COLLAGE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-[1/1.08] w-full max-w-[560px]"
          >
            {/* CARD 1: LIVE VIDEO */}
            <div className="group absolute left-0 top-[14%] z-10 h-[58%] w-[49%] overflow-hidden rounded-2xl bg-blue-100 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.35)]">
              <video
                ref={videoRef}
                src={CompanyVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  const video = e.currentTarget;

                  if (video.paused) {
                    video.play().catch((error) => {
                      console.log("Video autoplay failed:", error);
                    });
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-blue-950/10" />

              {/* LIVE badge */}
              <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[9px] font-bold tracking-wider text-black sm:text-[10px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                LIVE
              </div>

              {/* Play / pause */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-blue-600 shadow-xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white sm:h-14 sm:w-14 ${
                    isPlaying
                      ? "opacity-0 group-hover:opacity-100"
                      : "opacity-100"
                  }`}
                >
                  {isPlaying ? (
                    <Pause size={20} fill="currentColor" />
                  ) : (
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  )}
                </span>
              </button>

              {/* Caption */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-12">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-blue-200 sm:text-[10px]">
                  Showreel 2026
                </p>
                <p className="mt-0.5 font-['Outfit'] text-sm font-semibold leading-tight text-white sm:text-lg">
                  Every Frame Tells A Story
                </p>
              </div>

              {/* Mute */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-blue-600 hover:text-white"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            {/* CARD 2: NOW EDITING (timeline) */}

<div className="absolute right-0 top-[30%] z-10 h-[62%] w-[50%] overflow-hidden rounded-2xl bg-blue-600 p-3 text-white shadow-[0_20px_50px_-15px_rgba(37,99,235,0.55)] sm:p-4">
  <div className="flex items-center justify-between">
    <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest sm:text-[10px]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
      NOW EDITING
    </span>

    <span className="font-mono text-[9px] text-blue-100 sm:text-[10px]">
      00:24:12
    </span>
  </div>

  {/* Full size video preview */}
  <div className="relative mt-3 h-[calc(100%-75px)] min-h-0 overflow-hidden rounded-xl bg-blue-900">
    <video
      src={CompanyVideo2}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
    />

    <span className="absolute bottom-2 left-2 z-10 text-[8px] font-semibold uppercase tracking-wider text-white/90 sm:text-[9px]">
      Brand Reel · 4K
    </span>
  </div>

  {/* Timeline */}
  <div className="relative mt-3 space-y-1.5">
    {tracks.map((track, i) => (
      <div key={i} className="flex gap-1">
        {track.map((clip, j) => (
          <div
            key={j}
            style={{ width: clip.w }}
            className={`h-3 rounded-[4px] sm:h-4 ${clip.c}`}
          />
        ))}
      </div>
    ))}

    <span className="ab-scan absolute -bottom-1 -top-1 w-0.5 rounded bg-yellow-300">
      <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-yellow-300" />
    </span>
  </div>

  <div className="mt-3 hidden items-center gap-3 text-[10px] text-blue-100 sm:flex">
    <span className="rounded-full bg-white/15 px-2 py-0.5">
      Cuts
    </span>
    <span className="rounded-full bg-white/15 px-2 py-0.5">
      Color
    </span>
    <span className="rounded-full bg-white/15 px-2 py-0.5">
      Sound
    </span>
  </div>
</div>



            {/* CARD 3: STATS */}
            <div className="ab-float absolute left-[33%] top-0 z-20 w-[47%] rounded-2xl bg-white p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] sm:p-4">
              <div className="flex items-start justify-between">
                <p className="font-['Outfit'] text-xl font-bold leading-none text-black sm:text-3xl">
                  30,000+
                </p>
                <TrendingUp size={18} className="text-blue-600" />
              </div>
              <p className="mt-1.5 text-[9px] leading-snug text-black/50 sm:text-[11px]">
                Views in 2026 with 5 star ratings and happy clients
              </p>

              <div className="my-2.5 h-px bg-black/10" />

              <div className="flex flex-wrap gap-1">
                {avatars.map((a, i) => (
                  <span
                    key={a + i}
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white ring-2 ring-white sm:h-6 sm:w-6 ${avatarShades[i]}`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* CARD 4: RATINGS */}
            <div className="ab-float-slow absolute bottom-0 left-[7%] z-20 w-[46%] rounded-2xl bg-white p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] sm:p-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-black sm:text-xs">
                  Client ratings
                </p>
                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-blue-600">
                  <Star size={11} fill="currentColor" />
                  4.9
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                {emojis.map((emoji, i) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setRating(i)}
                    aria-label={`Rate ${i + 1} out of 5`}
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-sm transition sm:h-8 sm:w-8 sm:text-lg ${
                      rating === i
                        ? "scale-125 bg-blue-100"
                        : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="mt-2 font-['Outfit'] text-5xl font-semibold uppercase tracking-tight sm:text-6xl">
              <span className="relative inline-block">
                About Us
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-3 left-0 h-3 w-full text-blue-600"
                >
                  <path
                    className="ab-draw"
                    d="M2 9 C 40 2, 90 2, 130 6 S 185 10, 198 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-9 text-base leading-8 text-black/60">
              We are a creative video editing{" "}
              <span className="font-semibold text-blue-600">
                studio based in Haryana, India,
              </span>{" "}
              helping creators and businesses transform ordinary footage into{" "}
              <span className="font-semibold text-blue-600">
                extraordinary visual stories.
              </span>{" "}
              From Instagram Reels and YouTube Shorts to cinematic videos and
              brand promotions, we combine creativity, storytelling and
              precision to make every frame count.
            </p>
            {/* Process */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {process.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="group rounded-2xl border border-blue-100 bg-blue-50/60 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 group-hover:text-blue-100">
                        {item.number}
                      </span>
                      <Icon
                        size={16}
                        className="text-blue-600 group-hover:text-white"
                      />
                    </div>
                    <p className="mt-3 font-['Outfit'] text-lg font-semibold">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Highlights */}
            <div className="mt-7 space-y-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 size={19} className="shrink-0 text-blue-600" />
                  <span className="text-sm font-medium sm:text-base">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Link
                to="/contact"
                className="  rounded-full group inline-flex items-center gap-3 bg-blue-600 py-4 px-8  text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] transition  hover:bg-white hover:text-blue-600 hover:border-blue-600"
              >
                Explore More
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

// import { useRef, useState, useEffect } from "react";
// import { motion } from "motion/react";
// import {
//   ArrowUpRight,
//   CheckCircle2,
//   Sparkles,
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Clapperboard,
//   Scissors,
//   Video,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const AboutSection = () => {
//   const highlights = [
//     "Creative storytelling with purpose",
//     "Professional and polished editing",
//     "Visual content that captures attention",
//   ];

//   const process = [
//     { number: "01", title: "Create", icon: Video },
//     { number: "02", title: "Edit", icon: Scissors },
//     { number: "03", title: "Impact", icon: Sparkles },
//   ];

//   const videoRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(true);

//   // Automatically play video on component load
//   useEffect(() => {
//     const video = videoRef.current;

//     if (!video) return;

//     video.muted = true;
//     video.defaultMuted = true;
//     video.playsInline = true;

//     const playVideo = async () => {
//       try {
//         await video.play();
//         setIsPlaying(true);
//       } catch (error) {
//         console.error("Autoplay failed:", error);
//         setIsPlaying(false);
//       }
//     };

//     playVideo();

//     return () => {
//       video.pause();
//     };
//   }, []);

//   // Play / Pause
//   const togglePlay = async () => {
//     const video = videoRef.current;

//     if (!video) return;

//     if (video.paused) {
//       try {
//         await video.play();
//         setIsPlaying(true);
//       } catch (error) {
//         console.error("Video playback failed:", error);
//         setIsPlaying(false);
//       }
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   // Mute / Unmute
//   const toggleMute = () => {
//     const video = videoRef.current;

//     if (!video) return;

//     video.muted = !video.muted;
//     setIsMuted(video.muted);
//   };

//   return (
//     <section
//       id="about"
//       className="relative overflow-hidden bg-blue-600 py-12 lg:py-16"
//     >
//       <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-800/40 blur-3xl" />
//       <div className="relative mx-auto grid items-center gap-14 px-5 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16">
//         <motion.div
//           initial={{ opacity: 0, x: -45 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="relative mx-auto w-full max-w-xl"
//         >
//           <div className="absolute -left-4 -top-4 h-28 w-28 border-l-2 border-t-2 border-blue-200/70" />

//           <div className="absolute -bottom-4 -right-4 h-28 w-28 border-b-2 border-r-2 border-blue-300/70" />

//           <div className="relative overflow-hidden border border-white/20 bg-white/10 p-3">
//             <div className="group relative w-full overflow-hidden bg-slate-950">
//               {/* Autoplay Video */}
//               <video
//                 ref={videoRef}
//                 src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
//                 poster="/images/about/about-main.jpg"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//                 onLoadedData={() => {
//                   const video = videoRef.current;

//                   if (video && video.paused) {
//                     video.play().catch((error) => {
//                       console.error("Video autoplay failed:", error);
//                     });
//                   }
//                 }}
//                 onPlay={() => setIsPlaying(true)}
//                 onPause={() => setIsPlaying(false)}
//                 onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
//                 className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[5/4] w-full object-cover transition duration-700 group-hover:scale-105"
//               />

//               {/* Video Overlay */}
//               <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />

//               {/* Creative Studio Label */}
//               <div className="absolute left-3 top-3 flex items-center gap-2 border border-white/30 bg-slate-950/40 px-3 py-2 text-[9px] font-semibold tracking-wider text-white backdrop-blur-md sm:left-5 sm:top-5 sm:text-xs">
//                 <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-blue-400" />
//                 CREATIVE STUDIO
//               </div>

//               {/* Play / Pause Button */}
//               <button
//                 type="button"
//                 onClick={togglePlay}
//                 aria-label={isPlaying ? "Pause video" : "Play video"}
//                 className="absolute inset-0 flex items-center justify-center text-white"
//               >
//                 <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/20 backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-blue-600 sm:h-16 sm:w-16">
//                   {isPlaying ? (
//                     <Pause
//                       size={20}
//                       className="sm:h-6 sm:w-6"
//                       fill="currentColor"
//                     />
//                   ) : (
//                     <Play
//                       size={20}
//                       className="sm:h-6 sm:w-6"
//                       fill="currentColor"
//                     />
//                   )}
//                 </span>
//               </button>

//               {/* Bottom Content */}
//               <div className="pointer-events-none absolute bottom-4 left-3 right-14 sm:bottom-6 sm:left-5 sm:right-20 lg:bottom-7">
//                 <p className="text-[9px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-blue-200 sm:text-xs sm:tracking-[0.25em]">
//                   Turning imagination into reality
//                 </p>

//                 <h3 className="mt-2 max-w-md font-['Outfit'] text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
//                   Every Frame Tells A Story.
//                 </h3>
//               </div>

//               {/* Mute / Unmute Button */}
//               <button
//                 type="button"
//                 onClick={toggleMute}
//                 aria-label={isMuted ? "Unmute video" : "Mute video"}
//                 className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-slate-950/50 text-white backdrop-blur-md transition hover:bg-white hover:text-blue-600 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10"
//               >
//                 {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//               </button>
//             </div>
//           </div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4, duration: 0.6 }}
//             className="absolute max-sm:hidden -bottom-7 right-3 flex items-center gap-3 border border-white/20 bg-white px-5 py-4 text-blue-600 sm:-right-5"
//           >
//             <div className="flex h-11 w-11 items-center justify-center bg-blue-600 text-white">
//               <Clapperboard size={22} />
//             </div>

//             <div>
//               <p className="font-['Outfit'] text-lg font-bold">Creative</p>

//               <p className="text-xs font-medium text-slate-500">
//                 Video Editing Studio
//               </p>
//             </div>
//           </motion.div>

//           {/* Vertical Decorative Text */}
//           <div className="absolute -left-8 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] font-bold tracking-[0.4em] text-blue-100/70 sm:block">
//             CREATIVITY IN MOTION
//           </div>
//         </motion.div>

//         {/* RIGHT SIDE - CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: 45 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="relative"
//         >
//           {/* Badge */}
//           <div className="mb-6 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
//             <Sparkles size={16} />A LITTLE ABOUT US
//           </div>

//           {/* Main Heading */}
//           <h2 className="font-['Outfit'] text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
//             We Don't Just Edit Videos.
//             <span className="mt-2 block text-blue-100">
//               We Create Experiences.
//             </span>
//           </h2>

//           {/* Accent Line */}
//           <div className="mt-6 flex items-center gap-3">
//             <div className="h-1 w-14 bg-white" />
//             <div className="h-1 w-5 bg-blue-300" />
//             <div className="h-1 w-2 bg-blue-200/50" />
//           </div>

//           {/* Description */}
//           <p className="mt-6 text-base leading-8 text-blue-100">
//             We are a creative video editing{" "}
//             <span className="font-bold text-white">
//               {" "}
//               studio based in Haryana, India,{" "}
//             </span>
//             helping creators and businesses transform ordinary footage into
//             <span className="font-bold text-white">
//               {" "}
//               extraordinary visual stories.
//             </span>
//           </p>

//           <p className="mt-4 text-base leading-8 text-blue-100">
//             From Instagram Reels and YouTube Shorts to cinematic videos and
//             brand promotions, we combine creativity, storytelling, and precision
//             to make every frame count.
//           </p>

//           {/* Creative Process */}
//           <div className="mt-8 grid grid-cols-3 border-y border-white/20 py-5">
//             {process.map((item, index) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={item.number}
//                   className={`flex flex-col gap-2 ${
//                     index !== 2 ? "border-r border-white/20" : ""
//                   } ${index === 1 ? "pl-4 sm:pl-7" : ""} ${
//                     index === 2 ? "pl-4 sm:pl-7" : ""
//                   }`}
//                 >
//                   <div className="flex items-center gap-2 text-blue-200">
//                     <span className="text-xs font-bold">{item.number}</span>

//                     <Icon size={17} />
//                   </div>

//                   <p className="font-['Outfit'] text-lg font-bold text-white sm:text-xl">
//                     {item.title}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Highlights */}
//           <div className="mt-7 space-y-4">
//             {highlights.map((item, index) => (
//               <motion.div
//                 key={item}
//                 initial={{ opacity: 0, x: 15 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.12, duration: 0.4 }}
//                 className="flex items-center gap-3"
//               >
//                 <CheckCircle2 size={19} className="shrink-0 text-blue-200" />

//                 <span className="text-sm font-medium text-white sm:text-base">
//                   {item}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//           <div className="mt-9 flex flex-wrap items-center gap-5">
//             <Link
//               to="/contact"
//               className="group rounded inline-flex items-center gap-3 bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
//             >
//               Let's Work Together
//               <ArrowUpRight
//                 size={19}
//                 className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//               />
//             </Link>

//             <span className="text-sm font-medium text-blue-100">
//               Let's create something different.
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;
