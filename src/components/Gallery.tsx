import ScrollReveal from "./ScrollReveal";
import heroCampus from "@/assets/hero-campus.jpg";
import libraryImg from "@/assets/library.jpg";
import eventsImg from "@/assets/events.jpg";

const images = [
  { src: heroCampus, alt: "Swami Chidananda Institute of Social Sciences Campus aerial view", label: "Campus" },
  { src: libraryImg, alt: "Swami Chidananda Institute of Social Sciences Library", label: "Library" },
  { src: eventsImg, alt: "Swami Chidananda Institute of Social Sciences Seminar Hall", label: "Seminars" },
  { src: heroCampus, alt: "Student life at Swami Chidananda Institute of Social Sciences", label: "Student Life" },
  { src: eventsImg, alt: "Workshop at Swami Chidananda Institute of Social Sciences", label: "Workshops" },
  { src: libraryImg, alt: "Academic resources at Swami Chidananda Institute of Social Sciences", label: "Resources" },
];

const Gallery = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Gallery</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Campus <span className="gradient-text">Gallery</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 3 === 0 ? "h-64" : i % 3 === 1 ? "h-80" : "h-56"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                  <span className="text-primary-foreground font-heading font-semibold text-sm">{img.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
