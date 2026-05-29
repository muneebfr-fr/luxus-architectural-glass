import { Link } from "react-router-dom";
import { LiquidLogo } from "@/components/ui/liquid-logo";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-white/8">
      <div className="container mx-auto px-6">

        {/* Main grid */}
        <div className="grid md:grid-cols-4 gap-12 py-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <LiquidLogo size={72} />
              <span className="flex flex-col leading-none gap-0.5">
                <span className="font-display gradient-gold-text font-semibold text-lg tracking-[0.22em] uppercase">Luxus</span>
                <span className="font-body text-[8px] tracking-[0.38em] uppercase font-light text-gold-light/50">Architectural Glass</span>
              </span>
            </Link>
            <p className="font-body text-[0.76rem] text-primary-foreground/40 leading-[1.85] mb-6">
              Luxury in every layer. Precision-engineered laminated glass for architects, designers, and builders.
            </p>
            <div className="flex items-center gap-4">
              {[
                { href: "https://www.instagram.com/luxusglassusa", Icon: InstagramIcon, label: "Instagram" },
                { href: "https://www.facebook.com/luxusglassusa",  Icon: FacebookIcon,  label: "Facebook"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gold/40 hover:text-gold transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="font-body text-[9px] tracking-[0.32em] uppercase text-gold mb-5 font-medium">Pages</p>
            <div className="space-y-3">
              {[
                { label: "Home",         href: "/"             },
                { label: "Services",     href: "/services"     },
                { label: "Mesh Glass",   href: "/mesh-glass"   },
                { label: "Applications", href: "/applications" },
                { label: "About",        href: "/about"        },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block font-body text-[0.78rem] text-primary-foreground/45 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services quick links */}
          <div>
            <p className="font-body text-[9px] tracking-[0.32em] uppercase text-gold mb-5 font-medium">Solutions</p>
            <div className="space-y-3">
              {["Laminated Glass", "Smart Glass", "Mesh Glass", "UV Protective Glass", "Custom Solutions"].map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="block font-body text-[0.78rem] text-primary-foreground/45 hover:text-gold transition-colors duration-300"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[9px] tracking-[0.32em] uppercase text-gold mb-5 font-medium">Contact</p>
            <div className="space-y-2.5 font-body text-[0.78rem] text-primary-foreground/45">
              <p>13626 Kluge Rd Ste C</p>
              <p>Cypress, TX 77429</p>
              <a href="tel:3465459613" className="block hover:text-gold transition-colors duration-300 mt-3">(346) 545 9613</a>
              <a href="mailto:info@luxusglassusa.com" className="block hover:text-gold transition-colors duration-300">info@luxusglassusa.com</a>
              <Link
                to="/contact"
                className="inline-block mt-4 gradient-gold font-body text-[10px] tracking-[0.20em] uppercase px-6 py-2.5 text-primary-foreground font-medium hover:opacity-88 transition-opacity duration-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/6">
          <p className="font-body text-[10px] text-primary-foreground/25 tracking-[0.08em]">
            © {new Date().getFullYear()} Luxus Architectural Glass. All rights reserved.
          </p>
          <p className="font-body text-[10px] text-primary-foreground/20 tracking-[0.06em]">
            Cypress, Texas · USA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
