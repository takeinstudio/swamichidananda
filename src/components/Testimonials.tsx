import ScrollReveal from "./ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ananya Pradhan", program: "MA Sociology, 2024", text: "Swami Chidananda Institute of Social Sciences has been instrumental in shaping my career in social work. The faculty's dedication and the research-oriented approach made my learning experience truly transformative." },
  { name: "Rahul Behera", program: "BA Political Science, 2023", text: "The campus environment, supportive faculty, and practical exposure through seminars and workshops prepared me well for my career in public administration." },
  { name: "Priyanka Nayak", program: "PhD Social Sciences", text: "The doctoral program at Swami Chidananda Institute of Social Sciences offers an excellent research environment. My supervisors have been incredibly supportive of my work in gender studies and social policy." },
];

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.12}>
              <div className="glass-card-hover p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary-bg flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.program}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
