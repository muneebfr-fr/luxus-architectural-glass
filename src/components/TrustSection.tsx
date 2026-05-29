import { motion } from "framer-motion";

const DiamondIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
    <rect x="9" y="1.5" width="9" height="9" rx="1" transform="rotate(45 9 1.5)"
          stroke="hsl(38 72% 44%)" strokeWidth="1.25" fill="none" />
    <rect x="9" y="5.5" width="4" height="4" rx="0.5" transform="rotate(45 9 5.5)"
          fill="hsl(38 72% 44%)" opacity="0.5" />
  </svg>
);

const commitments = [
  { title: "Certified Materials",    description: "Every interlayer, glass sheet, and coating we use is sourced from certified manufacturers with full traceability." },
  { title: "Standards Compliance",   description: "All products are engineered to meet ASTM, EN, ISO, and UL standards relevant to your project and region." },
  { title: "Rigorous Testing",       description: "Each production run undergoes impact, adhesion, and clarity testing before leaving our facility." },
  { title: "Full Documentation",     description: "We provide complete technical data sheets, test reports, and installation guides with every order." },
  { title: "Dedicated Support",      description: "A single point of contact from consultation through installation. No handoffs, no gaps." },
  { title: "Custom Engineering",     description: "No off the shelf solutions. Every panel is built to your exact specifications and performance requirements." },
];

const TrustSection = () => {
  return (
    <section className="py-36 bg-background relative">
      <div className="section-rule absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <span className="eyebrow-label">Our Commitment</span>
          </div>
          <h2 className="font-display font-light text-foreground mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Built on{" "}
            <span className="italic font-medium gradient-gold-text">integrity</span>
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-xl mx-auto text-[0.9rem] leading-[1.82]">
            We don't cut corners. Every decision — from material sourcing to final
            inspection — is driven by a commitment to delivering glass you can trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {commitments.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.09 }}
              className="flex gap-4 p-7 bg-card card-top-reveal hover-lift"
              style={{ border: "1px solid hsl(36 16% 86%)" }}
            >
              <DiamondIcon />
              <div>
                <h3 className="font-display text-[1.15rem] text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-[0.8125rem] text-muted-foreground font-light leading-[1.78]">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
