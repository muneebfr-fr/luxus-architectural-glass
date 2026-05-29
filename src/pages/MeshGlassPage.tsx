import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { MetalButton } from "@/components/ui/liquid-glass-button";
import overviewImg from "@/assets/overview-image.jpg";
import mesh1 from "@/assets/mesh-glass-1.png";
import mesh2 from "@/assets/mesh-glass-2.png";
import mesh3 from "@/assets/mesh-glass-3.png";
import mesh4 from "@/assets/mesh-glass-4.png";
import mesh5 from "@/assets/mesh-glass-5.png";
import mesh6 from "@/assets/mesh-glass-6.png";

const gallery = [
  { src: mesh1, label: "Bronze Weave",  desc: "Fine bronze wires in a classic orthogonal weave" },
  { src: mesh2, label: "Copper Drift",  desc: "Loose copper-toned mesh with organic movement" },
  { src: mesh3, label: "Arctic Mesh",   desc: "High-density white mesh for near-frosted privacy" },
  { src: mesh4, label: "Luxe Mesh",     desc: "Ultra-fine stainless weave with warm gold finish" },
  { src: mesh5, label: "Strata Gold",   desc: "Layered strata pattern in antique gold tones" },
  { src: mesh6, label: "Linea Gold",    desc: "Linear single-direction yarns — bold and modern" },
];

const benefits = [
  {
    title: "Privacy Without Sacrificing Light",
    body: "Mesh glass lets natural light flow freely while blocking direct lines of sight. Openness of glass with the discretion of a solid wall — ideal for conference rooms, private offices, and residential interiors.",
  },
  {
    title: "Hundreds of Patterns and Finishes",
    body: "From ultra-fine weaves that are barely visible to bold geometric meshes that make a statement. Every pattern creates a completely different look. We work with you to find the right density, colour, and texture.",
  },
  {
    title: "Built to Your Exact Specifications",
    body: "No standard sizes, no off-the-shelf compromises. Every panel is made to exact dimensions, shape, and finish. Whether a single feature wall or an entire facade, we engineer it from scratch.",
  },
  {
    title: "Safe, Durable, and Built to Last",
    body: "The mesh is permanently bonded between two layers of glass. The laminated panel holds together even if broken — meeting international safety glazing standards. As durable as it is beautiful.",
  },
];

const MeshGlassPage = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="bg-background">
        <Navbar />

        {/* ── Page header ───────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-0 relative overflow-hidden">
          {/* Large ghosted headline watermark */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(8rem, 22vw, 20rem)",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1px hsl(38 72% 44% / 0.07)",
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
            aria-hidden
          >
            MESH
          </div>

          <div className="container mx-auto px-6 relative pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex mb-6">
                <span className="eyebrow-label text-gold/75">Signature Product</span>
              </div>

              <p
                className="font-display font-light text-primary-foreground leading-none mb-1"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                Glass woven with
              </p>

              <GooeyText
                texts={["fabric & light", "woven texture", "pattern & depth", "layered craft"]}
                morphTime={1.5}
                cooldownTime={0.6}
                className="h-[3rem] md:h-[4.5rem] lg:h-[6rem] mb-7"
                textClassName="font-display italic font-medium text-gold"
                textStyle={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              />

              <p className="font-body text-primary-foreground/50 font-light max-w-lg leading-[1.8] text-[0.9375rem]">
                Fabric mesh permanently laminated between glass layers — our signature product.
                Available in hundreds of weave patterns, colours, and densities. No two installations are alike.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Overview split ────────────────────────────────────── */}
        <section className="bg-background py-24 border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
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
                <div className="overflow-hidden aspect-[4/3]">
                  <img
                    src={overviewImg}
                    alt="Mesh glass overview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                {/* Badge */}
                <div className="absolute top-4 right-4 gradient-gold px-4 py-2">
                  <span className="font-body text-[9px] tracking-[0.26em] uppercase text-primary-foreground font-medium">
                    Signature Product
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <span className="eyebrow-label text-gold mb-5 inline-flex">What makes it special</span>
                <h2
                  className="font-display font-light text-foreground mt-5 mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Structure, texture,{" "}
                  <span className="italic font-medium gradient-gold-text">identity</span>
                </h2>
                <p className="font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem] mb-5">
                  Fabric mesh laminated between glass layers creates a product that is simultaneously
                  structural, decorative, and functional. Used in office partitions, hotel lobbies,
                  retail storefronts, residential interiors, and architectural facades.
                </p>
                <p className="font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem]">
                  If you can imagine it, we can build it.
                </p>
                <MetalButton as="a" href="/contact" className="mt-8 px-8 py-3.5">
                  Explore Options <ArrowRight className="w-3.5 h-3.5" />
                </MetalButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────── */}
        <section className="bg-primary py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
              <div>
                <span className="eyebrow-label text-gold/75 mb-4 inline-flex">Pattern Library</span>
                <h2
                  className="font-display font-light text-primary-foreground mt-4"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Available weaves &amp;{" "}
                  <span className="italic font-medium gradient-gold-text">finishes</span>
                </h2>
              </div>
              <p className="font-body text-primary-foreground/40 text-[0.78rem] max-w-xs leading-relaxed">
                A sample of available patterns — hundreds more are available on request.
              </p>
            </motion.div>

            {/* 3 × 2 gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((item, i) => (
                <motion.button
                  key={i}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => setActive(active === i ? null : i)}
                  className="relative group overflow-hidden bg-background/5 text-left focus:outline-none"
                  style={{ border: "1px solid hsl(38 72% 44% / 0.14)" }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <p className="font-body text-[9px] tracking-[0.28em] uppercase text-gold font-medium mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-[0.75rem] text-primary-foreground/70 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits ──────────────────────────────────────────── */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-16 text-center"
            >
              <span className="eyebrow-label text-gold mb-5 inline-flex">Why Mesh Glass</span>
              <h2
                className="font-display font-light text-foreground mt-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
              >
                Four reasons architects{" "}
                <span className="italic font-medium gradient-gold-text">choose mesh</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.09 }}
                  className="p-8 bg-card card-top-reveal hover-lift"
                  style={{ border: "1px solid hsl(36 16% 86%)" }}
                >
                  <div className="left-bar-gold">
                    <p className="font-body text-[0.85rem] font-semibold text-foreground mb-3 tracking-[0.01em]">
                      {b.title}
                    </p>
                    <p className="font-body text-[0.8125rem] text-muted-foreground font-light leading-[1.82]">
                      {b.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-20 bg-primary text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6"
          >
            <h2
              className="font-display font-light text-primary-foreground mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Ready to specify{" "}
              <span className="italic font-medium gradient-gold-shimmer">mesh glass?</span>
            </h2>
            <p className="font-body text-primary-foreground/45 font-light max-w-sm mx-auto mb-10 text-[0.9rem]">
              Tell us your pattern, dimensions, and application — we'll handle the rest.
            </p>
            <MetalButton as="a" href="/contact" className="px-12 py-4">
              Request Mesh Glass Quote
            </MetalButton>
          </motion.div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default MeshGlassPage;
