import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";
import {
  Target, Eye, Award, BookOpen, ArrowRight,
  GraduationCap, BookMarked, FlaskConical, Library,
  Wifi, Utensils, Dumbbell, Mic, Building2, HeartPulse,
  Calendar,
} from "lucide-react";
import { EventItem, FacultyMember, getSiteData } from "@/lib/siteData";

const stats = [
  { value: 500, suffix: "+", label: "Students Enrolled" },
  { value: 25, suffix: "+", label: "Expert Faculty" },
  { value: 15, suffix: "+", label: "Programs Offered" },
  { value: 95, suffix: "%", label: "Placement Rate" },
];

const programs = [
  { title: "Undergraduate", sub: "BA Programs", duration: "3 Years", icon: BookOpen, color: "gradient-primary-bg" },
  { title: "Postgraduate", sub: "MA Programs", duration: "2 Years", icon: GraduationCap, color: "gradient-secondary-bg" },
  { title: "Doctoral", sub: "PhD Programs", duration: "3–5 Years", icon: FlaskConical, color: "bg-accent" },
  { title: "Diploma", sub: "Certificate Courses", duration: "1–2 Years", icon: BookMarked, color: "gradient-primary-bg" },
];

const facilities = [
  { icon: Library, label: "Library" },
  { icon: Building2, label: "Hostels" },
  { icon: Dumbbell, label: "Sports Complex" },
  { icon: Utensils, label: "Cafeteria" },
  { icon: Wifi, label: "WiFi Campus" },
  { icon: Mic, label: "Auditorium" },
  { icon: HeartPulse, label: "Medical Center" },
  { icon: FlaskConical, label: "Laboratories" },
];

const testimonials = [
  { quote: "Swami Chidananda Institute of Social Sciences has been instrumental in shaping my career in social work. The research-oriented approach made my learning truly transformative.", name: "Ananya Pradhan", program: "MA Sociology, 2024", initials: "AP" },
  { quote: "The campus environment, supportive faculty, and practical exposure through seminars prepared me well for public administration.", name: "Rahul Behera", program: "BA Political Science, 2023", initials: "RB" },
];

const Index = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const data = getSiteData();
    setFaculty(data.faculties.slice(0, 4));
    setEvents(data.events.slice(0, 3));
  }, []);

  return (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />

    {/* ── About ─────────────────────────────────────── */}
    <section className="section-padding bg-background">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <ScrollReveal direction="left">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-2 mb-3">
              Shaping Future <span className="gradient-text">Social Scientists</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
              Swami Chidananda Institute of Social Sciences is a premier institution affiliated to
              Utkal University of Culture, Bhubaneswar. Established in 2019, Swami Chidananda Institute of Social Sciences nurtures scholars,
              thinkers, and leaders who drive positive social change.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {stats.map(({ value, suffix, label }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-heading font-extrabold gradient-text">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Target, title: "Our Mission", desc: "Transformative education empowering responsible citizens and community leaders." },
                { icon: Eye, title: "Our Vision", desc: "Nationally recognized center of excellence for social science education." },
                { icon: Award, title: "Excellence", desc: "Curriculum aligned with UGC standards and Utkal University guidelines." },
                { icon: BookOpen, title: "Research", desc: "Original research addressing contemporary social challenges." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 0.1}>
                  <div className="glass-card-hover p-4 h-full">
                    <div className="w-8 h-8 rounded-lg gradient-primary-bg flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h4 className="font-heading font-bold text-foreground text-sm mb-1">{title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* ── Programs ──────────────────────────────────── */}
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Academics</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-1">
                Our <span className="gradient-text">Programs</span>
              </h2>
            </div>
            <Link to="/programs" className="hidden sm:inline-flex items-center gap-1 text-sm text-secondary hover:underline font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map(({ title, sub, duration, icon: Icon, color }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <Link to="/programs" className="glass-card-hover p-5 flex flex-col group h-full">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-0.5">{title}</h3>
                <p className="text-secondary text-sm font-medium mb-0.5">{sub}</p>
                <p className="text-muted-foreground text-xs mb-3">{duration}</p>
                <span className="mt-auto text-xs text-secondary inline-flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
                  Apply Now <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="text-center mt-6 sm:hidden">
          <Link to="/programs" className="btn-outline text-sm">View All Programs</Link>
        </div>
      </div>
    </section>

    {/* ── Faculty ───────────────────────────────────── */}
    <section className="section-padding bg-background">
      <div className="container-max">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Our Team</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-1">
                Expert <span className="gradient-text">Faculty</span>
              </h2>
            </div>
            <Link to="/faculty" className="hidden sm:inline-flex items-center gap-1 text-sm text-secondary hover:underline font-medium">
              Meet All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {faculty.map(({ name, designation, specialization }, i) => (
            <ScrollReveal key={name} delay={i * 0.1}>
              <Link to="/faculty" className="glass-card-hover p-4 text-center block group">
                <div className="w-12 h-12 rounded-full gradient-primary-bg flex items-center justify-center mx-auto mb-2 text-primary-foreground font-heading font-bold text-base group-hover:scale-105 transition-transform">
                  {name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
                </div>
                <h4 className="font-heading font-bold text-foreground text-sm">{name}</h4>
                <p className="text-secondary text-xs mt-0.5 mb-0.5">{designation}</p>
                <p className="text-muted-foreground text-xs">{specialization}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Facilities ────────────────────────────────── */}
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Campus Life</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-1">
                World-Class <span className="gradient-text">Facilities</span>
              </h2>
            </div>
            <Link to="/facilities" className="hidden sm:inline-flex items-center gap-1 text-sm text-secondary hover:underline font-medium">
              Explore <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {facilities.map(({ icon: Icon, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <Link to="/facilities" className="glass-card-hover p-4 flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl gradient-secondary-bg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{label}</span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Events ────────────────────────────────────── */}
    <section className="section-padding bg-background">
      <div className="container-max">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">What's On</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-1">
                Upcoming <span className="gradient-text">Events</span>
              </h2>
            </div>
            <Link to="/events" className="hidden sm:inline-flex items-center gap-1 text-sm text-secondary hover:underline font-medium">
              All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-4">
          {events.map(({ type, title, date, speaker }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className="glass-card-hover p-5 flex flex-col gap-2 h-full">
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{type}</span>
                <h4 className="font-heading font-bold text-foreground">{title}</h4>
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Calendar className="w-3.5 h-3.5" /> {date}
                </div>
                <p className="text-muted-foreground text-xs">{speaker}</p>
                <Link to="/events" className="mt-auto text-xs text-secondary inline-flex items-center gap-1 hover:gap-2 transition-all font-medium">
                  Register <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Admissions CTA ────────────────────────────── */}
    <section className="py-10 lg:py-14 px-4 sm:px-6 lg:px-8 gradient-primary-bg">
      <div className="container-max text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground mb-3">
            Begin Your Academic Journey
          </h2>
          <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Applications are open for 2026–27. Join hundreds of scholars shaping the future of social sciences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions" className="btn-secondary inline-flex items-center justify-center gap-2">
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* ── Testimonials ──────────────────────────────── */}
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Student Stories</span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mt-1">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map(({ quote, name, program, initials }, i) => (
            <ScrollReveal key={name} delay={i * 0.15}>
              <div className="glass-card p-5 relative h-full">
                <div className="text-4xl text-secondary/30 font-serif font-bold absolute top-3 left-5 leading-none select-none">"</div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 mt-5">{quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-secondary-bg flex items-center justify-center text-primary-foreground font-heading font-bold text-sm flex-shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">{name}</p>
                    <p className="text-muted-foreground text-xs">{program}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
  );
};

export default Index;
