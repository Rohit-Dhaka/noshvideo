import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Play,
  Scissors,
  Film,
  Clapperboard,
  Camera,
  Users,
  Wand2,  
  MousePointer2,
} from "lucide-react";

const themes = {
  black: {
    card: "bg-zinc-950 border-white/15 text-white",
    sub: "text-white",
    iconBox: "bg-white/10 text-white",
    play: "bg-white text-black",
  },
  white: {
    card: "bg-white border-white text-black",
    sub: "text-black",
    iconBox: "bg-blue-50 text-blue-600",
    play: "bg-black text-white",
  },
  blue: {
    card: "bg-blue-600 border-blue-500 text-white",
    sub: "text-white",
    iconBox: "bg-white/15 text-white",
    play: "bg-white text-blue-600",
  },
  soft: {
    card: "bg-blue-950 border-blue-500/40 text-white",
    sub: "text-white",
    iconBox: "bg-blue-500/20 text-blue-300",
    play: "bg-blue-600 text-white",
  },
};

// const cards = [
//   {
//     id: 1,
//     title: "Video Editing",
//     subtitle: "Cuts & Storytelling",
//     icon: Scissors,
//     image: "",
//     theme: "white",
//   },
//   {
//     id: 2,
//     title: "Reels & Shorts",
//     subtitle: "Video Editing",
//     icon: Film,
//     image: "",
//     theme: "soft",
//   },
//   {
//     id: 3,
//     title: "Ad Films",
//     subtitle: "Video Editing",
//     icon: Clapperboard,
//     image: "",
//     theme: "black",
//   },
//   {
//     id: 4,
//     title: "Brand Models",
//     subtitle: "Model Portfolio",
//     icon: Users,
//     image: "",
//     theme: "blue",
//   },
//   {
//     id: 5,
//     title: "Brand Shoots",
//     subtitle: "Photo & Video",
//     icon: Camera,
//     image: "",
//     theme: "white",
//   },
//   {
//     id: 6,
//     title: "Motion Graphics",
//     subtitle: "Video Editing",
//     icon: Wand2,
//     image: "",
//     theme: "black",
//   },
//   {
//     id: 7,
//     title: "Product Ads",
//     subtitle: "Promotions",
//     icon: Megaphone,
//     image: "",
//     theme: "soft",
//   },
// ];

const cards = [
  {
    id: 1,
    title: "Video Editing",
    subtitle: "Cuts & Storytelling",
    icon: Scissors,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795242674/KanikaSharma1_1.mp4",    
    theme: "white",
  },
  {
    id: 2,
    title: "Reels & Shorts",
    subtitle: "Video Editing",
    icon: Film,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241083/bhavyasharma1.mov",    
    theme: "soft",
  },
  {
    id: 3,
    title: "Ad Films",
    subtitle: "Video Editing",
    icon: Clapperboard,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795245679/deepaviskrama1_2.mp4",    
    theme: "black",
  },
  {
    id: 4,
    title: "Brand Models",
    subtitle: "Model Portfolio",
    icon: Users,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241015/fiza1.mp4",    
    theme: "blue",
  },
  {
    id: 5,
    title: "Brand Shoots",
    subtitle: "Photo & Video",
    icon: Camera,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240871/saloni1.mp4",
    
    theme: "white",
  },
  {
    id: 6,
    title: "Motion Graphics",
    subtitle: "Video Editing",
    icon: Wand2,
    video:
      "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240902/Ishwariya1.mp4",
    
    theme: "black",
  },
];

const START_INDEX = 3; // card that is big in the center on load
const AUTOPLAY_MS = 3200;
const ANGLE = 15; // degrees between neighbouring cards

/* Floating role tags (with arrows pointing at the heading) */
const tags = [
  {
    name: "Editor",
    pos: "left-[6%] top-[20%]",
    color: "bg-blue-600 text-white",
    cursor: "text-blue-500",
    arrow: "right",
    delay: "0s",
  },
  {
    name: "Colorist",
    pos: "left-[2%] top-[35%]",
    color: "bg-white/10 text-white border border-white/20 backdrop-blur-md",
    cursor: "text-white",
    arrow: "right",
    delay: "0.8s",
  },
  {
    name: "Model",
    pos: "right-[6%] top-[24%]",
    color: "bg-white text-black",
    cursor: "text-white",
    arrow: "left",
    delay: "1.2s",
  },
  {
    name: "Director",
    pos: "right-[2%] top-[38%]",
    color: "bg-blue-600 text-white",
    cursor: "text-blue-500",
    arrow: "left",
    delay: "2s",
  },
];

/* Rising glow particles (static positions, animated with CSS) */
const particles = [
  { left: "8%", size: 4, dur: 9, delay: 0 },
  { left: "17%", size: 3, dur: 12, delay: 2 },
  { left: "27%", size: 5, dur: 10, delay: 5 },
  { left: "36%", size: 3, dur: 13, delay: 1 },
  { left: "46%", size: 4, dur: 11, delay: 4 },
  { left: "55%", size: 3, dur: 9, delay: 7 },
  { left: "64%", size: 5, dur: 12, delay: 3 },
  { left: "72%", size: 3, dur: 10, delay: 6 },
  { left: "81%", size: 4, dur: 13, delay: 2 },
  { left: "90%", size: 3, dur: 11, delay: 5 },
];

const CurvedArrow = ({ flip }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 70 40"
    className={`h-9 w-16 text-white/60 ${flip ? "-scale-x-100" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8 C 25 2, 48 12, 60 30" />
    <path d="M50 29 L61 31 L59 20" />
  </svg>
);

const HeroSection = () => {
  const total = cards.length;
  const half = Math.floor(total / 2);

  const sectionRef = useRef(null);
  const startX = useRef(null);

  const [active, setActive] = useState(START_INDEX);
  const [paused, setPaused] = useState(false);

  const goNext = () => setActive((p) => (p + 1) % total);
  const goPrev = () => setActive((p) => (p - 1 + total) % total);

  // Auto-rotate the wheel
  useEffect(() => {
    if (paused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Swipe support
  const onPointerDown = (e) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) (diff < 0 ? goNext : goPrev)();
    startX.current = null;
  };

  // Cursor spotlight
  const onMouseMove = (e) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const words = ["Brand", "Business", "Sales", "Growth"];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (!deleting) {
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          } else {
            setDeleting(true);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentWord.slice(0, displayText.length - 1));
          } else {
            setDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      deleting ? 65 : displayText === currentWord ? 1400 : 110,
    );

    return () => clearTimeout(timer);
  }, [displayText, deleting, wordIndex]);

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative isolate flex flex-col overflow-hidden bg-[#050505] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 30%), rgba(37,99,235,0.18), transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-full overflow-hidden"
      >
        {particles.map((p, i) => (
          <span
            key={i}
            className="hs-particle absolute bottom-0 rounded-full bg-blue-400"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              boxShadow: "0 0 12px 2px rgba(96,165,250,0.7)",
            }}
          />
        ))}
      </div>

      {/* Floating role tags + animated arrows */}
      {tags.map((tag, index) => (
        <div
          key={tag.name}
          className={`pointer-events-none absolute z-20 hidden xl:flex items-start gap-2 ${
            tag.pos
          } ${tag.arrow === "left" ? "flex-row-reverse" : ""} ${
            index === 0
              ? "animate-[floatOne_4s_ease-in-out_infinite]"
              : index === 1
                ? "animate-[floatTwo_5s_ease-in-out_infinite]"
                : "animate-[floatThree_4.5s_ease-in-out_infinite]"
          }`}
          style={{
            animationDelay: `${index * 0.4}s`,
          }}
        >
          {/* Cursor + Label */}
          <div
            className={`relative flex items-start gap-1 ${
              index === 0
                ? "animate-[tagEnter_0.8s_ease-out_both]"
                : index === 1
                  ? "animate-[tagPop_0.9s_cubic-bezier(0.16,1,0.3,1)_both]"
                  : "animate-[tagSlide_0.9s_ease-out_both]"
            }`}
            style={{
              animationDelay: `${index * 0.3}s`,
            }}
          >
            {/* Animated Cursor */}
            <MousePointer2
              size={19}
              fill="currentColor"
              className={`-mr-1 mt-[-4px] -scale-x-100 ${tag.cursor} ${
                index === 0
                  ? "animate-[cursorMove_2s_ease-in-out_infinite]"
                  : index === 1
                    ? "animate-[cursorTilt_2.5s_ease-in-out_infinite]"
                    : "animate-[cursorBounce_1.8s_ease-in-out_infinite]"
              }`}
            />

            {/* Animated Label */}
            <span
              className={`relative mt-3 overflow-hidden rounded-full px-3 py-1 text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-110 ${tag.color}`}
            >
              {tag.name}

              {/* Shine effect */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full animate-[tagShine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </span>
          </div>

          {/* Animated Curved Arrow */}
          <div
            className={`mt-6 ${
              index === 0
                ? "animate-[arrowMove_2.5s_ease-in-out_infinite]"
                : index === 1
                  ? "animate-[arrowRotate_3s_ease-in-out_infinite]"
                  : "animate-[arrowBounce_2s_ease-in-out_infinite]"
            }`}
          >
            <CurvedArrow flip={tag.arrow === "left"} />
          </div>
        </div>
      ))}

      {/* Text content */}
      <div className="relative  z-20 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pt-22 text-center lg:pt-28">
        <h1
          className="hs-fade-up font-['Outfit'] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ animationDelay: ".1s" }}
        >
          Create Videos
          <span className="block max-sm:h-16">
            That{" "}
            <span className="font-serif italic text-blue-500">Elevate</span>{" "}
            Your
            <span className="relative ml-2 inline-block ">
              <span className="hs-shimmer text-blue-500">{displayText}</span>

              <span className="ml-0.5 inline-block h-[0.8em] w-[2px] translate-y-1 animate-pulse bg-blue-500" />

              <svg
                aria-hidden="true"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-blue-500"
              >
                <path
                  className="hs-draw"
                  d="M2 9 C 40 2, 90 2, 130 6 S 185 10, 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </h1>

        <p
          className="hs-fade-up mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base"
          style={{ animationDelay: ".2s" }}
        >
          India's No. 1 UGC Video Editing Studio, creating high-quality content
          that captures attention, builds trust and drives results.
        </p>

        <div
          className="hs-fade-up mt-7 flex sm:flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: ".3s" }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.35)] transition hover:bg-blue-600 hover:text-white hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.9)]"
          >
            Book a Call
            <ArrowUpRight
              size={16}
              className="transition-transform max-sm:hidden duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#videos"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-blue-500 hover:bg-white/10"
          >
            <Play
              size={13}
              fill="currentColor"
              className="transition-colors group-hover:text-blue-400"
            />
            View Our Work
          </a>
        </div>
      </div>

      {/* WHEEL */}

      <div
        className="relative z-10 mx-auto mt-10 h-[300px] w-full max-w-[1300px] touch-pan-y select-none overflow-hidden [--cw:210px] sm:h-[330px] sm:[--cw:250px] lg:h-[350px] lg:[--cw:280px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {cards.map((card, i) => {
          const offset =
            ((((i - active + half) % total) + total) % total) - half;

          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const t = themes[card.theme];

          const hidden = abs > 2;
          const hideOnMobile = abs === 2;

          return (
            <article
              key={card.id}
              onClick={() => setActive(i)}
              role="button"
              aria-label={`Show ${card.title}`}
              aria-current={isActive}
              className={`absolute left-1/2 top-5 aspect-[3/4.2] w-[var(--cw)] cursor-pointer pt-6 sm:pt-8 transition-all duration-700 ease-[cubic-bezier(.4,.1,.2,1)] ${
                hidden ? "pointer-events-none" : ""
              } ${hideOnMobile ? "max-sm:pointer-events-none max-sm:!opacity-0" : ""}`}
              style={{
                transformOrigin: "50% 200%",
                transform: `translateX(-50%) rotate(${offset * ANGLE}deg) scale(${
                  isActive ? 1.06 : 1 - abs * 0.05
                })`,
                zIndex: 30 - abs * 10,
                opacity: hidden ? 0 : 1,
              }}
            >
              {/* CARD */}
              <div
                className={`relative h-full w-full overflow-hidden rounded-[28px] border-2 transition-all duration-700 ${t.card} ${
                  isActive
                    ? "shadow-[0_30px_70px_-18px_rgba(37,99,235,0.75)]"
                    : "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] brightness-75"
                }`}
              >
                {/* VIDEO BACKGROUND */}
                <video
                  src={card.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* VIDEO OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                {/* BLUE COLOR OVERLAY */}
                <div className="absolute inset-0 bg-blue-950/10" />

                {/* LIGHT SWEEP ON ACTIVE CARD */}
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="hs-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>
                )}

                {/* TITLE */}
                <div className="absolute left-5 top-5 z-10">
                  <p className="font-['Outfit'] text-xl font-semibold leading-tight text-white sm:text-2xl">
                    {card.title}
                  </p>

                  <p className="mt-1 text-xs text-white/75">{card.subtitle}</p>
                </div>

                {/* PLAY BUTTON */}
                <span
                  className={`absolute bottom-5 left-5 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm ${t.play}`}
                >
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                  )}

                  <Play
                    size={14}
                    fill="currentColor"
                    className="relative ml-0.5"
                  />
                </span>

                {/* CARD NUMBER */}
                <span className="absolute bottom-5 right-5 z-10 font-['Outfit'] text-xs font-medium tracking-widest text-white/70">
                  0{card.id}
                </span>
              </div>
            </article>
          );
        })}

        {/* CONTROLS: ARROWS + DOTS + AUTOPLAY PROGRESS */}
        <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/60 px-3 py-2 shadow-lg backdrop-blur-md">
          {/* PREVIOUS */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous card"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} />
          </button>

          {/* DOTS */}
          <div className="flex items-center gap-1.5">
            {cards.map((card, i) => {
              const isCurrent = i === active;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${card.title}`}
                  className={`relative h-[6px] overflow-hidden rounded-full transition-all duration-500 ${
                    isCurrent
                      ? "w-8 bg-white/20"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                >
                  {isCurrent && (
                    <span
                      key={`${active}-${paused}`}
                      className="hs-progress absolute inset-y-0 left-0 rounded-full bg-blue-500"
                      style={{
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* NEXT */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Next card"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-white hover:text-black"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* <div
        className="relative z-10 mx-auto mt-10 h-[300px] w-full max-w-[1300px] touch-pan-y select-none overflow-hidden [--cw:210px] sm:h-[330px] sm:[--cw:250px] lg:h-[350px] lg:[--cw:280px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {cards.map((card, i) => {
          const offset =
            ((((i - active + half) % total) + total) % total) - half;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const Icon = card.icon;
          const t = themes[card.theme];

          const hidden = abs > 2;
          const hideOnMobile = abs === 2;

          return (
            <article
              key={card.id}
              onClick={() => setActive(i)}
              role="button"
              aria-label={`Show ${card.title}`}
              aria-current={isActive}
              className={`absolute left-1/2 top-5 aspect-[3/4.2] w-[var(--cw)] cursor-pointer pt-6 sm:pt-8 transition-all duration-700 ease-[cubic-bezier(.4,.1,.2,1)] ${
                hidden ? "pointer-events-none" : ""
              } ${hideOnMobile ? "max-sm:pointer-events-none max-sm:!opacity-0" : ""}`}
              style={{
                transformOrigin: "50% 200%",
                transform: `translateX(-50%) rotate(${offset * ANGLE}deg) scale(${
                  isActive ? 1.06 : 1 - abs * 0.05
                })`,
                zIndex: 30 - abs * 10,
                opacity: hidden ? 0 : 1,
              }}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-[28px] border-2 transition-all duration-700 ${t.card} ${
                  isActive
                    ? "shadow-[0_30px_70px_-18px_rgba(37,99,235,0.75)]"
                    : "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] brightness-75"
                }`}
              >
                {card.image ? (
                  <>
                    <img
                      src={card.image}
                      alt={card.title}
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`flex h-24 w-24 items-center justify-center rounded-3xl transition-transform duration-700 ${
                        isActive ? "scale-110" : ""
                      } ${t.iconBox}`}
                    >
                      <Icon size={44} />
                    </div>
                  </div>
                )}

                
                {isActive && (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="hs-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  </div>
                )}

                
                <div className="absolute left-5 top-5">
                  <p
                    className={`font-['Outfit'] text-xl font-semibold leading-tight sm:text-2xl ${
                      card.image ? "text-white" : ""
                    }`}
                  >
                    {card.title}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      card.image ? "text-white/75" : t.sub
                    }`}
                  >
                    {card.subtitle}
                  </p>
                </div>

                
                <a
                  href="#contact"
                  tabIndex={isActive ? 0 : -1}
                  className={`absolute right-4 top-5 hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-lg transition-all duration-500 hover:bg-black hover:text-white sm:inline-flex ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  Get Started
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <ArrowUpRight size={12} />
                  </span>
                </a>

                
                <span
                  className={`absolute bottom-5 left-5 flex h-10 w-10 items-center justify-center rounded-full ${t.play}`}
                >
                  {isActive && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                  )}
                  <Play
                    size={14}
                    fill="currentColor"
                    className="relative ml-0.5"
                  />
                </span>
              </div>
            </article>
          );
        })}

        
        <div className="absolute bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/60 px-3 py-2 shadow-lg backdrop-blur-md">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous card"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-1.5">
            {cards.map((card, i) => {
              const isCurrent = i === active;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${card.title}`}
                  className={`relative h-[6px] overflow-hidden rounded-full transition-all duration-500 ${
                    isCurrent
                      ? "w-8 bg-white/20"
                      : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                >
                  {isCurrent && (
                    <span
                      key={`${active}-${paused}`}
                      className="hs-progress absolute inset-y-0 left-0 rounded-full bg-blue-500"
                      style={{
                        animationPlayState: paused ? "paused" : "running",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next card"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-white hover:text-black"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div> */}

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
};

export default HeroSection;
