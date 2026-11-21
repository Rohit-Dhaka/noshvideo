import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArrowRight, ArrowLeft, Play } from "lucide-react";

import { models } from "../../data/model.data.jsx";

import "swiper/css";

const AUTOPLAY_MS = 3500;

const ModelSection = () => {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = models.length;

  // Autoplay: moves the active card (and so the background) forward
  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  // Keep the slider scrolled to the active card
  useEffect(() => {
    swiperRef.current?.slideTo(active);
  }, [active]);

  if (!total) return null;

  const goPrev = () => setActive((prev) => (prev - 1 + total) % total);
  const goNext = () => setActive((prev) => (prev + 1) % total);
  const progress = ((active + 1) / total) * 100;

  return (
    <section
      id="model"
      className="relative isolate flex min-h-screen overflow-hidden bg-black text-white"
    >
      {/* Background: left half image, fades into black on the right */}
      <div className="absolute inset-y-0 left-0 -z-30 w-full lg:w-[60%]">
        {models.map((model, i) => (
          <img
            key={model.id}
            src={model.image}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Left to right: image fades into the black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-black/25 to-black" />

        {/* Top and bottom fade for smooth edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        {/* Extra dark layer on mobile so text stays readable */}
        <div className="absolute inset-0 bg-black/50 lg:hidden" />
      </div>

      {/* Blue glow */}
      {/* <div className="absolute -left-40 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" /> */}

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-end gap-12 px-5 pb-14 pt-28 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:px-16 lg:pb-16">
        {/* LEFT: heading, description, buttons only */}
        <div className="max-w-xl">
          <h2 className="font-['Outfit'] text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
            Your Brand.
            <span className="block text-blue-500">Her Presence.</span>
            <span className="block">A Lasting Impression.</span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base">
            Work with{" "}
            <span className="font-semibold text-white">Nosh Infotech</span> and
            bring your brand story to life with confident, professional
            on-camera models. Packages start from{" "}
            <span className="font-semibold text-blue-400">₹5,000</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Book a Call
            </a>
            <a
              href="#videos"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            >
              View More Works
            </a>
          </div>
        </div>

        {/* RIGHT: slider (bottom right) */}
        <div
          className="min-w-0 lg:-mr-16 lg:pl-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Swiper
            slidesPerView="auto"
            spaceBetween={16}
            speed={700}
            grabCursor
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="!overflow-visible lg:!overflow-hidden"
          >
            {models.map((model, i) => {
              const isActive = i === active;
              return (
                <SwiperSlide
                  key={model.id}
                  className="!h-auto !w-[200px] sm:!w-[230px] lg:!w-[250px]"
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${model.name}`}
                    aria-current={isActive}
                    className={`group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 text-left transition-all duration-500 ${
                      isActive
                        ? "border-blue-500 opacity-100 shadow-[0_0_30px_rgba(37,99,235,0.45)]"
                        : "border-white/10 opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

                    {/* Play icon */}
                    <span
                      className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                        isActive ? "bg-blue-600" : "bg-white/25"
                      }`}
                    >
                      <Play size={13} fill="white" className="text-white" />
                    </span>

                    {/* Name */}
                    <span className="absolute bottom-3 left-3 right-3 truncate text-sm font-medium text-white">
                      {model.name}
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Controls + progress line */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous model"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-black"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next model"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-500"
            >
              <ArrowRight size={18} />
            </button>

            <div className="relative ml-2 h-px max-w-[220px] flex-1 bg-white/25">
              <div
                className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-blue-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelSection;

// import { useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectCards } from "swiper/modules";

// import { ArrowRight, Sparkles, Camera, Star } from "lucide-react";

// import { models } from "../../data/model.data.jsx";

// import "swiper/css";
// import "swiper/css/effect-cards";

// const ModelSection = () => {
//   const swiperRef = useRef(null);

//   if (!models.length) return null;

//   return (
//     <section
//       className="relative overflow-hidden bg-[#eff6ff] py-12 lg:py-16"
//       id="model"
//     >
//       <div className="relative z-10 grid w-full items-center gap-14 px-5 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-16">
//         <div className="relative z-20">
//           <div className="mb-6 inline-flex items-center gap-2 border border-blue-200 bg-white px-4 py-2 text-xs font-bold tracking-[0.2em] text-blue-700">
//             <Sparkles size={15} />
//             MODEL PORTFOLIO
//           </div>
//           <h2 className="font-['Outfit'] text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
//             Your Brand.
//             <span className="block text-blue-600">Her Presence.</span>
//             <span className="block">A Lasting Impression.</span>
//           </h2>
//           <div className="mt-7 flex items-center gap-3">
//             <div className="h-1 w-16 bg-blue-600" />
//             <div className="h-1 w-6 bg-blue-300" />
//             <div className="h-1 w-2 bg-blue-200" />
//           </div>

//           <p className="mt-7 max-w-xl text-base leading-8 text-slate-800 sm:text-lg">
//             Give your next campaign a fresh identity. Work with{" "}
//             <span className="font-bold text-blue-600">Nosh Infotech</span> and
//             bring your brand story to life with confidence, personality, and a
//             professional on-camera presence.
//           </p>

//           {/* Service Highlights */}
//           <div className="mt-6  sm:mt-8 grid grid-cols-2 gap-2 sm:gap-3">
//             <div className="flex items-center gap-3 border border-blue-100 bg-white p-4">
//               <div className="flex h-10 max-sm:hidden w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
//                 <Camera size={20} />
//               </div>

//               <div>
//                 <p className="text-sm font-bold text-slate-900">Brand Shoots</p>
//                 <p className="mt-1 text-xs text-slate-500">Campaign visuals</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 border border-blue-100 bg-white p-4">
//               <div className="flex max-sm:hidden h-10 w-10 shrink-0 items-center justify-center bg-blue-50 text-blue-600">
//                 <Star size={20} />
//               </div>

//               <div>
//                 <p className="text-sm font-bold text-slate-900">Promotions</p>
//                 <p className="mt-1 text-xs text-slate-500">Product features</p>
//               </div>
//             </div>
//           </div>

//           {/* Pricing */}
//           <div className="mt-6 sm:mt-7 inline-flex flex-wrap items-center gap-3 border-l-4 border-blue-600 bg-white px-5 py-4">
//             <div>
//               <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Starting packages
//               </p>

//               <p className="mt-1 font-['Outfit'] text-2xl font-extrabold text-slate-900">
//                 ₹5,000
//                 <span className="ml-1 text-sm font-medium text-slate-500">
//                   onwards
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT MODEL SHOWCASE */}
//         <div className="relative flex min-w-0 flex-col items-center justify-center">
//           {/* Outer Frame */}
//           <div className="relative">
//             <div className="absolute -left-5 -top-5 h-24 w-24 border-l-2 border-t-2 border-blue-400" />

//             <div className="absolute -bottom-5 -right-5 h-24 w-24 border-b-2 border-r-2 border-blue-400" />

//             {/* Floating Top Label */}
//             <div className="absolute -right-3 top-8 z-20 flex items-center gap-2 bg-blue-600 px-4 py-3 text-white sm:-right-8">
//               <Sparkles size={16} />
//               <span className="text-xs font-bold tracking-wider">
//                 BRAND CAMPAIGNS
//               </span>
//             </div>

//             {/* Swiper */}
//             <Swiper
//               modules={[EffectCards, Autoplay]}
//               effect="cards"
//               cardsEffect={{
//                 slideShadows: false,
//                 rotate: true,
//                 perSlideOffset: 14,
//                 perSlideRotate: 3,
//               }}
//               onSwiper={(swiper) => {
//                 swiperRef.current = swiper;
//               }}
//               grabCursor
//               loop={models.length > 2}
//               speed={800}
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               className="model-cards-swiper !w-[250px] sm:!w-[320px] lg:!w-[360px]"
//             >
//               {models.map((model) => (
//                 <SwiperSlide
//                   key={model.id}
//                   className="!h-auto !overflow-hidden bg-white"
//                 >
//                   <div className="relative w-full bg-white p-3 pb-14 sm:p-4 sm:pb-16">
//                     {/* Image */}
//                     <div className="group relative aspect-[4/5] w-full overflow-hidden bg-slate-200">
//                       <img
//                         src={model.image}
//                         alt={model.name}
//                         loading="lazy"
//                         draggable={false}
//                         className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//                       />

//                       {/* Image Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

//                       {/* Image Label */}
//                       <div className="absolute rounded-full left-3 top-3 border border-white/50 bg-black/20 px-3 py-2 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-sm">
//                         MODEL PORTFOLIO
//                       </div>
//                     </div>

//                     {/* Model Name */}
//                     <div className="absolute bottom-3 left-0 right-0 text-center sm:bottom-4">
//                       <p className="font-['Caveat',cursive] text-2xl text-slate-800 sm:text-3xl">
//                         {model.name}
//                       </p>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Floating Bottom Label */}
//             {/* <div className="absolute -bottom-5 -left-4 z-20 flex items-center gap-3 border border-blue-100 bg-white px-4 py-3 sm:-left-8">
//               <div className="flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
//                 <Camera size={19} />
//               </div>

//               <div>
//                 <p className="text-xs font-bold text-slate-900">
//                   On-Camera Presence
//                 </p>
//                 <p className="mt-1 text-[10px] text-slate-500">
//                   Made for your brand
//                 </p>
//               </div>
//             </div> */}
//           </div>

//           {/* Navigation */}
//           <div className="relative z-30 mt-12 flex items-center justify-center gap-3">
//             <button
//               type="button"
//               onClick={() => swiperRef.current?.slidePrev()}
//               aria-label="Previous model"
//               className="flex h-12 w-12 rounded items-center justify-center border border-blue-200 bg-white text-slate-800 transition hover:bg-blue-600 hover:text-white"
//             >
//               <ArrowRight className="rotate-180" size={19} />
//             </button>

//             <button
//               type="button"
//               onClick={() => swiperRef.current?.slideNext()}
//               aria-label="Next model"
//               className="flex h-12 w-12 rounded items-center justify-center bg-blue-600 text-white transition hover:bg-blue-700"
//             >
//               <ArrowRight size={19} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ModelSection;
