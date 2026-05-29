import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import overviewImg from "@/assets/overview-image.jpg";
import mesh1 from "@/assets/mesh-glass-1.png";
import mesh2 from "@/assets/mesh-glass-2.png";
import mesh3 from "@/assets/mesh-glass-3.png";
import mesh4 from "@/assets/mesh-glass-4.png";
import mesh5 from "@/assets/mesh-glass-5.png";
import mesh6 from "@/assets/mesh-glass-6.png";

const tabs = ["Overview", "Why Mesh Glass", "Our Work"];

const galleryImages = [
  { src: mesh1, label: "Bronze Weave" },
  { src: mesh2, label: "Copper Drift" },
  { src: mesh3, label: "Arctic Mesh" },
  { src: mesh4, label: "Luxe Mesh" },
  { src: mesh5, label: "Strata Gold" },
  { src: mesh6, label: "Linea Gold" },
];

const benefits = [
  { title: "Privacy Without Sacrificing Light",   desc: "Mesh glass lets natural light flow freely through a space while still blocking direct lines of sight. You get the openness of glass with the discretion of a solid wall — ideal for conference rooms, private offices, and residential interiors." },
  { title: "Hundreds of Patterns and Finishes",    desc: "From ultra fine weaves that are barely visible to bold geometric meshes that make a statement, every pattern creates a completely different look and feel. We work with you to find the right density, colour, and texture for your space." },
  { title: "Built to Your Exact Specifications",   desc: "No standard sizes, no off the shelf compromises. Every panel is made to the exact dimensions, shape, and finish you need. Whether it is a single feature wall or an entire building facade, we engineer it from scratch." },
  { title: "Safe, Durable, and Built to Last",     desc: "The mesh is permanently bonded between two layers of glass, creating a laminated panel that holds together even if broken. It meets international safety glazing standards and is as durable as it is beautiful." },
];

const MeshGlassSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="mesh-glass" className="py-24 bg-background border-t border-border/40 relative">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="eyebrow-label">Signature Product</span>
              <span className="gradient-gold font-body text-[9px] tracking-[0.22em] uppercase px-3 py-1 text-primary-foreground font-medium">
                Specialty
              </span>
            </div>
            <h2 className="font-display font-light text-foreground"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Mesh Glass —{" "}
              <span className="italic font-medium gradient-gold-text">our craft</span>
            </h2>
          </div>
          <Link
            to="/quote"
            className="gradient-gold font-body text-[11px] tracking-[0.18em] uppercase px-8 py-3 text-primary-foreground font-medium hover:opacity-88 hover:shadow-gold-sm transition-all duration-300 self-start sm:self-auto whitespace-nowrap"
          >
            Explore Mesh Glass Options
          </Link>
        </motion.div>

        {/* Tabs with sliding underline */}
        <div className="relative flex gap-0 border-b border-border mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`relative font-body text-[10px] tracking-[0.26em] uppercase px-7 py-3 transition-colors duration-300 ${
                activeTab === i ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] gradient-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative overflow-hidden">
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
                >
                  <img src={overviewImg} alt="Mesh Glass Overview" className="w-full aspect-[4/3] object-cover" />
                </motion.div>
                <div className="absolute top-4 left-4 gradient-gold px-3 py-1.5">
                  <span className="font-body text-[9px] tracking-[0.26em] uppercase text-primary-foreground font-medium">
                    Signature Product
                  </span>
                </div>
              </div>
              <div>
                <p className="font-body text-[0.9rem] text-muted-foreground font-light leading-[1.85] mb-6">
                  Fabric mesh laminated between glass layers creates a product that is simultaneously structural, decorative, and functional. Available in hundreds of weave patterns, colours, and densities. No two installations are alike.
                </p>
                <p className="font-body text-[0.9rem] text-muted-foreground font-light leading-[1.85]">
                  Used in office partitions, hotel lobbies, retail storefronts, residential interiors, and architectural facades. If you can imagine it, we can build it.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div
              key="why"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {benefits.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-7 bg-card card-top-reveal"
                  style={{ border: "1px solid hsl(36 16% 86%)" }}
                >
                  <div className="left-bar-gold">
                    <p className="font-body text-[0.85rem] font-semibold text-foreground mb-2 tracking-[0.01em]">
                      {item.title}
                    </p>
                    <p className="font-body text-[0.8125rem] text-muted-foreground font-light leading-[1.78]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="relative group overflow-hidden bg-card cursor-pointer"
                  style={{ border: "1px solid hsl(36 16% 86%)" }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-auto block transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/90">
                      {img.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MeshGlassSection;
