import { Link } from "react-router-dom";
import {
  FaInstagram,  
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";
import { ArrowUp } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Model", path: "/#model" },
  { name: "Videos", path: "/#videos" },  
];

const socialLinks = [
  { name: "Instagram", icon: FaInstagram, url: "https://www.instagram.com/nosh_infotech/" },  
  { name: "LinkedIn", icon: FaLinkedinIn, url: "https://www.linkedin.com/company/nosh-infotech/home/" },
  { name: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61583257367995" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-white px-3 pb-3 pt-6 sm:px-6 sm:pb-6">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-black text-white">
        {/* Background glow + dotted grid */}
        <div className="absolute -left-32 -top-32 -z-10 h-[360px] w-[360px] rounded-full bg-blue-600/30 blur-[110px]" />
        <div className="absolute -right-24 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/15 blur-[110px]" />

        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 pt-14 text-center sm:px-10 lg:px-16 lg:pt-16">
          {/* Back to top (extra) */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-blue-600 hover:bg-blue-600 sm:right-8 sm:top-8"
          >
            <ArrowUp
              size={18}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-blue-600 hover:bg-blue-600"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative text-sm font-medium text-white/65 transition-colors hover:text-white"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="mt-9 w-full border-t border-white/10 pt-6 text-xs text-white">
            © {new Date().getFullYear()} NOSH INFOTECH. All rights reserved.
          </p>
        </div>

        {/* Giant brand name */}
        <Link
          to="/"
          aria-label="Nosh Infotech home"
          className="mt-8 block w-full select-none overflow-hidden px-3 sm:px-6"
        >
          <h2 className=" whitespace-nowrap text-center font-['Outfit'] text-[13vw] font-black leading-[0.9] tracking-[-0.06em] sm:text-[12vw] lg:text-[11vw]">
            <span className="bg-gradient-to-b from-white/60 via-white/20 to-transparent bg-clip-text text-transparent">
              NOSH{" "}
            </span>
            <span className="bg-gradient-to-b from-blue-500 via-blue-600/60 to-transparent bg-clip-text text-transparent">
              INFOTECH
            </span>
          </h2>
        </Link>
      </div>
    </footer>
  );
};
export default Footer;