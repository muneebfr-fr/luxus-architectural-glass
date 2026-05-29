import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section id="contact" className="py-36 bg-section-alt relative overflow-hidden">
      <div className="section-rule absolute top-0 left-0 right-0" />

      {/* Decorative background glow */}
      <div
        className="absolute bottom-0 left-0 w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 72% 44% / 0.06) 0%, transparent 65%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left: CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex mb-5">
              <span className="eyebrow-label">Start Your Project</span>
            </div>

            {/* Vertical gold accent + headline */}
            <div className="flex gap-5 items-start mb-8">
              <div
                className="w-0.5 self-stretch shrink-0 mt-1"
                style={{ background: "linear-gradient(to bottom, hsl(38 72% 44%), hsl(38 58% 60% / 0.3))" }}
              />
              <h2 className="font-display font-light text-foreground leading-[1.05]"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
                Let's build something
                <br />
                <span className="italic font-medium gradient-gold-shimmer">extraordinary</span>
              </h2>
            </div>

            <p className="font-body text-muted-foreground font-light max-w-xl mb-10 leading-[1.85] text-[0.9rem]">
              Whether you're specifying glass for a single room or an entire building,
              we're ready to engineer the perfect solution. Reach out for a free consultation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/quote"
                className="gradient-gold font-body text-[11px] tracking-[0.22em] uppercase px-11 py-4 text-primary-foreground font-medium hover:opacity-88 hover:shadow-gold-md transition-all duration-300 text-center"
              >
                Request a Quote
              </Link>
              <a
                href="tel:3465459613"
                className="border border-gold/70 text-gold font-body text-[11px] tracking-[0.22em] uppercase px-11 py-4 hover:bg-gold hover:text-primary-foreground hover:border-gold transition-all duration-300 text-center"
              >
                Call Us Directly
              </a>
            </div>

            {/* Contact details */}
            <div className="space-y-4 font-body text-[0.8375rem] text-muted-foreground font-light">
              {[
                { label: "Phone",   content: <a href="tel:3465459613" className="hover:text-gold transition-colors">(346) 545 9613</a> },
                { label: "Email",   content: <a href="mailto:info@luxusglassusa.com" className="hover:text-gold transition-colors duration-300">info@luxusglassusa.com</a> },
                { label: "Address", content: <span>13626 Kluge Rd Ste C, Cypress, TX 77429</span> },
              ].map(({ label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="text-gold font-medium uppercase tracking-[0.22em] text-[10px] mt-0.5 w-14 shrink-0">
                    {label}
                  </span>
                  {content}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="aspect-square w-full overflow-hidden shadow-gold-sm"
              style={{ border: "1px solid hsl(38 72% 44% / 0.28)" }}
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
            </div>
            <a
              href="https://www.google.com/maps/dir//13626+Kluge+Rd+Ste+C,+Cypress,+TX+77429"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center mt-4 font-body text-[11px] text-gold hover:underline tracking-[0.24em] uppercase transition-colors duration-300"
            >
              Get Directions →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
