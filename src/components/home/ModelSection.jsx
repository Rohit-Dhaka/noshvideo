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

  useEffect(() => {
    if (paused || total < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  
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
      <div className="absolute inset-y-0 left-0 -z-30 w-full lg:w-[60%]">
        {models.map((model, i) => (
          <img
            key={`${model.id}-${i}`}
            src={model.image}
            alt="model"
            aria-hidden="true"
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover object-[center_20%] transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-black/25 to-black" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

        <div className="absolute inset-0 bg-black/50 lg:hidden" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-end gap-8 sm:gap-12 px-5 pb-14 pt-28 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 lg:px-16 lg:pb-16">
        <div className="max-w-xl">
          <h2 className="font-['Outfit'] text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]">
            Your Brand.{" "}
            <span className="sm:block text-blue-500">Her Presence.</span>{" "}
            <span className="sm:block">A Lasting Impression.</span>
          </h2>

          <p className="mt-3 sm:mt-6 max-w-md text-sm leading-6 sm:leading-7 text-white/75 sm:text-base">
            Work with{" "}
            <span className="font-semibold text-white">Nosh Infotech</span> and
            bring your brand story to life with confident, professional
            on-camera models. Packages start from{" "}
            <span className="font-semibold text-blue-400">₹5,000</span>.
          </p>

          <div className="mt-4 sm:mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/919253174295?text=Hello%2C%20I%20would%20like%20to%20book%20a%20call%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Book a Call
            </a>
          </div>
        </div>

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
                  key={`${model.id}-${i}`}
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

                    <span
                      className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                        isActive ? "bg-blue-600" : "bg-white/25"
                      }`}
                    >
                      <Play size={13} fill="white" className="text-white" />
                    </span>

                    <span className="absolute bottom-3 left-3 right-3 truncate text-sm font-medium text-white">
                      {model.name}
                    </span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>

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
