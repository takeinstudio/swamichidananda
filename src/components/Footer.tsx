import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Faculty", href: "/faculty" },
  { label: "Admissions", href: "/admissions" },
];

const resourceLinks = [
  { label: "Events", href: "/events" },
  { label: "Payments", href: "/payments" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="gradient-primary-bg text-primary-foreground overflow-hidden">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container-max px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div variants={fadeUp}>
            <motion.div
              variants={scaleIn}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-heading font-bold text-sm">Swami Chidananda Institute of Social Sciences</span>
            </motion.div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Swami Chidananda Institute of Social Sciences, Bhubaneswar. Affiliated to Utkal University of Culture.
            </p>
            <p className="text-primary-foreground/50 text-xs mt-3">AISHE Code: C-66170</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-heading font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const } } }}
                >
                  <Link to={link.href} className="hover:text-primary-foreground hover:translate-x-1 transition-all duration-300 inline-block">{link.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-heading font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {resourceLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  variants={{ hidden: { opacity: 0, x: -15 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.05, ease: "easeOut" as const } } }}
                >
                  <Link to={link.href} className="hover:text-primary-foreground hover:translate-x-1 transition-all duration-300 inline-block">{link.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="font-heading font-bold text-sm mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>F-115, Goutam Nagar</p>
              <p>Bhubaneswar, Odisha</p>
              <a href="mailto:info@syvacademy.com" className="hover:text-primary-foreground transition-colors block">info@syvacademy.com</a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8, ease: "easeOut" as const } } }}
          className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 origin-left"
        >
          <motion.p variants={fadeUp} className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Swami Chidananda Institute of Social Sciences. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
