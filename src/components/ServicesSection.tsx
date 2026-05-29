import { motion } from "framer-motion";
import { Layers, Zap, Grid3X3, Sun, Wrench } from "lucide-react";
import laminatedImg from "@/assets/laminated-glass.jpg";
import smartImg from "@/assets/smart-glass.jpg";
import fabricImg from "@/assets/fabric-mesh-glass.jpg";
import uvImg from "@/assets/uv-glass.jpg";
import customImg from "@/assets/custom-glass.jpg";

const services = [
  { icon: Layers,   title: "Laminated Glass",    description: "Multi layer safety glass engineered for structural integrity and acoustic insulation. Every panel meets or exceeds international safety standards.", image: laminatedImg },
  { icon: Zap,      title: "Smart Glass",         description: "Electronically switchable glass that transitions from transparent to opaque on demand. Ideal for privacy, energy efficiency, and modern design.", image: smartImg },
  { icon: Grid3X3,  title: "Mesh Glass",          description: "Laminated glass with woven fabric mesh interlayers that add texture, depth, and a unique decorative element. Perfect for partitions, facades, and statement interiors.", image: fabricImg },
  { icon: Sun,      title: "UV Protective Glass", description: "Advanced interlayer technology that blocks up to 99% of harmful UV radiation while maintaining optical clarity. Protects interiors and occupants alike.", image: uvImg },
  { icon: Wrench,   title: "Custom Solutions",    description: "Bespoke laminated glass for unique architectural requirements. Curved panels, oversized formats, decorative interlayers, and specialty coatings.", image: customImg },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-36 bg-section-alt relative">
      {/* Top rule */}
      <div className="section-rule mb-0" />

      <div className="container mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <span className="eyebrow-label">Our Expertise</span>
          </div>
          <h2 className="font-display font-light text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Precision engineered glass{" "}
            <span className="italic font-medium gradient-gold-text">solutions</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.09 }}
              className="bg-card overflow-hidden group card-top-reveal hover-lift"
              style={{ border: "1px solid hsl(36 16% 86%)" }}
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-[800ms] ease-out"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                {/* Icon + gold line */}
                <div className="mb-5">
                  <service.icon className="w-6 h-6 text-gold mb-3 stroke-[1.5]" />
                  <div className="w-8 h-px bg-gradient-to-r from-gold to-gold-light/50" />
                </div>
                <h3 className="font-display text-[1.45rem] text-foreground mb-3 group-hover:gradient-gold-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-[0.8375rem] text-muted-foreground font-light leading-[1.78]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
