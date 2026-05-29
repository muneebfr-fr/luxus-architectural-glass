import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const products = [
  "Laminated Glass",
  "Smart Glass",
  "Mesh Glass",
  "UV Protective Glass",
  "Custom Solutions",
];

const QuotePage = () => {
  const [state, handleFormspreeSubmit] = useForm("xkoywgwl");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductToggle = (product: string) => {
    setSelectedProducts((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Inject selected products as a hidden field value before submitting
    const hiddenInput = form.querySelector<HTMLInputElement>('input[name="products"]');
    if (hiddenInput) hiddenInput.value = selectedProducts.join(", ");
    handleFormspreeSubmit(e);
  };

  if (state.succeeded) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="pt-32 pb-32 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-gold-md">
                <Send className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="font-display font-light text-foreground mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                Thank You
              </h1>
              <p className="font-body text-muted-foreground font-light max-w-md mx-auto mb-8">
                Your quote request has been received. Our team will review your requirements
                and get back to you within one business day.
              </p>
              <Link
                to="/"
                className="gradient-gold font-body text-sm tracking-wider uppercase px-10 py-4 text-primary-foreground font-medium hover:opacity-90 transition-opacity duration-300 inline-block"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-28 pb-32">
          <div className="container mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-300 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="flex mb-4">
                <span className="eyebrow-label">Request a Quote</span>
              </div>
              <h1 className="font-display font-light text-foreground mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                Tell us about your <span className="italic font-medium">project</span>
              </h1>
              <p className="font-body text-muted-foreground font-light mb-12 leading-relaxed">
                Fill out the form below and our team will provide a tailored quote
                for your glass requirements.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="max-w-3xl space-y-8 pt-8"
              style={{ borderTop: "1px solid hsl(38 72% 44% / 0.18)" }}
            >
              {/* Hidden field for selected products */}
              <input type="hidden" name="products" defaultValue="" />

              {/* Name fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    maxLength={100}
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
                  />
                  <ValidationError field="firstName" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    maxLength={100}
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
                  />
                  <ValidationError field="lastName" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {/* Contact fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={255}
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
                  />
                  <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={20}
                    className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  maxLength={200}
                  className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Product selection */}
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-4">
                  Products of Interest
                </label>
                <div className="flex flex-wrap gap-3">
                  {products.map((product) => (
                    <button
                      key={product}
                      type="button"
                      onClick={() => handleProductToggle(product)}
                      className={`font-body text-[11px] tracking-[0.14em] uppercase px-6 py-3 border transition-all duration-300 card-top-reveal ${selectedProducts.includes(product)
                          ? "gradient-gold text-primary-foreground border-transparent"
                          : "border-border/80 text-muted-foreground hover:border-gold hover:text-gold"
                        }`}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project type */}
              <div>
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Project Type
                </label>
                <select
                  name="projectType"
                  className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300"
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
                <label className="block font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell us about your project dimensions, requirements, and timeline..."
                  className="w-full bg-card border border-border/80 px-4 py-3 font-body text-sm text-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-gold transition-colors duration-300 resize-none"
                />
                <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
              </div>

              {/* Form-level error */}
              {state.errors && state.errors.length > 0 && (
                <p className="font-body text-sm text-red-500">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:info@luxusglassusa.com" className="underline">
                    info@luxusglassusa.com
                  </a>
                  .
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state.submitting}
                className="gradient-gold font-body text-[11px] tracking-[0.22em] uppercase px-12 py-4 text-primary-foreground font-medium hover:opacity-88 hover:shadow-gold-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </motion.form>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default QuotePage;
