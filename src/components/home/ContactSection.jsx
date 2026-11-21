import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Clock,
  ArrowUpRight,
  Sparkles,
  Loader2,
} from "lucide-react";

/* ----------------------------------------------------------
   EDIT THESE DETAILS
   ---------------------------------------------------------- */
const CONTACT = {
  email: "hello@yourstudio.com",
  phone: "+91 00000 00000",
  location: "Haryana, India",
  hoursLabel: "Mon–Sat · 10:00 AM – 7:00 PM IST",
  timezone: "Asia/Kolkata",
  openFrom: 10, // 24h format
  openTo: 19,
  socials: [
    { name: "Instagram", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "LinkedIn", href: "#" },
  ],
};

const services = [
  "UGC Videos",
  "Reels & Shorts",
  "Brand Promo",
  "YouTube Editing",
  "Cinematic Video",
  "Something Else",
];

const budgets = ["Under ₹10k", "₹10k – ₹25k", "₹25k – ₹50k", "₹50k+"];

const perks = [
  "Reply within 24 hours",
  "Free discovery call",
  "Revisions included",
];

// waveform bar settings (height pattern + timing)
const bars = Array.from({ length: 28 }, (_, i) => ({
  delay: (i * 0.09) % 1.4,
  duration: 0.9 + ((i * 37) % 10) / 10,
}));

const inputBase =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10";

const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    services: [],
    budget: "",
    name: "",
    
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  // Live "open now" status
  useEffect(() => {
    const check = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: CONTACT.timezone })
      );
      const day = now.getDay();
      const hour = now.getHours() + now.getMinutes() / 60;
      setIsOpen(day !== 0 && hour >= CONTACT.openFrom && hour < CONTACT.openTo);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleService = (item) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(item)
        ? prev.services.filter((s) => s !== item)
        : [...prev.services, item],
    }));
    setErrors((prev) => ({ ...prev, services: undefined }));
  };

  // Form completion progress (5 key fields)
  const filled = [
    form.services.length > 0,
    !!form.budget,
    form.name.trim().length > 1,
    /^\S+@\S+\.\S+$/.test(form.email),
    form.message.trim().length > 9,
  ].filter(Boolean).length;
  const progress = (filled / 5) * 100;

  const validate = () => {
    const next = {};
    if (form.services.length === 0) next.services = "Select at least one";
    if (!form.budget) next.budget = "Pick a budget range";
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (form.message.trim().length < 10)
      next.message = "Tell us a little more (10+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || status === "sending") return;

    setStatus("sending");

    // TODO: connect your API / EmailJS / Formspree here and send `form`.
    setTimeout(() => setStatus("sent"), 1400);
  };

  const resetForm = () => {
    setForm({
      services: [],
      budget: "",
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setErrors({});
    setStatus("idle");
  };

  const contactRows = [
    {
      icon: Mail,
      label: "Email us",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Phone,
      label: "Call us",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Studio",
      value: CONTACT.location,
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-gradient-to-t  from-white to-indigo-100 py-16 text-black lg:py-24"
    >
      <style>{`
        @keyframes ct-eq {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
        .ct-bar {
          transform-origin: bottom;
          animation: ct-eq 1.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-bar { animation: none; transform: scaleY(0.6); }
        }
      `}</style>

      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="mx-auto max-w-[1300px] px-5 sm:px-10 lg:px-16">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
        

          <h2 className="mt-5 font-['Outfit'] text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
            Let's Create Something{" "}
            <span className="font-serif italic text-blue-600">
              Worth Watching.
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-black/60">
            Tell us about your idea and we'll get back with a clear plan,
            timeline and quote. No pressure, just a good conversation.
          </p>
        </motion.div>

        {/* MAIN CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 grid overflow-hidden rounded-[32px] bg-black shadow-[0_40px_90px_-30px_rgba(37,99,235,0.55)] lg:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:rounded-[40px]"
        >
          {/* LEFT: INFO */}
          <div className="relative isolate flex flex-col justify-between gap-10 overflow-hidden p-7 text-white sm:p-10">
            <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-blue-600/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full bg-blue-800/40 blur-3xl" />

            <div>
              {/* live status */}
              <div
                className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs font-semibold ${
                  isOpen
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  {isOpen && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      isOpen ? "bg-emerald-400" : "bg-white/40"
                    }`}
                  />
                </span>
                {isOpen
                  ? "We're online · replying fast"
                  : "Currently offline · we'll reply soon"}
              </div>

              <h3 className="mt-6 font-['Outfit'] text-3xl font-semibold leading-tight sm:text-4xl">
                Prefer to talk{" "}
                <span className="font-serif italic text-blue-400">
                  directly?
                </span>
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-white/50">
                <Clock size={14} />
                {CONTACT.hoursLabel}
              </p>

              {/* contact rows */}
              <div className="mt-8 space-y-3">
                {contactRows.map((row) => {
                  const RowIcon = row.icon;
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                        <RowIcon size={19} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                          {row.label}
                        </p>
                        <p className="truncate text-sm font-medium text-white sm:text-base">
                          {row.value}
                        </p>
                      </div>
                      {row.href && (
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
                        />
                      )}
                    </>
                  );

                  const cls =
                    "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition hover:border-blue-500/50 hover:bg-white/[0.07]";

                  return row.href ? (
                    <a key={row.label} href={row.href} className={cls}>
                      {content}
                    </a>
                  ) : (
                    <div key={row.label} className={cls}>
                      {content}
                    </div>
                  );
                })}
              </div>

              {/* perks */}
              <div className="mt-6 flex flex-wrap gap-2">
                {perks.map((perk) => (
                  <span
                    key={perk}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80"
                  >
                    <Check size={12} className="text-blue-400" />
                    {perk}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* waveform */}
              <div
                aria-hidden="true"
                className="flex h-14 items-end gap-[3px] opacity-80"
              >
                {bars.map((bar, i) => (
                  <span
                    key={i}
                    className="ct-bar h-full w-1 flex-1 rounded-full bg-gradient-to-t from-blue-700 to-blue-400"
                    style={{
                      animationDelay: `${bar.delay}s`,
                      animationDuration: `${bar.duration}s`,
                    }}
                  />
                ))}
              </div>

              {/* socials */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs text-white/40">Follow us</span>
                {CONTACT.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    {social.name}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="m-2.5 rounded-[26px] bg-white p-6 sm:m-3 sm:p-9 lg:rounded-[32px]">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[520px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 15 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_15px_40px_-8px_rgba(37,99,235,0.7)]"
                  >
                    <Check size={38} strokeWidth={3} />
                  </motion.span>

                  <h3 className="mt-6 font-['Outfit'] text-3xl font-semibold">
                    Message Sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-black/55">
                    Thanks {form.name.split(" ")[0] || "there"}, we've got your
                    details and will reply to{" "}
                    <span className="font-semibold text-black">
                      {form.email}
                    </span>{" "}
                    within 24 hours.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-7 rounded-full border-2 border-black px-6 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* progress */}
                  <div className="mb-7">
                    <div className="mb-2 flex items-center justify-between text-[11px] font-semibold tracking-wide">
                      <span className="text-black/50">
                        PROJECT BRIEF · {filled}/5
                      </span>
                      <span className="text-blue-600">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400"
                      />
                    </div>
                  </div>

                  {/* 01 services */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-blue-600">01</span>
                        What do you need?
                      </p>
                      {errors.services && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.services}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {services.map((item) => {
                        const selected = form.services.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleService(item)}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                              selected
                                ? "border-blue-600 bg-blue-600 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.8)]"
                                : "border-slate-200 bg-white text-black/70 hover:border-blue-400 hover:text-blue-600"
                            }`}
                          >
                            {selected && <Check size={13} />}
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 02 budget */}
                  <div className="mt-7">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <span className="text-blue-600">02</span>
                        Your budget
                      </p>
                      {errors.budget && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.budget}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {budgets.map((item) => {
                        const selected = form.budget === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setField("budget", item)}
                            className={`rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition ${
                              selected
                                ? "border-black bg-black text-white"
                                : "border-slate-200 bg-slate-50 text-black/70 hover:border-black"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 03 details */}
                  <div className="mt-7">
                    <p className="mb-3 flex items-center gap-2 text-sm font-bold">
                      <span className="text-blue-600">03</span>
                      Your details
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <input
                          type="text"
                          placeholder="Full name"
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          className={`${inputBase} ${
                            errors.name ? "!border-red-400" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>
                         <input
                      type="tel"
                      placeholder="Phone / WhatsApp (optional)"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={`${inputBase}`}
                    />

                   
                    </div>

                 

                    <textarea
                      rows={4}
                      placeholder="Tell us about your project, goals and deadline..."
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      className={`${inputBase} mt-3 resize-none ${
                        errors.message ? "!border-red-400" : ""
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-blue-600 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_18px_40px_-12px_rgba(37,99,235,0.8)] transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={17}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>                 
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;