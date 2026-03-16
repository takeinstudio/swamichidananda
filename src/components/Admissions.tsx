import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { CheckCircle, ArrowRight, Send } from "lucide-react";

const steps = [
  { step: "01", title: "Apply Online", desc: "Fill the admission form with your details" },
  { step: "02", title: "Submit Documents", desc: "Upload required documents for verification" },
  { step: "03", title: "Counseling", desc: "Attend a counseling session with faculty" },
  { step: "04", title: "Confirmation", desc: "Receive your admission confirmation letter" },
];

const programs = [
  "BA Political Science", "BA Sociology", "BA Economics", "BA History",
  "MA Political Science", "MA Sociology", "MA Social Work", "MA Economics",
  "PhD Social Sciences", "Diploma in Social Work", "Certificate in Human Rights",
];

const Admissions = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="admissions" className="section-padding bg-muted/30">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Join Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Admission <span className="gradient-text">Process</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((s, i) => (
            <ScrollReveal key={s.step} delay={i * 0.1}>
              <div className="glass-card-hover p-6 text-center relative">
                <div className="text-4xl font-heading font-extrabold gradient-text mb-3">{s.step}</div>
                <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-secondary z-10" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Form */}
        <ScrollReveal>
          <div className="max-w-2xl mx-auto glass-card p-8 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-heading font-bold text-foreground text-xl mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground text-sm">Thank you for your interest. Our admissions team will contact you within 48 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="font-heading font-bold text-foreground text-xl mb-6 text-center">Apply for Admission</h3>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid sm:grid-cols-2 gap-5">
                  <input required placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="State" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="City" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <select required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Program Interested</option>
                    {programs.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <textarea placeholder="Your Message (optional)" rows={3} className="sm:col-span-2 w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                  <button type="submit" className="sm:col-span-2 btn-secondary">
                    <Send className="w-4 h-4 mr-2" /> Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Admissions;
