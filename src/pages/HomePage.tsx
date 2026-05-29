import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Grid3X3, Building2, Users, Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AnimatedStat from "@/components/AnimatedStat";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { OrbitalItem } from "@/components/ui/radial-orbital-timeline";
import { GoldGlassButton, ClearGlassButton } from "@/components/ui/liquid-glass-button";
import { GlassEffect, GlassFilter } from "@/components/ui/liquid-glass";
import { ShaderAnimation } from "@/components/ui/shader-lines";
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
    className="pointer-events-none absolute inset-0 z-[5] opacity-[0.028] mix-blend-overlay"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: "256px 256px",
    }}
  />
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
            HERO — Shader animation background
        ════════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-primary">

          {/* Shader — absolute background layer */}
          <ShaderAnimation />

          {/* Overlay 1: overall darkness so text reads cleanly */}
          <div className="absolute inset-0 z-[2] bg-primary/68" />

          {/* Overlay 2: radial — darken edges, keep central glow alive */}
          <div
            className="absolute inset-0 z-[3]"
            style={{
              background:
                "radial-gradient(ellipse 70% 65% at 50% 45%, transparent 0%, rgba(6,4,14,0.78) 100%)",
            }}
          />

          {/* Overlay 3: bottom fade into the next section */}
          <div className="absolute bottom-0 left-0 right-0 z-[4] h-16 bg-gradient-to-t from-primary to-transparent" />

          {/* Film grain */}
          <NoiseOverlay />

          {/* ── Hero content ──────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center text-center px-5 pt-24 pb-20 w-full max-w-3xl mx-auto">

            {/* Logo */}
            <motion.img
              src={logo}
              alt="Luxus Architectural Glass"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-16 sm:h-20 w-auto mx-auto object-contain mb-7"
              style={{ filter: "drop-shadow(0 0 36px hsl(38 72% 44% / 0.72))" }}
            />

            {/* Thin gold rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="w-14 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-6"
            />

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mb-6"
            >
              <span className="eyebrow-label text-gold/75">
                Architectural Glass Solutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.58, ease: [0.22, 0.61, 0.36, 1] }}
              className="font-display font-light text-primary-foreground text-center leading-[0.9] mb-6 tracking-tight"
              style={{ fontSize: "clamp(3rem, 9.5vw, 7.5rem)", letterSpacing: "-0.02em", textShadow: "0 2px 32px rgba(0,0,0,0.85)" }}
            >
              Luxury in Every
              <br />
              <em className="gradient-gold-shimmer not-italic font-semibold">
                Layer
              </em>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.78 }}
              className="font-body text-primary-foreground/55 text-center max-w-[360px] mx-auto mb-10 font-light leading-[1.82] text-[0.88rem] sm:text-[0.92rem]"
              style={{ textShadow: "0 1px 18px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)" }}
            >
              Precision-engineered laminated glass for architects,
              designers, and builders who demand uncompromising quality.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto mb-12"
            >
              <GoldGlassButton as="a" href="/contact" className="px-9 py-3.5 w-full sm:w-auto justify-center">
                Request a Consultation
              </GoldGlassButton>
              <ClearGlassButton as="a" href="/services" className="px-9 py-3.5 w-full sm:w-auto justify-center">
                Explore Solutions <ArrowRight className="w-3 h-3" />
              </ClearGlassButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.15 }}
              className="flex flex-row justify-center divide-x divide-primary-foreground/10"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center px-6 sm:px-9 py-1">
                  <AnimatedStat
                    value={stat.value}
                    label={stat.label}
                    delay={i * 200}
                    className="flex flex-col items-center"
                    valueClassName="text-xl sm:text-2xl md:text-3xl mb-0.5"
                    labelClassName="text-[8px] sm:text-[9px] tracking-[0.26em] text-primary-foreground/36"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0"
            />
            <p className="font-body text-[9px] tracking-[0.38em] uppercase text-primary-foreground/22">
              Scroll
            </p>
          </motion.div>
        </section>

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
              <GoldGlassButton as="a" href="/contact" className="px-14 py-4">
                Start Your Project
              </GoldGlassButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default HomePage;
