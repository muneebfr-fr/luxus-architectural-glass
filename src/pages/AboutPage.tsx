import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Users, Award } from "lucide-react";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import AnimatedStat from "@/components/AnimatedStat";
import officeImg from "@/assets/office-pictures.jpeg";

const stats = [
  { value: "20+",  label: "Years in Business",   sub: "Founded in Houston, TX" },
  { value: "500+", label: "Projects Delivered",   sub: "Across Texas and beyond" },
  { value: "100%", label: "Custom Engineered",    sub: "No off-the-shelf panels" },
  { value: "5",    label: "Product Specialities", sub: "Laminated, smart, mesh & more" },
];

const values = [
  {
    Icon: Shield,
    title: "Precision over shortcuts",
    body: "Every panel leaves our facility with full technical documentation. We hold ourselves to international safety standards — not because we have to, but because our clients deserve nothing less.",
  },
  {
    Icon: Zap,
    title: "Custom as standard",
    body: "We don't stock panels and ship from a catalogue. Every order is engineered from scratch to the exact dimensions, finish, and performance specification your project demands.",
  },
  {
    Icon: Users,
    title: "Direct collaboration",
    body: "Our team works alongside architects, contractors, and property owners — not through layers of sales intermediaries. You speak directly with the people who build your glass.",
  },
  {
    Icon: Award,
    title: "Results that endure",
    body: "Architectural glass must perform beautifully for decades. We select materials, interlayers, and manufacturing processes that ensure long-term clarity, safety, and structural integrity.",
  },
];

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="bg-background">
        <Navbar />

        {/* ── Page header ───────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
          {/* Diagonal gold line decor */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "left" }}
            className="absolute top-[35%] -left-16 w-[420px] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -rotate-12 pointer-events-none"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: "right" }}
            className="absolute bottom-[30%] -right-16 w-[360px] h-px bg-gradient-to-l from-transparent via-gold/15 to-transparent -rotate-12 pointer-events-none"
          />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex mb-6">
                <span className="eyebrow-label text-gold/75">Our Story</span>
              </div>

              <p
                className="font-display font-light text-primary-foreground leading-none mb-1"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                Glass elevated
              </p>

              <GooeyText
                texts={["to an art form", "to pure craft", "to zero shortcuts", "to your spec"]}
                morphTime={1.5}
                cooldownTime={0.6}
                className="h-[3rem] md:h-[4.5rem] lg:h-[6rem] mb-7"
                textClassName="font-display italic font-medium text-gold"
                textStyle={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              />

              <p className="font-body text-primary-foreground/50 font-light max-w-lg leading-[1.8] text-[0.9375rem]">
                Based in Cypress, Texas. Serving architects, contractors, and property owners
                across the region for over two decades.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Story section ─────────────────────────────────────── */}
        <section className="py-24 bg-background border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div
                  className="absolute -inset-3 pointer-events-none"
                  style={{ border: "1px solid hsl(38 72% 44% / 0.12)" }}
                />
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.1, ease: [0.77, 0, 0.175, 1] }}
                >
                  <img
                    src={officeImg}
                    alt="Luxus Architectural Glass team and facility"
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </motion.div>

                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  className="absolute -bottom-8 -right-8 bg-card p-7 shadow-gold-sm"
                  style={{ border: "1px solid hsl(38 72% 44% / 0.20)" }}
                >
                  <p
                    className="font-display text-4xl gradient-gold-text font-semibold mb-1"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    2004
                  </p>
                  <p className="font-body text-[10px] tracking-[0.30em] uppercase text-muted-foreground">
                    Year Founded
                  </p>
                </motion.div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <span className="eyebrow-label text-gold mb-5 inline-flex">Why Luxus</span>
                <h2
                  className="font-display font-light text-foreground mt-5 mb-8 leading-[1.04]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  A single conviction
                </h2>
                <div className="space-y-5 font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem]">
                  <p>
                    Luxus Architectural Glass was founded on a single conviction: that every
                    building deserves glass engineered with the same precision as the
                    architecture it completes.
                  </p>
                  <p>
                    We specialise exclusively in laminated glass — the safest, most versatile
                    category of architectural glazing. Every panel we produce is built to spec,
                    tested to standard, and delivered with full technical documentation.
                  </p>
                  <p>
                    From initial consultation to final installation, our team works directly
                    with architects, contractors, and property owners to ensure every detail
                    is accounted for. No middlemen. No standard catalogue. Just precision
                    glass, built for your project.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-8 font-body text-[11px] tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all duration-300"
                >
                  Work With Us <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────── */}
        <section className="bg-primary py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="eyebrow-label text-gold/75 mb-5 inline-flex">By the Numbers</span>
              <h2
                className="font-display font-light text-primary-foreground mt-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Two decades of{" "}
                <span className="italic font-medium gradient-gold-text">measurable craft</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-primary px-10 py-12 text-center"
                >
                  <AnimatedStat
                    value={stat.value}
                    label={stat.label}
                    delay={i * 150}
                    className="flex flex-col items-center"
                    valueClassName="text-5xl mb-2"
                    labelClassName="text-[10px] tracking-[0.26em] text-primary-foreground/50"
                  />
                  <p className="font-body text-[0.72rem] text-primary-foreground/30 mt-2 tracking-[0.06em]">
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ────────────────────────────────────────────── */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <span className="eyebrow-label text-gold mb-5 inline-flex">How We Work</span>
              <h2
                className="font-display font-light text-foreground mt-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Four principles that{" "}
                <span className="italic font-medium gradient-gold-text">guide every project</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09 }}
                  className="p-8 bg-card card-top-reveal hover-lift"
                  style={{ border: "1px solid hsl(36 16% 86%)" }}
                >
                  <v.Icon className="w-5 h-5 text-gold mb-4 stroke-[1.5]" />
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-gold-light/50 mb-5" />
                  <h3 className="font-body text-[0.875rem] font-semibold text-foreground mb-3 tracking-[0.01em]">
                    {v.title}
                  </h3>
                  <p className="font-body text-[0.8125rem] text-muted-foreground font-light leading-[1.82]">
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location strip ────────────────────────────────────── */}
        <section className="py-16 bg-background border-t border-border/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="eyebrow-label text-gold mb-5 inline-flex">Find Us</span>
                <h2
                  className="font-display font-light text-foreground mt-5 mb-5"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
                >
                  Cypress, Texas
                </h2>
                <div className="space-y-2 font-body text-[0.85rem] text-muted-foreground mb-6">
                  <p>13626 Kluge Rd Ste C</p>
                  <p>Cypress, TX 77429</p>
                  <a href="tel:3465459613" className="block hover:text-gold transition-colors duration-300 mt-3">
                    (346) 545 9613
                  </a>
                  <a href="mailto:info@luxusglassusa.com" className="block hover:text-gold transition-colors duration-300">
                    info@luxusglassusa.com
                  </a>
                </div>
                <MetalButton as="a" href="/contact" className="px-8 py-3.5">
                  Get in Touch <ArrowRight className="w-3.5 h-3.5" />
                </MetalButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="overflow-hidden shadow-gold-sm"
                style={{ border: "1px solid hsl(38 72% 44% / 0.22)", aspectRatio: "4/3" }}
              >
                <iframe
                  title="Luxus Architectural Glass Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.5!2d-95.69!3d29.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU4JzEyLjAiTiA5NcKwNDEnMjQuMCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&q=13626+Kluge+Rd+Ste+C,+Cypress,+TX+77429"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
