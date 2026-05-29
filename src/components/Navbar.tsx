import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { GoldGlassButton } from "@/components/ui/liquid-glass-button";

const navLinks = [
  { label: "Services",      href: "/services"     },
  { label: "Mesh Glass",    href: "/mesh-glass"   },
  { label: "Applications",  href: "/applications" },
  { label: "About",         href: "/about"        },
];

const Navbar = () => {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location                = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "left",
          background: "linear-gradient(to right, hsl(38 82% 30%), hsl(38 72% 44%), hsl(38 58% 60%))",
          zIndex: 100,
          height: "2px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md border-b border-white/8 shadow-[0_1px_0_0_hsl(38_72%_44%_/_0.10)]"
            : "bg-primary/80 backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logo}
              alt="Luxus Architectural Glass"
              className="h-10 w-auto object-contain"
            />
            <span className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="font-display gradient-gold-text font-semibold text-xl tracking-[0.22em] uppercase">
                Luxus
              </span>
              <span className="font-body text-[9px] tracking-[0.38em] uppercase font-light text-gold-light/60">
                Architectural Glass
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-body text-[10px] tracking-[0.24em] uppercase transition-colors duration-300 group ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-primary-foreground/60 hover:text-primary-foreground"
                }`}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <GoldGlassButton as="a" href="/contact" className="px-6 py-2.5 text-[10px]">
                Contact
              </GoldGlassButton>
            </div>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden text-primary-foreground/70 hover:text-gold transition-colors duration-300"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-primary border-t border-white/8 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center justify-between py-3 font-body text-[11px] tracking-[0.26em] uppercase transition-colors duration-300 border-b border-white/5 ${
                      isActive(link.href)
                        ? "text-gold"
                        : "text-primary-foreground/60 hover:text-gold"
                    }`}
                  >
                    {link.label}
                    <span className="text-gold/40">→</span>
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block text-center gradient-gold font-body text-[11px] tracking-[0.22em] uppercase px-6 py-3.5 text-primary-foreground font-medium mt-5 hover:opacity-90 transition-opacity duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
