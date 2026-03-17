import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { CheckCircle, Send } from "lucide-react";
import { addContactMessage } from "@/lib/siteData";

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

const admissionPoster = "/marketing/mark2.jpeg";

const Admissions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    program: "",
    message: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addContactMessage({
      name: formData.fullName.trim(),
      whatsappNumber: formData.phone.trim(),
      subject: `Admission Application - ${formData.program.trim()}`,
      message: [
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        `State: ${formData.state.trim() || "N/A"}`,
        `City: ${formData.city.trim() || "N/A"}`,
        `Program Interested: ${formData.program.trim()}`,
        `Message: ${formData.message.trim() || "N/A"}`,
      ].join("\n"),
    });

    setSubmitted(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      program: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3500);
  };

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

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Process and Form */}
          <div>
            {/* Steps */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {steps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 0.1}>
                  <div className="glass-card-hover p-6 text-center">
                    <div className="text-4xl font-heading font-extrabold gradient-text mb-3">{s.step}</div>
                    <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Form */}
            <ScrollReveal>
              <div className="glass-card p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                    <h3 className="font-heading font-bold text-foreground text-xl mb-2">Application Submitted!</h3>
                    <p className="text-muted-foreground text-sm">Thank you for your interest. Our admissions team will contact you within 48 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-foreground text-xl mb-6 text-center">Apply for Admission</h3>
                    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">
                      <input required value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input required type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input required type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input value={formData.state} onChange={(e) => updateField("state", e.target.value)} placeholder="State" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <input value={formData.city} onChange={(e) => updateField("city", e.target.value)} placeholder="City" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                      <select required value={formData.program} onChange={(e) => updateField("program", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Program Interested</option>
                        {programs.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <textarea value={formData.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Your Message (optional)" rows={3} className="sm:col-span-2 w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                      <button type="submit" className="sm:col-span-2 btn-secondary">
                        <Send className="w-4 h-4 mr-2" /> Submit Application
                      </button>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Side - Image */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-lg sticky top-24">
              <img
                src={admissionPoster}
                alt="Admission open poster"
                className="w-full h-auto object-cover object-center"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
