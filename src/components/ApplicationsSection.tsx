import { motion } from "framer-motion";
import residentialImg from "@/assets/residential-glass.jpg";
import commercialImg from "@/assets/commercial-glass.jpg";
import retailImg from "@/assets/retail-glass.jpg";
import officeImg from "@/assets/office-pictures.jpeg";

const applications = [
  { title: "Luxury Residences",    description: "Floor to ceiling glass walls, skylights, and privacy partitions designed for high end homes and penthouse apartments.", image: residentialImg },
  { title: "Commercial Facades",   description: "Curtain walls, storefronts, and entrance systems that combine aesthetic ambition with structural performance.",          image: commercialImg },
  { title: "Retail & Hospitality", description: "Display glass, branded partitions, and decorative features for boutiques, hotels, and premium showrooms.",              image: retailImg },
  { title: "Office Solutions",     description: "Mesh glass partitions, conference room dividers, and feature walls that bring privacy, light, and luxury into modern workspaces.", image: officeImg },
];

const ApplicationsSection = () => {
  return (
    <section id="applications" className="py-36 bg-background relative">
      <div className="section-rule absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6 pt-0">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-5">
            <span className="eyebrow-label">Applications</span>
          </div>
          <h2 className="font-display font-light text-foreground mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
            Where our glass{" "}
            <span className="italic font-medium">belongs</span>
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-xl mx-auto text-[0.9rem] leading-[1.8]">
            Designed for the environments that demand the highest standards of safety,
            clarity, and aesthetics.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.12 }}
              className="group relative overflow-hidden aspect-[16/10] cursor-pointer"
            >
              <img
                src={app.image}
                alt={app.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-[800ms] ease-out"
                loading="lazy"
                width={800}
                height={600}
              />
              {/* Diagonal gradient overlay — more dramatic than flat */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(155deg, transparent 20%, hsla(222, 22%, 8%, 0.45) 55%, hsla(222, 22%, 5%, 0.85) 100%)",
                  opacity: 0.9,
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(155deg, transparent 10%, hsla(222, 22%, 8%, 0.35) 50%, hsla(222, 22%, 5%, 0.78) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-10">
                {/* Gold accent line — reveals on hover */}
                <div
                  className="w-0 h-px mb-4 transition-all duration-500 group-hover:w-12"
                  style={{ background: "linear-gradient(to right, hsl(38 72% 44%), hsl(38 58% 60%))" }}
                />
                <h3 className="font-display text-[1.9rem] text-primary-foreground mb-3 leading-tight">
                  {app.title}
                </h3>
                <p className="font-body text-[0.8125rem] text-primary-foreground/75 font-light leading-[1.78] max-w-sm translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  {app.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
