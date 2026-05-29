import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6"
          >
            <p
              className="font-display font-light gradient-gold-text mb-4 leading-none"
              style={{ fontSize: "clamp(6rem, 20vw, 14rem)", letterSpacing: "-0.04em" }}
            >
              404
            </p>
            <h1 className="font-display font-light text-foreground mb-4 text-2xl">
              Page not found
            </h1>
            <p className="font-body text-muted-foreground font-light mb-8 text-sm">
              The page you're looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="gradient-gold font-body text-[11px] tracking-[0.22em] uppercase px-10 py-4 text-primary-foreground font-medium hover:opacity-88 hover:shadow-gold-md transition-all duration-300 inline-block"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default NotFound;
