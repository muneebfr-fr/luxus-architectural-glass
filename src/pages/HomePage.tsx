import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Grid3X3, Building2, Users, Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AnimatedStat from "@/components/AnimatedStat";
import { LampContainer } from "@/components/ui/lamp";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { OrbitalItem } from "@/components/ui/radial-orbital-timeline";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import logo from "@/assets/logo.png";

/* ── Orbital navigation data ─────────────────────────────────────── */
const navData: OrbitalItem[] = [
  {
    id: 1, title: "Services", category: "Products", date: "5 product lines",
    content: "Laminated, Smart, Mesh, UV & Custom glass. All precision-engineered to your exact specifications.",
    icon: Layers, relatedIds: [2, 3], energy: 90, href: "/services",
  },
  {
    id: 2, title: "Mesh Glass", category: "Signature", date: "Our flagship product",
    content: "Fabric mesh permanently laminated between glass layers. Hundreds of weave patterns and finishes available.",
    icon: Grid3X3, relatedIds: [1, 5], energy: 100, href: "/mesh-glass",
  },
  {
    id: 3, title: "Applications", category: "Markets", date: "4 sectors",
    content: "Residential, commercial, retail & institutional. Glass specified for every sector of the built environment.",
    icon: Building2, relatedIds: [1, 4], energy: 80, href: "/applications",
  },
  {
    id: 4, title: "About", category: "Company", date: "Est. 2004 · Cypress, TX",
    content: "Two decades of precision craft. We work directly with architects, contractors, and property owners.",
    icon: Users, relatedIds: [3, 5], energy: 75, href: "/about",
  },
  {
    id: 5, title: "Contact", category: "Get a Quote", date: "(346) 545 9613",
    content: "Free consultations. Quote within one business day. Call or email us at info@luxusglassusa.com.",
    icon: Mail, relatedIds: [1, 2], energy: 85, href: "/contact",
  },
];

const stats = [
  { value: "20+",  label: "Years of Precision" },
  { value: "500+", label: "Projects Delivered"  },
  { value: "100%", label: "Custom Engineered"   },
];

/* ── Noise texture overlay ───────────────────────────────────────── */
const NoiseOverlay = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-10 opacity-[0.022] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px 256px",
    }}
  />
);

/* ── Scroll cue ──────────────────────────────────────────────────── */
const ScrollCue = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.4, duration: 1 }}
    className="flex flex-col items-center gap-2"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="w-px h-10 bg-gradient-to-b from-gold/0 via-gold/45 to-gold/0"
    />
    <p className="font-body text-[9px] tracking-[0.38em] uppercase text-primary-foreground/25">
      Scroll
    </p>
  </motion.div>
);

/* ── Page ────────────────────────────────────────────────────────── */
const HomePage = () => {
  /* Parallax refs */
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutBgY = useSpring(useTransform(aboutScroll, [0, 1], ["-5%", "5%"]), { stiffness: 60, damping: 20 });

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScroll } = useScroll({ target: ctaRef, offset: ["start end", "end start"] });
  const ctaBgY = useSpring(useTransform(ctaScroll, [0, 1], ["-6%", "6%"]), { stiffness: 60, damping: 20 });

  return (
    <PageTransition>
      <GlassFilter id="glass-filter" />

      <div className="bg-background">
        <Navbar />

        {/* ════════════════════════════════════════════════════════
            HERO — Lamp + content
        ════════════════════════════════════════════════════════ */}
        <LampContainer footerElement={<ScrollCue />}>
          <NoiseOverlay />

          {/* Logo */}
          <motion.img
            src={logo}
            alt="Luxus Architectural Glass"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-20 md:h-24 w-auto mx-auto object-contain mb-6"
            style={{ filter: "drop-shadow(0 0 40px hsl(38 72% 44% / 0.65))" }}
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-5"
          >
            <span className="eyebrow-label text-gold/80">Architectural Glass Solutions</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light text-primary-foreground text-center leading-[0.92] mb-5"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", letterSpacing: "-0.025em" }}
          >
            Luxury in Every
            <br />
            <span className="gradient-gold-shimmer font-medium italic">Layer</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="font-body text-primary-foreground/45 text-center max-w-[380px] mx-auto mb-9 font-light leading-[1.8] text-[0.9rem]"
          >
            Precision-engineered laminated glass for architects,
            designers, and builders who demand uncompromising quality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <MetalButton as="a" href="/contact" className="px-10 py-3.5">
              Request a Consultation
            </MetalButton>

            {/* Ghost glass button — uses Link for SPA nav */}
            <Link
              to="/services"
              className="relative inline-flex items-center justify-center gap-2 overflow-hidden font-body text-[11px] tracking-[0.22em] uppercase font-medium px-10 py-3.5 text-gold transition-all duration-300 hover:bg-gold/10 focus:outline-none"
              style={{
                border: "1px solid hsl(38 72% 44% / 0.40)",
                boxShadow: "inset 0 1px 0 hsl(38 72% 80% / 0.12)",
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg,transparent,hsl(38 72% 80%/0.28),transparent)" }}
              />
              Explore Solutions <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row justify-center"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center px-8 py-3 ${
                  i < stats.length - 1 ? "sm:border-r sm:border-primary-foreground/10" : ""
                }`}
              >
                <AnimatedStat
                  value={stat.value}
                  label={stat.label}
                  delay={i * 200}
                  className="flex flex-col items-center"
                  valueClassName="text-2xl md:text-3xl mb-1"
                  labelClassName="text-[9px] tracking-[0.28em] text-primary-foreground/38"
                />
              </div>
            ))}
          </motion.div>
        </LampContainer>

        {/* ════════════════════════════════════════════════════════
            ABOUT STRIP
        ════════════════════════════════════════════════════════ */}
        <section
          ref={aboutRef}
          className="py-24 bg-background border-t border-border/50 relative overflow-hidden"
        >
          {/* Parallax grid texture */}
          <motion.div
            style={{ y: aboutBgY }}
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.028]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(38 72% 44%) 1px,transparent 1px),linear-gradient(90deg,hsl(38 72% 44%) 1px,transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="eyebrow-label text-gold mb-5 inline-flex">What We Do</span>
                <h2
                  className="font-display font-light text-foreground leading-[1.04] mt-5"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
                >
                  Glass elevated to an{" "}
                  <span className="italic font-medium gradient-gold-text">art form</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.12 }}
              >
                <p className="font-body text-muted-foreground font-light leading-[1.88] text-[0.9375rem] mb-7">
                  Founded on the conviction that every building deserves glass engineered
                  with the same precision as the architecture it completes. Specialising
                  exclusively in laminated glass — the safest, most versatile category of
                  architectural glazing.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all duration-300"
                >
                  Our Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            THREE PILLARS
        ════════════════════════════════════════════════════════ */}
        <section className="bg-primary border-t border-gold/12 py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { num: "01", label: "Safety Rated",        desc: "International glazing standards on every panel — not optional, expected." },
                { num: "02", label: "Zero Off-the-Shelf",  desc: "Every order engineered from your exact dimensions and finish." },
                { num: "03", label: "Full Documentation",  desc: "Technical specs, certifications, and test reports on delivery." },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <GlassEffect border="medium" className="p-7 h-full">
                    <p
                      className="font-display text-3xl font-light mb-4"
                      style={{ color: "hsl(38 72% 44% / 0.35)" }}
                    >
                      {item.num}
                    </p>
                    <div className="w-6 h-px bg-gold/50 mb-4" />
                    <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold font-medium mb-2">
                      {item.label}
                    </p>
                    <p className="font-body text-[0.8125rem] text-primary-foreground/45 font-light leading-[1.72]">
                      {item.desc}
                    </p>
                  </GlassEffect>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            ORBITAL NAVIGATION
        ════════════════════════════════════════════════════════ */}
        <section className="bg-primary border-t border-gold/10">
          <div className="container mx-auto px-6 pt-16 pb-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow-label text-gold/70 mb-4 inline-flex">Explore</span>
              <h2
                className="font-display font-light text-primary-foreground mt-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Navigate the{" "}
                <span className="italic font-medium gradient-gold-text">universe</span>
              </h2>
              <p className="font-body text-primary-foreground/30 text-[0.78rem] mt-2 tracking-[0.06em]">
                Click any node to preview · Click canvas to resume rotation
              </p>
            </motion.div>
          </div>

          <RadialOrbitalTimeline timelineData={navData} />
        </section>

        {/* ════════════════════════════════════════════════════════
            CONTACT CTA
        ════════════════════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          className="py-24 bg-background border-t border-border/50 relative overflow-hidden"
        >
          {/* Parallax dot grid */}
          <motion.div
            style={{ y: ctaBgY }}
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.032]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(38 72% 44%) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />
          </motion.div>

          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="eyebrow-label text-gold mb-5 inline-flex">Ready to build?</span>
              <h2
                className="font-display font-light text-foreground mt-5 mb-4"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                Let's engineer something{" "}
                <span className="italic font-medium gradient-gold-text">extraordinary</span>
              </h2>
              <p className="font-body text-muted-foreground font-light max-w-sm mx-auto mb-10 text-[0.9rem] leading-relaxed">
                Free consultations · Full technical documentation · Delivered on spec
              </p>
              <MetalButton as="a" href="/contact" className="px-14 py-4">
                Start Your Project
              </MetalButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default HomePage;
