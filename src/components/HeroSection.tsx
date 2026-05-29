import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-glass.jpg";
import AnimatedStat from "@/components/AnimatedStat";
import { LampContainer } from "@/components/ui/lamp";

const stats = [
  { value: "20+",  label: "Years of Precision" },
  { value: "500+", label: "Projects Delivered" },
  { value: "100%", label: "Custom Engineered"  },
];

/* ─── Scroll indicator ───────────────────────────────────────────────── */
const ScrollCue = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.6, duration: 1 }}
    className="flex flex-col items-center gap-2"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="w-px h-14 bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0"
    />
    <p className="font-body text-[9px] tracking-[0.38em] uppercase text-primary-foreground/40">
      Scroll
    </p>
  </motion.div>
);

/* ─── Hero ───────────────────────────────────────────────────────────── */
const HeroSection = () => {
  return (
    <LampContainer
      /* Nudge content upward a bit less than the default −320 px so the full
         tall content block (eyebrow → stats) sits nicely in the glow zone. */
      contentClassName="-translate-y-52 w-full max-w-5xl"
      footerElement={<ScrollCue />}
      className="overflow-hidden"
    >
      {/* ── Background: hero photo at very low opacity for texture ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden>
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover opacity-[0.12]"
          style={{ mixBlendMode: "overlay" }}
          width={1920}
          height={1080}
          loading="eager"
        />
        {/* Extra vignette so edges don't distract */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/80" />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-7"
        >
          <span className="eyebrow-label text-gold/90">
            Architectural Glass Solutions
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-light text-primary-foreground leading-[0.92] mb-5"
          style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)", letterSpacing: "-0.01em" }}
        >
          Luxury in Every
          <br />
          <span className="gradient-gold-shimmer font-medium italic">Layer</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-body text-base md:text-lg text-primary-foreground/60 max-w-xl mx-auto mb-12 font-light leading-[1.75]"
          style={{ letterSpacing: "0.01em" }}
        >
          Laminated glass crafted for architects, designers, and builders who
          demand uncompromising quality. From smart glass to custom fabric mesh
          interlayers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            to="/quote"
            className="gradient-gold font-body text-[11px] tracking-[0.22em] uppercase px-11 py-4 text-primary-foreground font-medium hover:opacity-88 hover:shadow-gold-md transition-all duration-300"
          >
            Request a Consultation
          </Link>
          <a
            href="#services"
            className="border border-gold/60 text-gold font-body text-[11px] tracking-[0.22em] uppercase px-11 py-4 hover:bg-gold hover:text-primary-foreground hover:border-gold transition-all duration-300"
          >
            Explore Solutions
          </a>
        </motion.div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-col sm:flex-row justify-center gap-px"
        >
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              delay={i * 180}
              className={`flex flex-col items-center px-10 py-4 ${
                i < stats.length - 1
                  ? "sm:border-r sm:border-primary-foreground/15"
                  : ""
              }`}
              valueClassName="text-3xl mb-1"
              labelClassName="text-[10px] tracking-[0.28em] text-primary-foreground/50"
            />
          ))}
        </motion.div>
      </div>
    </LampContainer>
  );
};

export default HeroSection;
