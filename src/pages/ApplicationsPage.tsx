import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Home, Store, Landmark, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { GoldGlassButton } from "@/components/ui/liquid-glass-button";
import residentialImg  from "@/assets/residential-glass.jpg";
import commercialImg   from "@/assets/commercial-glass.jpg";
import retailImg       from "@/assets/retail-glass.jpg";
import officeImg       from "@/assets/office-pictures.jpeg";

const applications = [
  {
    icon: Home,
    label: "Residential",
    headline: "Where home becomes art",
    body: "Staircases, balustrades, skylights, shower enclosures, wine cellars, and feature walls. Mesh glass and smart glass add privacy and luxury to the most intimate spaces without sacrificing natural light.",
    usecases: ["Balustrades & railings", "Skylights & roof glazing", "Internal partitions", "Shower & bath enclosures", "Decorative feature walls"],
    image: residentialImg,
    imageAlt: "Residential architectural glass application",
  },
  {
    icon: Building2,
    label: "Commercial",
    headline: "Offices that command presence",
    body: "Conference room partitions, curtain walls, lobby features, and floor-to-ceiling glazing systems. Smart glass enables on-demand privacy for executive spaces. UV glass protects interior finishes.",
    usecases: ["Curtain wall systems", "Conference partitions", "Lobby features", "Floor-to-ceiling glazing", "Executive privacy glass"],
    image: commercialImg,
    imageAlt: "Commercial architectural glass installation",
  },
  {
    icon: Store,
    label: "Retail & Hospitality",
    headline: "Storefronts that stop traffic",
    body: "High-impact storefronts, hotel lobby features, restaurant partitions, and display cases. Mesh glass creates visual identity — a pattern and colour unique to your brand.",
    usecases: ["Branded storefronts", "Hotel lobby features", "Restaurant partitions", "Retail display cases", "Canopy & awning glazing"],
    image: retailImg,
    imageAlt: "Retail glass storefront",
  },
  {
    icon: Landmark,
    label: "Institutional",
    headline: "Public spaces built to endure",
    body: "Schools, hospitals, government buildings, and cultural institutions. Safety-rated laminated glass, acoustic-grade interlayers, and anti-UV protection for spaces that serve the public for decades.",
    usecases: ["Safety-rated panels", "Acoustic glazing", "Anti-UV protection", "Structural facades", "Large-format panels"],
    image: officeImg,
    imageAlt: "Institutional glass application",
  },
];

const ApplicationsPage = () => {
  return (
    <PageTransition>
      <div className="bg-background">
        <Navbar />

        {/* ── Page header ───────────────────────────────────────── */}
        <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(38 72% 44%) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex mb-6">
                <span className="eyebrow-label text-gold/75">Where We Work</span>
              </div>

              <p
                className="font-display font-light text-primary-foreground leading-none mb-1"
                style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                Where glass meets
              </p>

              <GooeyText
                texts={["architecture", "every sector", "your vision", "the built world"]}
                morphTime={1.5}
                cooldownTime={0.6}
                className="h-[3rem] md:h-[4.5rem] lg:h-[6rem] mb-7"
                textClassName="font-display italic font-medium text-gold"
                textStyle={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              />

              <p className="font-body text-primary-foreground/50 font-light max-w-lg leading-[1.8] text-[0.9375rem]">
                From private residences to public buildings — our glass is specified
                across every sector of the built environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Application cards ─────────────────────────────────── */}
        <section className="bg-background">
          {applications.map((app, index) => {
            const imageRight = index % 2 === 0;
            const Icon = app.icon;
            return (
              <motion.div
                key={app.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75 }}
                className="border-b border-border/50"
              >
                <div className="container mx-auto px-6 py-20">
                  <div
                    className={`grid lg:grid-cols-2 gap-16 items-center ${
                      imageRight ? "" : "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    }`}
                  >
                    {/* Text */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Icon className="w-5 h-5 text-gold stroke-[1.5]" />
                        <span className="font-body text-[10px] tracking-[0.28em] uppercase text-gold font-medium">
                          {app.label}
                        </span>
                      </div>
                      <h2
                        className="font-display font-light text-foreground mb-5 leading-[1.04]"
                        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                      >
                        {app.headline}
                      </h2>
                      <div className="w-12 h-px bg-gradient-to-r from-gold to-gold-light/50 mb-7" />
                      <p className="font-body text-muted-foreground font-light leading-[1.85] text-[0.9375rem] mb-8">
                        {app.body}
                      </p>

                      {/* Use-case list */}
                      <ul className="space-y-2 mb-8">
                        {app.usecases.map((u) => (
                          <li key={u} className="flex items-center gap-3 font-body text-[0.82rem] text-muted-foreground">
                            <span className="w-4 h-px bg-gold/50 shrink-0" />
                            {u}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all duration-300"
                      >
                        Discuss Your Project <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="relative">
                      <div
                        className="absolute -inset-3 pointer-events-none"
                        style={{ border: "1px solid hsl(38 72% 44% / 0.12)" }}
                      />
                      <div className="overflow-hidden aspect-[4/3] group">
                        <img
                          src={app.image}
                          alt={app.imageAlt}
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
            <span className="eyebrow-label text-gold/75 mb-6 inline-flex">Your Project</span>
            <h2
              className="font-display font-light text-primary-foreground mt-6 mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Don't see your application?{" "}
              <span className="italic font-medium gradient-gold-shimmer">Ask us.</span>
            </h2>
            <p className="font-body text-primary-foreground/45 font-light max-w-sm mx-auto mb-10 text-[0.9rem]">
              We work across every sector. If it involves glass, we can engineer it.
            </p>
            <GoldGlassButton as="a" href="/contact" className="px-12 py-4">
              Start a Conversation
            </GoldGlassButton>
          </motion.div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ApplicationsPage;
