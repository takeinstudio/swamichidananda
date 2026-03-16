import ScrollReveal from "./ScrollReveal";
import { Bell, Megaphone, FileText, CalendarCheck } from "lucide-react";

const announcements = [
  { icon: Megaphone, title: "Admissions Open 2026-27", date: "March 15, 2026", desc: "Applications are now being accepted for all UG, PG, and PhD programs for the academic year 2026-27.", type: "Admission" },
  { icon: CalendarCheck, title: "National Seminar Registration", date: "March 20, 2026", desc: "Register now for the National Seminar on Social Policy scheduled for March 28, 2026.", type: "Seminar" },
  { icon: FileText, title: "End Semester Examination Schedule", date: "March 10, 2026", desc: "The examination schedule for the odd semester has been published. Check the student portal.", type: "Exam" },
  { icon: Bell, title: "Holi Holiday Notice", date: "March 12, 2026", desc: "The institute will remain closed on March 14, 2026 on account of Holi festival.", type: "Holiday" },
  { icon: Megaphone, title: "Campus Placement Drive", date: "March 5, 2026", desc: "Leading NGOs and social enterprises will be visiting campus for recruitment on April 5.", type: "News" },
];

const Announcements = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Notice Board</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Announcements & <span className="gradient-text">Notifications</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Ticker */}
        <ScrollReveal>
          <div className="overflow-hidden rounded-2xl gradient-primary-bg px-6 py-4 mb-12">
            <div className="flex notification-ticker whitespace-nowrap">
              {[...announcements, ...announcements].map((a, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-primary-foreground text-sm font-medium mx-8">
                  <Bell className="w-4 h-4 flex-shrink-0" /> {a.title}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-4 max-w-4xl mx-auto">
          {announcements.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="glass-card-hover p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mb-1">{a.type}</span>
                      <h3 className="font-heading font-bold text-foreground">{a.title}</h3>
                    </div>
                    <span className="text-muted-foreground text-xs whitespace-nowrap">{a.date}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">{a.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
