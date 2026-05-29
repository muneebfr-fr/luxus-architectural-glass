import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import HomePage        from "./pages/HomePage";
import ServicesPage    from "./pages/ServicesPage";
import MeshGlassPage   from "./pages/MeshGlassPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AboutPage       from "./pages/AboutPage";
import ContactPage     from "./pages/ContactPage";
import NotFound        from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"             element={<HomePage />} />
        <Route path="/services"     element={<ServicesPage />} />
        <Route path="/mesh-glass"   element={<MeshGlassPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
