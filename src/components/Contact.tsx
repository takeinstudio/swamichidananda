import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { MapPin, Mail, Phone, Send, Clock, Globe } from "lucide-react";
import { addContactMessage } from "@/lib/siteData";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsappNumber: "",
    subject: "",
    message: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContactMessage({
      name: formData.name.trim(),
      whatsappNumber: formData.whatsappNumber.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    });
    setSubmitted(true);
    setFormData({ name: "", whatsappNumber: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Contact <span className="gradient-text">Us</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="space-y-4">
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl gradient-primary-bg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Address</h3>
                  <p className="text-muted-foreground text-sm">F-115, Goutam Nagar, Bhubaneswar, Odisha – 751014</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Khordha District, Odisha</p>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl gradient-secondary-bg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Email</h3>
                  <a href="mailto:info@syvacademy.com" className="text-accent text-sm hover:underline">info@syvacademy.com</a>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground text-sm">+91 XXXXX XXXXX</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-primary-bg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-0.5">Hours</h3>
                    <p className="text-muted-foreground text-xs">Mon – Sat</p>
                    <p className="text-muted-foreground text-xs">10:00 AM – 6:00 PM</p>
                    <p className="text-muted-foreground text-xs">Closed on Sundays</p>
                  </div>
                </div>
                <div className="glass-card p-5 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-secondary-bg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-0.5">Website</h3>
                    <a href="https://www.syvacademy.com" target="_blank" rel="noopener noreferrer" className="text-accent text-xs hover:underline break-all">www.syvacademy.com</a>
                    <p className="text-muted-foreground text-xs mt-0.5">AISHE Code: C-66170</p>
                  </div>
                </div>
              </div>
              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden h-56 border border-border">
                <iframe
                  title="Swami Chidananda Institute of Social Sciences Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.354!2d85.824!3d20.296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhubaneswar%2C+Odisha!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass-card p-8 sm:p-10 h-fit">
              <h3 className="font-heading font-bold text-foreground text-xl mb-6">Send us a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <input required value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input required type="tel" value={formData.whatsappNumber} onChange={(e) => updateField("whatsappNumber", e.target.value)} placeholder="WhatsApp Number" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <input value={formData.subject} onChange={(e) => updateField("subject", e.target.value)} placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <textarea value={formData.message} onChange={(e) => updateField("message", e.target.value)} placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                <button type="submit" className="btn-primary w-full">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </button>
                {submitted && <p className="text-xs text-secondary">Message received. Our admin team will contact you on WhatsApp.</p>}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
