import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FacultyMember, getSiteData } from "@/lib/siteData";

const Faculty = () => {
  const [facultyData, setFacultyData] = useState<FacultyMember[]>([]);
  const [selected, setSelected] = useState<FacultyMember | null>(null);

  useEffect(() => {
    setFacultyData(getSiteData().faculties);
  }, []);

  return (
    <section id="faculty" className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Our Faculty</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Meet Our <span className="gradient-text">Expert Faculty</span>
            </h2>
            <p className="text-muted-foreground text-lg">Learn from experienced academicians and researchers dedicated to your success.</p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyData.map((f, i) => (
            <ScrollReveal key={f.name} delay={i * 0.08}>
              <div
                onClick={() => setSelected(f)}
                className="glass-card-hover p-6 cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-2xl gradient-primary-bg flex items-center justify-center text-primary-foreground font-heading font-bold text-2xl mb-5">
                  {f.photoUrl ? (
                    <img src={f.photoUrl} alt={f.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                  )}
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-1">{f.name}</h3>
                <p className="text-secondary text-sm font-medium mb-3">{f.designation}</p>
                <p className="text-muted-foreground text-sm mb-1">{f.specialization}</p>
                <p className="text-muted-foreground text-xs">{f.experience} Experience</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card p-8 max-w-md w-full relative"
              >
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
                <div className="w-24 h-24 rounded-2xl gradient-primary-bg flex items-center justify-center text-primary-foreground font-heading font-bold text-3xl mb-6">
                  {selected.photoUrl ? (
                    <img src={selected.photoUrl} alt={selected.name} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    selected.name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                  )}
                </div>
                <h3 className="font-heading font-bold text-foreground text-xl mb-1">{selected.name}</h3>
                <p className="text-secondary font-semibold text-sm mb-4">{selected.designation}</p>
                <div className="space-y-3 text-sm">
                  <div><span className="text-muted-foreground">Qualification:</span> <span className="text-foreground font-medium">{selected.qualification}</span></div>
                  <div><span className="text-muted-foreground">Specialization:</span> <span className="text-foreground font-medium">{selected.specialization}</span></div>
                  <div><span className="text-muted-foreground">Experience:</span> <span className="text-foreground font-medium">{selected.experience}</span></div>
                </div>
                <a href={`mailto:${selected.email}`} className="mt-6 btn-primary text-sm w-full">
                  <Mail className="w-4 h-4 mr-2" /> {selected.email}
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Faculty;
