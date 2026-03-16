import { motion } from "framer-motion";
import { Shield, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroCampus from "@/assets/hero-campus.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="Swami Chidananda Institute of Social Sciences campus aerial view"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>

      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground text-sm font-medium mb-8">
              <Shield className="w-4 h-4" />
              Affiliated to Utkal University of Culture
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-extrabold text-primary-foreground leading-tight mb-6"
          >
            Swami Chidananda Institute of
            <br />
            <span className="text-secondary"> Social Sciences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mb-10 font-body"
          >
            Swami Chidananda Institute of Social Sciences  empowering the next generation with excellence in social science education in Bhubaneswar, Odisha.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/admissions" className="btn-secondary group">
              Apply for Admission
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/programs" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Explore Programs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Shield, label: "Government Recognized" },
              { icon: MapPin, label: "Urban Campus" },
              { icon: CalendarDays, label: "Established 2019" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-20 h-20 rounded-full bg-secondary/20 blur-xl hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-accent/10 blur-2xl hidden lg:block"
      />
    </section>
  );
};

export default Hero;
