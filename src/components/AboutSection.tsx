import { motion } from "framer-motion";
import glassDetail from "@/assets/laminated-glass.jpg";
import AnimatedStat from "@/components/AnimatedStat";

const AboutSection = () => {
  return (
    <section className="py-36 bg-background relative overflow-hidden">
      {/* Decorative background accent — very subtle warm blob */}
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 72% 44% / 0.045) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex mb-5">
              <span className="eyebrow-label">Why Luxus</span>
            </div>
            <h2 className="font-display font-light text-foreground mb-9 leading-[1.05]"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
              Glass, elevated to an
              <br />
              <span className="italic font-medium gradient-gold-text">art form</span>
            </h2>
            <div className="space-y-5 font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem]">
              <p>
                Luxus Architectural Glass was founded on a single conviction: that every
                building deserves glass engineered with the same precision as the
                architecture it completes.
              </p>
              <p>
                We specialize exclusively in laminated glass — the safest, most versatile
                category of architectural glazing. Every panel we produce is built to spec,
                tested to standard, and delivered with full technical documentation.
              </p>
              <p>
                From initial consultation to final installation, our team works directly
                with architects, contractors, and property owners to ensure every detail
                is accounted for.
              </p>
            </div>

            {/* Inline micro-stats row */}
            <div className="flex gap-10 mt-10 pt-10 border-t border-border">
              {[
                { val: "100%", lbl: "Custom Built" },
                { val: "20+",  lbl: "Years Active" },
                { val: "500+", lbl: "Projects Done" },
              ].map((s, i) => (
                <AnimatedStat
                  key={s.lbl}
                  value={s.val}
                  label={s.lbl}
                  delay={i * 160}
                  valueClassName="text-2xl mb-1"
                  labelClassName="text-[10px] tracking-[0.26em]"
                />
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Decorative offset frame */}
            <div
              className="absolute -inset-3 pointer-events-none"
              style={{ border: "1px solid hsl(38 72% 44% / 0.14)" }}
            />
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            >
              <img
                src={glassDetail}
                alt="Premium laminated glass detail"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </motion.div>

            {/* Float stat card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="absolute -bottom-8 -left-8 bg-surface-elevated shadow-gold-sm p-7"
              style={{ border: "1px solid hsl(38 72% 44% / 0.20)" }}
            >
              <p className="font-display text-4xl gradient-gold-text font-semibold mb-1"
                 style={{ letterSpacing: "-0.02em" }}>
                100%
              </p>
              <p className="font-body text-[10px] tracking-[0.30em] uppercase text-muted-foreground">
                Custom Engineered
              </p>
              {/* Gold pulse ring */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold"
                style={{ animation: "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
