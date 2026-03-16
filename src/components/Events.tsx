import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Calendar, User, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import eventsImg from "@/assets/events.jpg";
import { EventItem, getSiteData } from "@/lib/siteData";

const Events = () => {
  const [regOpen, setRegOpen] = useState(false);
  const [regEvent, setRegEvent] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    setEvents(getSiteData().events);
  }, []);

  const openReg = (eventTitle: string) => {
    setRegEvent(eventTitle);
    setRegOpen(true);
  };

  return (
    <section id="events" className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Events & Seminars</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden">
              <img src={eventsImg} alt="Swami Chidananda Institute of Social Sciences seminar hall" className="w-full h-[300px] lg:h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {events.map((e, i) => (
              <ScrollReveal key={e.title} delay={i * 0.1} direction="right">
                <div className="glass-card-hover p-6 group">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary mb-2">{e.type}</span>
                      <h3 className="font-heading font-bold text-foreground">{e.title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{e.desc}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{e.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{e.speaker}</span>
                  </div>
                  <button onClick={() => openReg(e.title)} className="btn-primary text-xs px-5 py-2">Register</button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Registration Modal */}
        <AnimatePresence>
          {regOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setRegOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card p-8 max-w-md w-full relative"
              >
                <button onClick={() => setRegOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-heading font-bold text-foreground text-xl mb-2">Event Registration</h3>
                <p className="text-muted-foreground text-sm mb-6">{regEvent}</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setRegOpen(false); }}>
                  <input placeholder="Full Name" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="Email Address" type="email" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="Phone Number" type="tel" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="Institution" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <button type="submit" className="btn-secondary w-full">Submit Registration</button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Events;
