import ScrollReveal from "./ScrollReveal";
import { GraduationCap, BookOpen, FlaskConical, Award, Clock, Users, ArrowRight, Link2 } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: GraduationCap,
    title: "Undergraduate Programs",
    duration: "3-4 Years",
    eligibility: "10+2 from recognized board",
    courses: ["BA in Political Science", "BA in Sociology", "BA in Economics", "BA in History"],
    color: "from-primary to-accent",
  },
  {
    icon: BookOpen,
    title: "Postgraduate Programs",
    duration: "Min 2 Years",
    eligibility: "Graduation in relevant discipline",
    courses: ["MA in Political Science", "MA in Sociology", "MA in Social Work", "MA in Economics"],
    color: "from-secondary to-[hsl(30,100%,65%)]",
  },
  {
    icon: FlaskConical,
    title: "Doctoral Programs (PhD)",
    duration: "3-5 Years",
    eligibility: "PG Degree with NET/SLET",
    courses: ["PhD in Social Sciences", "PhD in Political Science", "PhD in Sociology"],
    color: "from-accent to-primary",
  },
  {
    icon: Award,
    title: "Diploma & Certifications",
    duration: "1-2 Years",
    eligibility: "10th–12th pass (varies by program)",
    courses: ["Diploma in Social Work", "Certificate in Human Rights", "Diploma in Rural Development"],
    color: "from-primary to-secondary",
  },
];

const collaborations = [
  { name: "Utkal University of Culture", role: "Primary Affiliation & Accreditation" },
  { name: "Sri Sri University", role: "Academic Exchange & Collaborative Research" },
  { name: "Sivananda Yoga Vedanta Academy", role: "Yoga Research & Holistic Health Education" },
];

const Programs = () => {
  return (
    <section id="programs" className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Academic <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-muted-foreground text-lg">Choose from a diverse range of programs designed to prepare you for impactful careers in social sciences, yoga, and holistic health.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {programs.map((prog, i) => (
            <ScrollReveal key={prog.title} delay={i * 0.1}>
              <div className="glass-card-hover p-8 h-full group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6`}>
                  <prog.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-4">{prog.title}</h3>
                <div className="flex gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" /> {prog.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" /> {prog.eligibility}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {prog.courses.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
                <Link to="/admissions" className="inline-flex items-center text-sm font-heading font-semibold text-primary group-hover:text-secondary transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Collaborations */}
        <ScrollReveal>
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-secondary-bg flex items-center justify-center flex-shrink-0">
                <Link2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground text-lg">Academic Collaborations</h3>
                <p className="text-muted-foreground text-sm">Institutional partnerships driving excellence in education and research</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {collaborations.map(({ name, role }) => (
                <div key={name} className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="font-heading font-semibold text-foreground text-sm mb-1">{name}</p>
                  <p className="text-muted-foreground text-xs">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Programs;
