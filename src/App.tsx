import type { ReactNode } from "react";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Faculty from "@/components/Faculty";
import Facilities from "@/components/Facilities";
import Events from "@/components/Events";
import Admissions from "@/components/Admissions";
import Payments from "@/components/Payments";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Admin from "./pages/Admin.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import { trackVisitorOncePerSession } from "@/lib/siteData";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const PageTitle = () => {
  const { pathname } = useLocation();
  
  const getTitleForPath = (path: string) => {
    const titles: Record<string, string> = {
      "/": "Home | Swami Chidananda Institute",
      "/about": "About | Swami Chidananda Institute",
      "/programs": "Programs | Swami Chidananda Institute",
      "/faculty": "Faculty | Swami Chidananda Institute",
      "/facilities": "Facilities | Swami Chidananda Institute",
      "/events": "Events | Swami Chidananda Institute",
      "/admissions": "Admissions | Swami Chidananda Institute",
      "/payments": "Payments | Swami Chidananda Institute",
      "/contact": "Contact | Swami Chidananda Institute",
      "/admin": "Admin Dashboard | Swami Chidananda Institute",
      "/admin-login": "Admin Login | Swami Chidananda Institute",
      "/apply-now": "Apply Now | Swami Chidananda Institute",
    };
    return titles[path] || "Swami Chidananda Institute";
  };

  useEffect(() => {
    document.title = getTitleForPath(pathname);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const SectionPageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-20">{children}</main>
    <Footer />
  </div>
);

const App = () => (
  <AppWithTracking />
);

const AppWithTracking = () => {
  useEffect(() => {
    trackVisitorOncePerSession();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTitle />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/about"
            element={
              <SectionPageLayout>
                <About />
              </SectionPageLayout>
            }
          />
          <Route
            path="/programs"
            element={
              <SectionPageLayout>
                <Programs />
              </SectionPageLayout>
            }
          />
          <Route
            path="/faculty"
            element={
              <SectionPageLayout>
                <Faculty />
              </SectionPageLayout>
            }
          />
          <Route
            path="/facilities"
            element={
              <SectionPageLayout>
                <Facilities />
              </SectionPageLayout>
            }
          />
          <Route
            path="/events"
            element={
              <SectionPageLayout>
                <Events />
              </SectionPageLayout>
            }
          />
          <Route
            path="/admissions"
            element={
              <SectionPageLayout>
                <Admissions />
              </SectionPageLayout>
            }
          />
          <Route
            path="/payments"
            element={
              <SectionPageLayout>
                <Payments />
              </SectionPageLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <SectionPageLayout>
                <Contact />
              </SectionPageLayout>
            }
          />
          <Route
            path="/apply-now"
            element={
              <SectionPageLayout>
                <Admissions />
              </SectionPageLayout>
            }
          />
          <Route
            path="/gallery"
            element={
              <SectionPageLayout>
                <Gallery />
              </SectionPageLayout>
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
