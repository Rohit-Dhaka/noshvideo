import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Zap, Scissors, Camera, Plus } from "lucide-react";

/* ------------------------------------------------------------------
   Two services, two sets of packages. Edit text and prices here.
   Switching the toggle swaps everything below it.
------------------------------------------------------------------- */
const services = {
  video: {
    label: "Video Editing",
    badge: "48h delivery",
    icon: Scissors,
    unit: "/ video",
    description:
      "Reels, ad films and brand stories, cut to hold attention and built to convert. Pick the edit that fits your content.",
    plans: [
      {
        name: "Starter",
        price: "₹999",
        desc: "Ideal for creators and small brands posting everyday short-form content.",
        features: [
          "Short-form video editing",
          "Smooth transitions",
          "Background music",
          "Basic color correction",
          "2 Revisions",
        ],
      },
      {
        name: "Professional",
        price: "₹2,499",
        featured: true,
        desc: "Built for brands that need polished edits, strong visuals and fast turnaround.",
        features: [
          "Premium video editing",
          "Professional color grading",
          "Motion graphics & effects",
          "Sound design",
          "Captions & subtitles",
          "3 Revisions",
          "Priority delivery",
        ],
      },
      {
        name: "Premium",
        price: "₹4,999",
        desc: "For cinematic projects that need storytelling, effects and top-tier finishing.",
        features: [
          "Cinematic video editing",
          "Advanced storytelling",
          "Custom motion graphics",
          "Premium visual effects",
          "Advanced sound design",
          "4 Revisions",
        ],
      },
    ],
  },
  model: {
    label: "Model Shoots",
    badge: "Pro models",
    icon: Camera,
    unit: "/ shoot",
    description:
      "Confident, professional on-camera models for your campaigns, promotions and product features. Pick the shoot that fits your brand.",
    plans: [
      {
        name: "Starter",
        price: "₹5,000",
        desc: "Ideal for quick brand shoots and simple product features.",
        features: [
          "1 professional model",
          "2-hour shoot session",
          "1 outfit / look",
          "10 edited photos",
          "1 Revision",
        ],
      },
      {
        name: "Professional",
        price: "₹9,999",
        featured: true,
        desc: "Built for campaigns and promotions that need variety and a short video clip.",
        features: [
          "1 professional model",
          "Half-day shoot session",
          "Up to 3 looks",
          "25 edited photos",
          "Short reel clip included",
          "Social media usage rights",
          "Styling guidance",
        ],
      },
      {
        name: "Premium",
        price: "₹19,999",
        desc: "For full productions with multiple models, looks and cinematic video.",
        features: [
          "Up to 2 models",
          "Full-day shoot session",
          "Unlimited looks",
          "50+ edited photos",
          "Cinematic video with editing",
          "Extended usage rights",
        ],
      },
    ],
  },
};

const PricingSection = () => {
  const [mode, setMode] = useState("video");
  const current = services[mode];

  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#050505] py-14 text-white lg:py-20"
    >
    

      <div className="mx-auto max-w-[1200px] px-5 sm:px-10 lg:px-16">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="font-['Outfit'] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">
            Videos Edited. Models
            <span className="block text-blue-500">
              <span className="font-serif italic">C</span>ast. One Studio.
            </span>
          </h2>

          {/* Service switch */}
          <div
            role="tablist"
            aria-label="Choose a service"
            className="relative mt-9 inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md"
          >
            {Object.entries(services).map(([key, service]) => {
              const Icon = service.icon;
              const isActive = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMode(key)}
                  className={`relative z-10 flex items-center gap-2  px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                    isActive ? "text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pricing-switch"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="absolute inset-0 -z-10 rounded-full bg-white"
                    />
                  )}
                  <Icon size={15} />
                  {service.label}
                  <span
                    className={`hidden rounded-md px-1.5 py-0.5 text-[10px] font-bold sm:inline ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {service.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* <motion.p
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base"
          >
            {current.description}
          </motion.p> */}
        </motion.div>

        {/* PLANS */}
        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:items-center lg:gap-5">
          {current.plans.map((plan, index) => {
            const f = plan.featured;

            const card = (
              <div
                className={`flex flex-col rounded-3xl p-6 sm:p-7 ${
                  f
                    ? "border border-white/10 bg-[#0d0d12]"
                    : "border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                }`}
              >
                <h3 className="font-['Outfit'] text-lg font-semibold text-white">
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-end gap-1.5">
                  <span className="font-['Outfit'] text-5xl font-semibold tracking-tight sm:text-6xl">
                    {plan.price}
                  </span>
                  <span className="mb-2 text-sm text-white/50">
                    {current.unit}
                  </span>
                </div>

                <p className="mt-4 min-h-[60px] text-sm leading-6 text-white/50">
                  {plan.desc}
                </p>

                <Link
                  to="/contact"
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-300 ${
                    f
                      ? "bg-blue-600 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.9)] hover:bg-blue-500"
                      : "bg-blue-500/15 text-blue-300 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Book {plan.name}
                  <ArrowUpRight size={16} />
                </Link>

                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                          f
                            ? "border-blue-400 bg-blue-500/20 text-blue-300"
                            : "border-white/25 text-white/60"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-white/75">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            return (
              <motion.div
                key={`${mode}-${plan.name}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {f ? (
                  /* Featured: card wrapped with "Most Recommended" tab */
                  <div className="rounded-[30px] border border-blue-500/30 bg-blue-500/15 p-1.5 pt-0 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.6)]">
                    <div className="flex h-11 items-center justify-center gap-2 text-sm font-semibold text-blue-300">
                      <Zap size={15} fill="currentColor" />
                      Most Recommended
                    </div>
                    {card}
                  </div>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>

        {/* COMBO BANNER: model + edit together */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-14 flex flex-col justify-between gap-7 overflow-hidden rounded-3xl bg-blue-600 p-6 sm:p-8 lg:flex-row lg:items-center"
        >
          <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -right-4 -top-12 h-40 w-40 rounded-full border border-white/15" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
                <Scissors size={24} />
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Plus size={15} />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white">
                <Camera size={24} />
              </span>
            </div>

            <div>
              <h3 className="font-['Outfit'] text-xl font-semibold sm:text-2xl">
                Need a model{" "}
                <span className="font-serif italic">and</span> the edit?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Book a model shoot and video editing together as one bundle.
                Bulk videos, monthly editing and fully custom projects are
                welcome too.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="group relative inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Get Combo Quote
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

// import { motion } from "motion/react";
// import { Link } from "react-router-dom";
// import {
//   ArrowUpRight,
//   Check,
//   Sparkles,
//   MessageCircle,
//   Video,
//   Clapperboard,
// } from "lucide-react";

// const plans = [
//   {
//     name: "Starter",
//     subtitle: "For everyday content",
//     price: "₹999",
//     icon: MessageCircle,
//     features: [
//       "Short-form video editing",
//       "Smooth transitions",
//       "Background music",
//       "Basic color correction",
//       "2 Revisions",
//     ],
//   },
//   {
//     name: "Professional",
//     subtitle: "For creators & brands",
//     price: "₹2,499",
//     featured: true,
//     icon: Video,
//     features: [
//       "Premium video editing",
//       "Professional color grading",
//       "Motion graphics & effects",
//       "Sound design",
//       "Captions & subtitles",
//       "3 Revisions",
//     ],
//   },
//   {
//     name: "Premium",
//     subtitle: "For cinematic projects",
//     price: "₹4,999",
//     icon: Clapperboard,
//     features: [
//       "Cinematic video editing",
//       "Advanced storytelling",
//       "Custom motion graphics",
//       "Premium visual effects",
//       "Advanced sound design",
//       "4 Revisions",
//     ],
//   },
// ];

// const PricingSection = () => {
//   return (
//     <section className="bg-white py-12 lg:py-16">
//       <div className="w-full px-5 sm:px-10 lg:px-16">
//         <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
//           {/* LEFT SIDE */}
//           <motion.div
//             initial={{ opacity: 0, x: -25 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7 }}
//             className="lg:sticky lg:top-28"
//           >
//             <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-blue-600">
//               <Sparkles size={15} />
//               PRICING & PACKAGES
//             </span>

//             <h2 className="mt-6 font-['Outfit'] text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
//               Creative Videos.
//               <span className="block text-blue-600">Clear Pricing.</span>
//             </h2>

//             <p className="mt-6 max-w-md text-base leading-8 text-slate-800">
//               Every video deserves the right creative touch. Choose a package
//               that fits your content, or let's create something completely
//               custom.
//             </p>

//             <div className="mt-9 space-y-5">
//               {[
//                 "Professional video editing",
//                 "Creative storytelling",
//                 "Quality-focused delivery",
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-3">
//                   <span className="flex h-6 w-6 items-center justify-center bg-blue-50 text-blue-600">
//                     <Check size={15} strokeWidth={2.5} />
//                   </span>
//                   <span className="text-sm font-semibold text-slate-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-10 border-l-2 border-blue-600 pl-5">
//               <p className="text-xl font-black text-slate-950">
//                 Have a bigger project?
//               </p>
//               <p className="mt-2 text-sm leading-6 text-slate-500">
//                 Get a custom editing package designed around your needs.
//               </p>
//             </div>

//             <Link
//               to="/contact"
//               className="mt-7 inline-flex items-center gap-3 bg-slate-950 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-700"
//             >
//               Get Custom Quote
//               <ArrowUpRight size={18} />
//             </Link>
//           </motion.div>

//           {/* RIGHT SIDE - BOOKING OPTIONS */}
//           <div className="space-y-5">
//             {plans.map((plan, index) => {
//               const Icon = plan.icon;

//               return (
//                 <motion.div
//                   key={plan.name}
//                   initial={{ opacity: 0, x: 25 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: index * 0.12 }}
//                   className={`border p-6 sm:p-7 ${
//                     plan.featured
//                       ? "border-blue-600 bg-blue-600 text-white"
//                       : "border-blue-100 bg-[#eff6ff] text-slate-950"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`flex h-11 w-11 shrink-0 items-center justify-center ${
//                           plan.featured
//                             ? "bg-white/15 text-white"
//                             : "bg-blue-600/10 text-blue-600"
//                         }`}
//                       >
//                         <Icon size={21} />
//                       </div>

//                       <div>
//                         <h3 className="text-lg font-black">{plan.name}</h3>
//                         <p
//                           className={`mt-1 text-xs ${
//                             plan.featured ? "text-blue-100" : "text-slate-500"
//                           }`}
//                         >
//                           {plan.subtitle}
//                         </p>
//                       </div>
//                     </div>

//                     {plan.featured && (
//                       <span className="bg-white px-3 py-1.5 text-[9px] font-bold tracking-widest text-blue-700">
//                         POPULAR
//                       </span>
//                     )}
//                   </div>

//                   <div className="my-6 border-t border-current opacity-15" />

//                   <div className="grid gap-3 sm:grid-cols-2">
//                     {plan.features.map((feature) => (
//                       <div
//                         key={feature}
//                         className="flex items-center gap-2 text-sm"
//                       >
//                         <Check
//                           size={15}
//                           className={`shrink-0 ${
//                             plan.featured ? "text-white" : "text-blue-600"
//                           }`}
//                         />
//                         {feature}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
//                     <div>
//                       <p
//                         className={`text-[10px] font-bold uppercase tracking-widest ${
//                           plan.featured ? "text-blue-200" : "text-slate-500"
//                         }`}
//                       >
//                         Starting at
//                       </p>
//                       <p className="mt-1 text-3xl font-black">
//                         {plan.price}
//                         <span
//                           className={`ml-1 text-xs font-medium ${
//                             plan.featured ? "text-blue-100" : "text-slate-500"
//                           }`}
//                         >
//                           / video
//                         </span>
//                       </p>
//                     </div>

//                     <Link
//                       to="/contact"
//                       className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors ${
//                         plan.featured
//                           ? "bg-white text-blue-700 hover:bg-blue-50"
//                           : "bg-blue-600 text-white hover:bg-blue-700"
//                       }`}
//                     >
//                       Book Now
//                       <ArrowUpRight size={17} />
//                     </Link>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingSection;
