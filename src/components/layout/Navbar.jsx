import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Logo from "../../assets/Images/Logo.webp";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Model", path: "/#model" },
  { name: "Videos", path: "/#videos" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [progress, setProgress] = useState(0);

  const location = useLocation();

  // Scroll effect + reading progress
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section navigation
  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const sectionId = location.hash.replace("#", "");

    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [location.pathname, location.hash]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/" && !location.hash
      : path.startsWith("/#")
        ? location.pathname === "/" && location.hash === path.replace("/", "")
        : location.pathname === path;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-0 transition-all duration-500">
        <div
          className={`relative mx-auto flex items-center justify-between overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl transition-all duration-500 ${
            isScrolled
              ? "mt-3 mx-3 h-14 max-w-[1000px] rounded-full px-3 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.45)] sm:px-4"
              : "mt-0 h-[68px] max-w-[100%] rounded-none border-x-0 border-t-0 px-5 shadow-none sm:px-10 lg:px-16"
          }`}
        >
          {/* top glow line */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />

          {/* LOGO */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="relative z-10 flex items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-18" : "h-22"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            onMouseLeave={() => setHovered(null)}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHovered(link.path)}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    active || hovered === link.path
                      ? "text-white"
                      : "text-white/55"
                  }`}
                >
                  {hovered === link.path && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>

                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.9)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="relative z-10 flex items-center gap-3">
            {/* CTA */}
            <a
              href={`https://wa.me/919253174295?text=${encodeURIComponent(
                "Hello, I want to discuss a project.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-blue-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-500 lg:inline-flex"
            >
              {/* shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">Let's Talk</span>

              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </a>

            {/* MOBILE BURGER */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 bg-white/5 transition-colors hover:border-blue-500 lg:hidden"
            >
              <span
                className={`h-[2px] w-4 rounded bg-white transition-all duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-4 rounded bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-4 rounded bg-white transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-black/95 px-8 backdrop-blur-xl sm:px-12 lg:hidden"
          >
            {/* glow blobs */}
            <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-blue-800/30 blur-3xl" />

            <nav className="relative flex flex-col">
              {navLinks.map((link, index) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.08 + index * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                    >
                      <span
                        className={`sm:font-['Outfit'] text-xl font-medium sm:font-semibold transition-colors sm:text-5xl ${
                          active
                            ? "text-blue-500"
                            : "text-white group-hover:text-blue-400"
                        }`}
                      >
                        {link.name}
                      </span>
                      <ArrowUpRight
                        size={22}
                        className="ml-auto self-center text-white/30 transition group-hover:text-blue-400"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-10"
            >
              <a
                href="https://wa.me/919253174295?text=Hello%2C%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex items-center gap-3 max-sm:w-full max-sm:justify-center rounded-full bg-blue-600 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
              >
                Let's Talk
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600">
                  <ArrowUpRight size={17} />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
