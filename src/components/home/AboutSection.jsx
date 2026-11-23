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
const CompanyVideo2 =
  "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241015/fiza1.mp4";
const CompanyVideo =
  "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795243516/saloni5_1.mp4";

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
              <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-wider text-black sm:text-[10px]">
                <span className="h-[6px] w-1.5 animate-pulse rounded-full bg-red-500" />
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
                <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest sm:text-[10px]">
                  <span className="h-[6px] w-1.5 animate-pulse rounded-full bg-red-400" />
                  NOW EDITING
                </span>

                <span className="font-mono text-[10px] text-blue-100 sm:text-[10px]">
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

                <span className="absolute bottom-2 left-2 z-10 text-[8px] font-semibold uppercase tracking-wider text-white/90 sm:text-[10px]">
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
            </div>

            {/* CARD 3: STATS */}
            <div className="ab-float absolute left-[33%] top-0 z-20 w-[47%] rounded-2xl bg-white p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] sm:p-4">
              <div className="flex items-start justify-between">
                <p className="font-['Outfit'] text-xl font-bold leading-none text-black sm:text-3xl">
                  30,000+
                </p>
                <TrendingUp size={18} className="text-blue-600" />
              </div>
              <p className="mt-1.5 text-[10px] leading-snug text-white sm:text-[11px]">
                Views in 2026 with 5 star ratings and happy clients
              </p>

              <div className="my-2.5 h-px bg-black/10" />

              <div className="flex flex-wrap gap-1">
                {avatars.map((a, i) => (
                  <span
                    key={a + i}
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white sm:h-6 sm:w-6 ${avatarShades[i]}`}
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
            <h2 className="mt-2 font-['Outfit'] text-[36px]  font-semibold uppercase tracking-tight sm:text-6xl">
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

            <p className=" mt-4 sm:mt-9 text-base sm:leading-8 text-black/60">
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
                      <span className="text-xs font-bold text-blue-600 ">
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
     
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
