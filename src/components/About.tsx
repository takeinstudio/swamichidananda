import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { Target, Eye, Award, BookOpen, HeartPulse, Users, Building2, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-max">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mt-3 mb-6">
              Shaping Future <span className="gradient-text">Social Scientists</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Swami Chidananda Institute of Social Sciences is a private, un-aided educational institution
              in Bhubaneswar, Odisha. Established in 2019, it is affiliated to the Utkal University of Culture and
              is dedicated to nurturing scholars, thinkers, and leaders who drive positive social change through the
              study and application of social sciences.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission / Vision / Excellence / Research */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Target, title: "Our Mission", desc: "To provide transformative education in social sciences that empowers students to become responsible citizens and community leaders, rooted in the philosophy of Swami Chidananda Saraswati." },
            { icon: Eye, title: "Our Vision", desc: "To be a nationally recognized center of excellence for social science education, research, and innovation in alignment with UGC and Utkal University guidelines." },
            { icon: Award, title: "Academic Excellence", desc: "Recognized private institution under the Utkal University of Culture with academic collaborations with Sri Sri University and Sivananda Yoga Vedanta Academy." },
            { icon: BookOpen, title: "Research Focus", desc: "Encouraging original research addressing contemporary social challenges, holistic health practices, and yoga education across Odisha." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <ScrollReveal key={title} delay={i * 0.1}>
              <div className="glass-card-hover p-8 h-full">
                <div className="w-12 h-12 rounded-xl gradient-primary-bg flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: 500, suffix: "+", label: "Students Enrolled" },
              { value: 25, suffix: "+", label: "Expert Faculty" },
              { value: 15, suffix: "+", label: "Programs Offered" },
              { value: 95, suffix: "%", label: "Placement Rate" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="glass-card p-6 text-center">
                <div className="text-3xl sm:text-4xl font-heading font-extrabold gradient-text mb-2">
                  <AnimatedCounter end={value} suffix={suffix} />
                </div>
                <p className="text-muted-foreground text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Institutional Focus */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Institutional Focus</span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-2">
                Our <span className="gradient-text">Core Pillars</span>
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="glass-card p-7 h-full flex gap-5">
                  <div className="w-12 h-12 rounded-xl gradient-secondary-bg flex items-center justify-center flex-shrink-0">
                    <HeartPulse className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-lg mb-2">Holistic Health &amp; Yoga</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Swami Chidananda Institute of Social Sciences maintains a strong partnership with the <strong className="text-foreground">Sivananda Yoga Vedanta Academy</strong> to
                      promote yoga research and holistic well-being. The institute champions integrated education
                      that nurtures mind, body, and spirit alongside academic excellence.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.1}>
                <div className="glass-card p-7 h-full flex gap-5">
                  <div className="w-12 h-12 rounded-xl gradient-primary-bg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-lg mb-2">Social Empowerment</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Inspired by the <strong className="text-foreground">Swami Chidananda Mission</strong>, the institute provides quality
                      education and health services to the needy, extending <strong className="text-foreground">scholarships to bright but
                      underprivileged students</strong> to ensure inclusive access to higher education.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Affiliated Network */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-sm font-heading font-semibold text-secondary uppercase tracking-wider">Our Network</span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mt-2">
              Affiliated <span className="gradient-text">Institutions</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HeartPulse,
                name: "Swami Chidananda Institute of Medical Science",
                location: "Mahanga, Cuttack",
                desc: "A 30-bed multidisciplinary hospital serving as the mission's healthcare wing, providing medical services to rural and underprivileged communities.",
              },
              {
                icon: GraduationCap,
                name: "Sivananda Yoga Vedanta Academy",
                location: "Bhubaneswar, Odisha",
                desc: "Academic partner promoting yoga research, holistic health education, and collaborative research programmes with Swami Chidananda Institute of Social Sciences.",
              },
              {
                icon: Building2,
                name: "Sivananda Centenary Boys' School",
                location: "Bhubaneswar, Odisha",
                desc: "A Pace Setting Institute that houses the Swami Chidananda Centre for Yoga and Value Education, providing yoga training for teachers across Odisha.",
              },
            ].map(({ icon: Icon, name, location, desc }, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <div className="glass-card-hover p-7 h-full">
                  <div className="w-11 h-11 rounded-xl gradient-primary-bg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-1">{name}</h4>
                  <p className="text-secondary text-xs font-medium mb-3">{location}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
