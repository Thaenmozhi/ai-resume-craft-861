import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const templates = [
  {
    name: 'Modern',
    description: 'Clean and contemporary design with accent colors',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Classic',
    description: 'Timeless professional layout that never goes out of style',
    color: 'from-gray-600 to-gray-800',
  },
  {
    name: 'Creative',
    description: 'Stand out with bold colors and unique formatting',
    color: 'from-purple-500 to-pink-500',
  },
];

const TemplatesPreview = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect
            <span className="text-gradient"> Template</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional designs crafted to make the right impression.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border shadow-card group-hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-2">
                {/* Template preview mockup */}
                <div className="absolute inset-4 rounded-lg bg-background border border-border p-4">
                  <div className={`h-12 w-24 rounded bg-gradient-to-r ${template.color} mb-4`} />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-2 bg-muted rounded w-1/2" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-2 bg-muted rounded" />
                    <div className="h-2 bg-muted rounded w-5/6" />
                    <div className="h-2 bg-muted rounded w-4/6" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className={`h-2 rounded bg-gradient-to-r ${template.color} w-1/3`} />
                    <div className="h-2 bg-muted rounded" />
                    <div className="h-2 bg-muted rounded w-5/6" />
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors" />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-foreground">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/builder">
            <Button variant="hero" size="lg" className="gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplatesPreview;
