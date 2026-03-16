import ScrollReveal from "./ScrollReveal";
import { BookOpen, Home, Dumbbell, Coffee, Wifi, Theater, Heart, FlaskConical } from "lucide-react";
import libraryImg from "@/assets/library.jpg";

const facilities = [
  { icon: BookOpen, title: "Library", desc: "Extensive collection of books, journals, and digital resources" },
  { icon: Home, title: "Hostels", desc: "Comfortable accommodation with modern amenities" },
  { icon: Dumbbell, title: "Sports Complex", desc: "Multi-sport facility with indoor and outdoor courts" },
  { icon: Coffee, title: "Cafeteria", desc: "Hygienic food court with diverse cuisine options" },
  { icon: Wifi, title: "WiFi Campus", desc: "High-speed internet across the entire campus" },
  { icon: Theater, title: "Auditorium", desc: "State-of-the-art auditorium for events and seminars" },
  { icon: Heart, title: "Medical Center", desc: "On-campus health center with emergency services" },
  { icon: FlaskConical, title: "Laboratories", desc: "Well-equipped labs for research and practical learning" },
];

const Facilities = () => {
  return (
    <section id="facilities" className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Campus Life</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              World-Class <span className="gradient-text">Facilities</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <ScrollReveal className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden h-full">
              <img src={libraryImg} alt="Modern university library at Swami Chidananda Institute of Social Sciences" className="w-full h-full object-cover min-h-[300px]" loading="lazy" />
            </div>
          </ScrollReveal>
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {facilities.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="glass-card-hover p-6 h-full group">
                  <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                    <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
