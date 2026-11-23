import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Target,
  PenLine,
  Users,
  Scissors,
  PackageCheck,
  Check,
  Clock,
  Star,
  FileVideo,
} from "lucide-react";

const STEP_DURATION = 5000;

const steps = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    short: "Goals, audience & content angle",
    text: "We start with your brand, your audience and your goal. Then we decide the platforms, the content angles and the style of UGC that will actually convert.",
    duration: "Day 1–2",
    icon: Target,
    points: [
      "Brand & audience research",
      "Platform and format plan",
      "Content angles & hooks",
      "Clear success metrics",
    ],
  },
  {
    id: "script",
    number: "02",
    title: "Script",
    short: "Hooks, story and call to action",
    text: "Every video gets a tight script built around a scroll-stopping hook, a simple story and a strong call to action, written in a natural, creator-friendly voice.",
    duration: "Day 2–3",
    icon: PenLine,
    points: [
      "Scroll-stopping hook lines",
      "Shot-by-shot storyboard",
      "Natural creator-style tone",
      "Approval before shooting",
    ],
  },
  {
    id: "creator",
    number: "03",
    title: "Creator Selection",
    short: "The right face for your brand",
    text: "We shortlist creators who fit your niche, audience and vibe. You see the options, and we brief the chosen creators so the footage feels real and on-brand.",
    duration: "Day 3–5",
    icon: Users,
    points: [
      "Niche & audience match",
      "Shortlist for your approval",
      "Detailed creator brief",
      "Footage guidance & review",
    ],
  },
  {
    id: "editing",
    number: "04",
    title: "Editing",
    short: "Cuts, captions, sound & grading",
    text: "Raw footage becomes polished short-form content: sharp cuts, dynamic captions, sound design and colour grading, all tuned for Reels, Shorts and ads.",
    duration: "Day 5–8",
    icon: Scissors,
    points: [
      "Fast-paced cuts & transitions",
      "Captions and motion text",
      "Music & sound design",
      "Colour grading & polish",
    ],
  },
  {
    id: "delivery",
    number: "05",
    title: "Delivery",
    short: "Ready-to-post files, on time",
    text: "You receive final videos in every format you need, ready to publish. Need changes? We include revision rounds so the result is exactly right.",
    duration: "Day 8–10",
    icon: PackageCheck,
    points: [
      "Multiple aspect ratios",
      "Revision rounds included",
      "Organised file handover",
      "On-time delivery",
    ],
  },
];



const StrategyVisual = () => {
  const goals = [
    { label: "Awareness", value: 82 },
    { label: "Engagement", value: 68 },
    { label: "Conversions", value: 91 },
  ];
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      {goals.map((goal) => (
        <div key={goal.label}>
          <div className="mb-1 flex justify-between text-[11px] font-medium text-slate-500">
            <span>{goal.label}</span>
            <span className="font-bold text-blue-600">{goal.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ScriptVisual = () => {
  const blocks = [
    { tag: "HOOK", time: "0–3s", w: ["90%", "60%"] },
    { tag: "STORY", time: "3–20s", w: ["100%", "85%", "70%"] },
    { tag: "CTA", time: "20–30s", w: ["75%"] },
  ];
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => (
        <motion.div
          key={block.tag}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
        >
          <div className="w-14 shrink-0">
            <p className="text-[10px] font-bold tracking-wider text-blue-600">
              {block.tag}
            </p>
            <p className="text-[10px] text-slate-400">{block.time}</p>
          </div>
          <div className="flex-1 space-y-1.5 pt-1">
            {block.w.map((w, j) => (
              <div
                key={j}
                style={{ width: w }}
                className="h-[6px] rounded-full bg-slate-300"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CreatorVisual = () => {
  const creators = [
    { initial: "A", niche: "Lifestyle", match: 94, selected: true },
    { initial: "R", niche: "Fashion", match: 88, selected: false },
    { initial: "S", niche: "Tech Reviews", match: 81, selected: false },
  ];
  return (
    <div className="space-y-2.5">
      {creators.map((c, i) => (
        <motion.div
          key={c.initial}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.12 }}
          className={`flex items-center gap-3 rounded-xl border p-3 ${
            c.selected
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {c.initial}
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-black">{c.niche}</p>
            <p className="flex items-center gap-1 text-[11px] text-slate-500">
              <Star size={11} className="text-yellow-500" fill="currentColor" />
              {c.match}% match
            </p>
          </div>
          {c.selected ? (
            <span className="flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white">
              <Check size={11} /> SELECTED
            </span>
          ) : (
            <span className="rounded-full border border-slate-300 px-2.5 py-1 text-[10px] font-semibold text-slate-400">
              SHORTLIST
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const EditingVisual = () => {
  const tracks = [
    [
      { w: "34%", c: "bg-blue-500" },
      { w: "24%", c: "bg-sky-400" },
      { w: "30%", c: "bg-blue-700" },
    ],
    [
      { w: "18%", c: "bg-sky-400" },
      { w: "46%", c: "bg-blue-600" },
      { w: "26%", c: "bg-blue-400" },
    ],
    [
      { w: "60%", c: "bg-blue-800" },
      { w: "30%", c: "bg-blue-500" },
    ],
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold tracking-wider text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-[6px] w-1.5 animate-pulse rounded-full bg-red-500" />
          TIMELINE
        </span>
        <span className="font-mono">00:00:24</span>
      </div>
      <div className="relative space-y-1.5">
        {tracks.map((track, i) => (
          <div key={i} className="flex gap-1">
            {track.map((clip, j) => (
              <motion.div
                key={j}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                style={{ width: clip.w, originX: 0 }}
                transition={{ delay: 0.1 + i * 0.1 + j * 0.08 }}
                className={`h-5 rounded ${clip.c}`}
              />
            ))}
          </div>
        ))}
        <motion.span
          initial={{ left: "2%" }}
          animate={{ left: "96%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute -bottom-1 -top-1 w-0.5 rounded bg-black"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-slate-600">
        {["Cuts", "Captions", "Sound", "Color"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

const DeliveryVisual = () => {
  const files = [
    { name: "Reel_9x16.mp4", meta: "1080 × 1920" },
    { name: "Short_9x16.mp4", meta: "1080 × 1920" },
    { name: "Post_1x1.mp4", meta: "1080 × 1080" },
    { name: "Ad_16x9.mp4", meta: "1920 × 1080" },
  ];
  return (
    <div className="space-y-2">
      {files.map((file, i) => (
        <motion.div
          key={file.name}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 + i * 0.1 }}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <FileVideo size={16} />
          </span>
          <div className="flex-1">
            <p className="text-[13px] font-medium text-black">{file.name}</p>
            <p className="text-[10px] text-slate-400">{file.meta}</p>
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Check size={12} />
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const visuals = {
  strategy: StrategyVisual,
  script: ScriptVisual,
  creator: CreatorVisual,
  editing: EditingVisual,
  delivery: DeliveryVisual,
};



const UGCPlanningSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.25 });

  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [active, inView, tick]);

  const goTo = (index) => {
    setActive(index);
    setTick((t) => t + 1);
  };

  const step = steps[active];
  const Icon = step.icon;
  const Visual = visuals[step.id];

  return (
    <section
      id="planning"
      ref={sectionRef}
      className="relative isolate overflow-hidden  py-16 text-black lg:py-24"
    >
      <style>{`
        @keyframes ugc-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        .ugc-fill { animation: ugc-fill ${STEP_DURATION}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ugc-fill { animation: none; width: 100%; }
        }
      `}</style>

      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
        >
          <div>
            <h2 className="mt-5 font-['Outfit'] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
              UGC Video{" "}
              <span className="font-serif italic text-blue-600">
                Production{" "}
              </span>
              <span className="sm:block">In 5 Steps.</span>
            </h2>
          </div>

          <p className="text-base leading-6 sm:leading-8 text-black/60">
            No guesswork, no chaos. A simple, transparent workflow that takes
            your brand from planning to final delivery, with approvals at every
            important stage.
          </p>
        </motion.div>

        
        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {steps.map((item, index) => {
              const StepIcon = item.icon;
              const isActive = index === active;
              const isDone = index < active;
              

              return (
                <div key={item.id} className="flex gap-3 sm:gap-4 max-sm:items-center">
                  
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-label={`Go to step ${item.number}: ${item.title}`}
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "scale-110 border-blue-600 bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.45)]"
                          : isDone
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-slate-300 bg-white text-slate-400 hover:border-blue-400 hover:text-blue-500"
                      }`}
                    >
                      {isDone ? <Check size={18} /> : <StepIcon size={18} />}
                    </button>
                  </div>

          
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    className={`mb-3 flex-1 rounded-2xl border px-4 sm:px-5 py-3 sm:py-4 text-left transition-all duration-500 ${
                      isActive
                        ? "border-blue-200 bg-white shadow-[0_15px_40px_-15px_rgba(37,99,235,0.35)]"
                        : "border-transparent hover:bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className={`font-['Outfit'] text-xl font-semibold transition-colors sm:text-2xl ${
                          isActive ? "text-black" : "text-black/70"
                        }`}
                      >
                        {item.title}
                      </p>
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-blue-600" : "text-black/25"
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black/70">{item.short}</p>
                  </button>
                </div>
              );
            })}
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.35)] sm:p-8">
              
              <span className="pointer-events-none absolute -right-2 -top-4 select-none font-['Outfit'] text-[130px] font-bold leading-none text-blue-600/[0.06] sm:text-[170px]">
                {step.number}
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_10px_30px_-5px_rgba(37,99,235,0.6)]">
                      <Icon size={22} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.25em] text-blue-600">
                        STEP {step.number} / 0{steps.length}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-black/70">
                        <Clock size={12} />
                        {step.duration}
                      </p>
                    </div>
                  </div>

                  <h3 className="mt-5 font-['Outfit'] text-3xl font-semibold sm:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-black/60 sm:text-base">
                    {step.text}
                  </p>

                  
                  <div className="mt-6">
                    <Visual />
                  </div>

                  
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {step.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2.5 text-sm font-medium text-black/80"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <Check size={12} />
                        </span>
                        {point}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UGCPlanningSection;
