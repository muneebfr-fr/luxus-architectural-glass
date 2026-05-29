import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layers, Zap, Grid3X3, Sun, Wrench, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { GoldGlassButton } from "@/components/ui/liquid-glass-button";
import laminatedImg from "@/assets/laminated-glass.jpg";
import smartImg     from "@/assets/smart-glass.jpg";
import fabricImg    from "@/assets/fabric-mesh-glass.jpg";
import uvImg        from "@/assets/uv-glass.jpg";
import customImg    from "@/assets/custom-glass.jpg";

const services = [
  {
    icon: Layers,
    title: "Laminated Glass",
    tag: "Core Product",
    description:
      "Multi-layer safety glass engineered for structural integrity and acoustic insulation. Every panel is built to spec and tested to exceed international standards. The interlayer holds glass in place upon impact, eliminating the risk of shattering.",
    specs: ["PVB & SGP interlayers", "Acoustic grades", "Safety certified", "Custom dimensions"],
    image: laminatedImg,
    imageAlt: "Laminated glass detail",
  },
  {
    icon: Zap,
    title: "Smart Glass",
    tag: "Innovation",
    description:
      "Electronically switchable glass transitions from fully transparent to opaque on demand. Ideal for privacy partitions, energy management, and contemporary design. PDLC and electrochromic technologies available.",
    specs: ["PDLC & electrochromic", "Instant privacy", "Energy efficient", "Low-voltage control"],
    image: smartImg,
    imageAlt: "Smart switchable glass",
  },
  {
    icon: Grid3X3,
    title: "Mesh Glass",
    tag: "Signature",
    description:
      "Woven fabric mesh laminated permanently between glass layers — our signature product. Creates extraordinary texture, privacy, and depth. Available in hundreds of patterns, colours, and densities.",
    specs: ["100+ weave patterns", "Custom colours", "Privacy + light", "Permanent bond"],
    image: fabricImg,
    imageAlt: "Fabric mesh laminated glass",
    cta: { label: "See Mesh Glass →", href: "/mesh-glass" },
  },
  {
    icon: Sun,
    title: "UV Protective Glass",
    tag: "Protection",
    description:
      "Advanced interlayer technology blocks up to 99% of harmful UV radiation while maintaining full optical clarity. Protects artwork, furnishings, and occupants without changing the visual character of the glass.",
    specs: ["99% UV rejection", "Optical clarity", "Interior protection", "Solar control options"],
    image: uvImg,
    imageAlt: "UV protective architectural glass",
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    tag: "Bespoke",
    description:
      "Every project that doesn't fit a standard category. Curved panels, oversized formats, decorative interlayers, specialty coatings, and unique architectural applications. If you can design it, we can engineer it.",
    specs: ["Curved & shaped", "Oversized panels", "Decorative interlayers", "Full documentation"],
    image: customImg,
    imageAlt: "Custom architectural glass solution",
  },
];

const ServicesPage = () => {
  return (
    <PageTransition>
      <div className="bg-background">
        <Navbar />

        {/* ── Page header ───────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
          {/* Subtle decorative grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(hsl(38 72% 44%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 72% 44%) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex mb-6">
                <span className="eyebrow-label text-gold/75">What We Build</span>
              </div>

              {/* Static first line */}
              <p
                className="font-display font-light text-primary-foreground leading-none mb-1"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                Precision engineered
              </p>

              {/* Morphing second line */}
              <GooeyText
                texts={["glass solutions", "expert craft", "built to spec", "your vision"]}
                morphTime={1.5}
                cooldownTime={0.6}
                className="h-[3rem] md:h-[4.5rem] lg:h-[6rem] mb-7"
                textClassName="font-display italic font-medium text-gold"
                textStyle={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              />

              <p className="font-body text-primary-foreground/50 font-light max-w-lg leading-[1.8] text-[0.9375rem]">
                Five core product lines — each manufactured to exacting specifications
                and delivered with full technical documentation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Services list ─────────────────────────────────────── */}
        <section className="bg-background">
          {services.map((service, index) => {
            const imageRight = index % 2 === 0;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75 }}
                className={`border-b border-border/50 ${index === 0 ? "" : ""}`}
              >
                <div className="container mx-auto px-6 py-20">
                  <div className={`grid lg:grid-cols-2 gap-16 items-center ${imageRight ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"}`}>

                    {/* Text block */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-5 h-5 text-gold stroke-[1.5]" />
                        <span className="font-body text-[10px] tracking-[0.28em] uppercase text-gold font-medium">
                          {service.tag}
                        </span>
                      </div>
                      <h2
                        className="font-display font-light text-foreground mb-5 leading-[1.02]"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                      >
                        {service.title}
                      </h2>
                      <div className="w-12 h-px bg-gradient-to-r from-gold to-gold-light/50 mb-7" />
                      <p className="font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem] mb-8">
                        {service.description}
                      </p>

                      {/* Spec chips */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.specs.map((spec) => (
                          <span
                            key={spec}
                            className="font-body text-[10px] tracking-[0.16em] uppercase px-4 py-2 border border-border/80 text-muted-foreground"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {service.cta ? (
                        <Link
                          to={service.cta.href}
                          className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all duration-300"
                        >
                          {service.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all duration-300"
                        >
                          Request a Quote <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>

                    {/* Image block */}
                    <div className="relative">
                      <div
                        className="absolute -inset-3 pointer-events-none"
                        style={{ border: "1px solid hsl(38 72% 44% / 0.12)" }}
                      />
                      <div className="overflow-hidden aspect-[4/3] group">
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                          loading="lazy"
                          width={800}
                          height={600}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-24 bg-primary text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6"
          >
            <span className="eyebrow-label text-gold/75 mb-6 inline-flex">Start Here</span>
            <h2
              className="font-display font-light text-primary-foreground mt-6 mb-4 leading-[1.04]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Ready to specify your{" "}
              <span className="italic font-medium gradient-gold-shimmer">project?</span>
            </h2>
            <p className="font-body text-primary-foreground/45 font-light max-w-sm mx-auto mb-10 text-[0.9rem]">
              Tell us your requirements and we'll engineer the perfect solution.
            </p>
            <GoldGlassButton as="a" href="/contact" className="px-12 py-4">
              Request a Quote
            </GoldGlassButton>
          </motion.div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ServicesPage;
