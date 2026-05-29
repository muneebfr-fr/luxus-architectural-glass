import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Consultation",          description: "We begin with a detailed conversation about your project, including requirements, dimensions, performance specs, and design intent." },
  { number: "02", title: "Design & Engineering",  description: "Our technical team develops a complete glass specification, including interlayer selection, thickness calculations, and compliance documentation." },
  { number: "03", title: "Production",            description: "Every panel is manufactured under strict quality controls using certified materials and advanced lamination technology." },
  { number: "04", title: "Delivery & Installation", description: "Finished glass is carefully packaged, delivered on schedule, and installed by trained professionals to ensure a flawless result." },
];

const ProcessSection = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-36 bg-section-alt relative">
      <div className="section-rule absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6 pt-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex justify-center mb-5">
            <span className="eyebrow-label">Our Process</span>
          </div>
          <h2 className="font-display font-light text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            From concept to{" "}
            <span className="italic font-medium gradient-gold-text">completion</span>
          </h2>
        </motion.div>

        {/* Animated connecting line behind the steps */}
        <div ref={lineRef} className="relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                transformOrigin: "left",
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, hsl(38 72% 44% / 0.6), hsl(38 72% 44% / 0.25), hsl(38 72% 44% / 0.6))",
              }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.14 }}
                className="relative p-8 group card-top-reveal"
                style={{
                  borderRight: index < steps.length - 1 ? "1px solid hsl(36 16% 86%)" : "none",
                }}
              >
                {/* Step number node */}
                <div className="relative mb-6 w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                  <div className="absolute inset-0 rounded-full border border-gold/20 group-hover:border-gold/50 transition-colors duration-400" />
                  <span className="font-display text-2xl gradient-gold-text font-medium relative z-10"
                        style={{ letterSpacing: "-0.01em" }}>
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-[1.35rem] text-foreground mb-3 text-center md:text-left">
                  {step.title}
                </h3>
                <p className="font-body text-[0.8125rem] text-muted-foreground font-light leading-[1.78] text-center md:text-left">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
