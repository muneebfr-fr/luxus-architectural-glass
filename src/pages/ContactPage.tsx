import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Phone, Mail, MapPin } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { GoldGlassButton } from "@/components/ui/liquid-glass-button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

const products = [
  "Laminated Glass",
  "Smart Glass",
  "Mesh Glass",
  "UV Protective Glass",
  "Custom Solutions",
];

const contactDetails = [
  { Icon: Phone, label: "Phone",   value: "(346) 545 9613",           href: "tel:3465459613"                },
  { Icon: Mail,  label: "Email",   value: "info@luxusglassusa.com",   href: "mailto:info@luxusglassusa.com" },
  { Icon: MapPin, label: "Address", value: "13626 Kluge Rd Ste C\nCypress, TX 77429", href: null           },
];

const ContactPage = () => {
  const [state, handleFormspreeSubmit] = useForm("xkoywgwl");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (p: string) =>
    setSelectedProducts((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hiddenInput = e.currentTarget.querySelector<HTMLInputElement>('input[name="products"]');
    if (hiddenInput) hiddenInput.value = selectedProducts.join(", ");
    handleFormspreeSubmit(e);
  };

  /* ── Success state ──────────────────────────────────────── */
  if (state.succeeded) {
    return (
      <PageTransition>
        <div className="bg-background min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 flex items-center justify-center pt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-6 max-w-lg"
            >
              <div className="w-16 h-16 gradient-gold flex items-center justify-center mx-auto mb-8 shadow-gold-md">
                <Send className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="eyebrow-label text-gold mb-5 inline-flex">Message Sent</span>
              <h1
                className="font-display font-light text-foreground mt-5 mb-4"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
              >
                Thank You
              </h1>
              <p className="font-body text-muted-foreground font-light mb-10 leading-[1.8]">
                Your quote request has been received. Our team will review your requirements
                and respond within one business day.
              </p>
              <GoldGlassButton as="a" href="/" className="px-10 py-4">
                Back to Home
              </GoldGlassButton>
            </motion.div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  /* ── Main form ──────────────────────────────────────────── */
  return (
    <PageTransition>
      <div className="bg-background">
        <Navbar />

        {/* ── Page header ─────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
          {/* Vertical accent line */}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-8 top-[20%] w-px h-[60%] bg-gradient-to-b from-transparent via-gold/20 to-transparent pointer-events-none"
          />
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex mb-6">
                <span className="eyebrow-label text-gold/75">Start Your Project</span>
              </div>

              <p
                className="font-display font-light text-primary-foreground leading-none mb-1"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
              >
                Let's build something
              </p>

              <GooeyText
                texts={["extraordinary", "exceptional", "lasting", "purely yours"]}
                morphTime={1.5}
                cooldownTime={0.6}
                className="h-[3rem] md:h-[4rem] lg:h-[5.5rem] mb-7"
                textClassName="font-display italic font-medium text-gold"
                textStyle={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
              />

              <p className="font-body text-primary-foreground/50 font-light max-w-md leading-[1.8] text-[0.9375rem]">
                Tell us about your project and we'll provide a tailored quote within
                one business day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Form + contact ───────────────────────────────────── */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <input type="hidden" name="products" defaultValue="" />

                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { id: "firstName", label: "First Name", type: "text",  required: true,  max: 100 },
                    { id: "lastName",  label: "Last Name",  type: "text",  required: true,  max: 100 },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                        {f.label} {f.required && "*"}
                      </label>
                      <input
                        type={f.type}
                        name={f.id}
                        required={f.required}
                        maxLength={f.max}
                        className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                      <ValidationError field={f.id} errors={state.errors} className="text-red-500 text-xs mt-1 font-body" />
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={255}
                      className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                    <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1 font-body" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={20}
                      className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    name="company"
                    maxLength={200}
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                  />
                </div>

                {/* Products of interest */}
                <div>
                  <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-4">
                    Products of Interest
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {products.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => toggleProduct(p)}
                        className={`font-body text-[10px] tracking-[0.16em] uppercase px-5 py-2.5 border transition-all duration-300 card-top-reveal ${
                          selectedProducts.includes(p)
                            ? "gradient-gold text-primary-foreground border-transparent"
                            : "border-border/80 text-muted-foreground hover:border-gold hover:text-gold"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project type */}
                <div>
                  <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:border-gold transition-colors duration-300"
                  >
                    <option value="">Select a project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="retail">Retail &amp; Hospitality</option>
                    <option value="institutional">Institutional</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-body text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Dimensions, requirements, timeline..."
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                  />
                  <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs mt-1 font-body" />
                </div>

                {/* Error */}
                {state.errors && state.errors.length > 0 && (
                  <p className="font-body text-sm text-red-500">
                    Something went wrong. Email us directly at{" "}
                    <a href="mailto:info@luxusglassusa.com" className="underline">
                      info@luxusglassusa.com
                    </a>
                  </p>
                )}

                {/* Submit */}
                <GoldGlassButton
                  type="submit"
                  disabled={state.submitting}
                  className="px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Sending…" : "Submit Quote Request"}
                </GoldGlassButton>
              </motion.form>

              {/* Contact sidebar */}
              <motion.aside
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                <div
                  className="p-8 bg-card"
                  style={{ border: "1px solid hsl(38 72% 44% / 0.18)" }}
                >
                  <p className="font-body text-[10px] tracking-[0.30em] uppercase text-gold mb-6 font-medium">
                    Contact Details
                  </p>
                  <div className="space-y-6">
                    {contactDetails.map(({ Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <Icon className="w-4 h-4 text-gold/60 mt-0.5 shrink-0 stroke-[1.5]" />
                        <div>
                          <p className="font-body text-[9px] tracking-[0.26em] uppercase text-muted-foreground/60 mb-1">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="font-body text-[0.82rem] text-foreground hover:text-gold transition-colors duration-300 whitespace-pre-line"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="font-body text-[0.82rem] text-foreground whitespace-pre-line">
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="p-8 bg-primary"
                  style={{ border: "1px solid hsl(38 72% 44% / 0.20)" }}
                >
                  <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-3 font-medium">
                    Response Time
                  </p>
                  <p className="font-body text-[0.82rem] text-primary-foreground/55 font-light leading-[1.75]">
                    We respond to all quote requests within one business day. For urgent
                    inquiries, call us directly.
                  </p>
                </div>

                <div className="flex gap-5">
                  {[
                    { href: "https://www.instagram.com/luxusglassusa", label: "Instagram" },
                    { href: "https://www.facebook.com/luxusglassusa",  label: "Facebook"  },
                  ].map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;
