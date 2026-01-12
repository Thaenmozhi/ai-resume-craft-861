import { motion } from 'framer-motion';
import { Sparkles, Layout, Download, Zap, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Content Generation',
    description: 'Let AI write compelling bullet points and summaries tailored to your experience level.',
  },
  {
    icon: Layout,
    title: 'Professional Templates',
    description: 'Choose from modern, classic, and creative designs that stand out to recruiters.',
  },
  {
    icon: Download,
    title: 'Multiple Export Formats',
    description: 'Download your resume as PDF or DOCX, ready for any application platform.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Build a complete, polished resume in minutes, not hours.',
  },
  {
    icon: Shield,
    title: 'ATS-Friendly',
    description: 'Optimized formats that pass through Applicant Tracking Systems.',
  },
  {
    icon: Users,
    title: 'For All Experience Levels',
    description: 'Perfect for freshers and experienced professionals alike.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="text-gradient"> Stand Out</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform helps you create professional resumes that get noticed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
