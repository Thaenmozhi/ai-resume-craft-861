import { useResume } from '@/context/ResumeContext';
import { TemplateType } from '@/types/resume';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const templates: { type: TemplateType; name: string; description: string; gradient: string }[] = [
  {
    type: 'modern',
    name: 'Modern',
    description: 'Clean design with teal accents',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    type: 'classic',
    name: 'Classic',
    description: 'Timeless professional look',
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    type: 'creative',
    name: 'Creative',
    description: 'Bold and distinctive style',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const TemplateSelector = () => {
  const { selectedTemplate, setSelectedTemplate } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <p className="text-muted-foreground">
        Choose a template that best represents your professional style.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.button
            key={template.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTemplate(template.type)}
            className={cn(
              'relative p-4 rounded-xl border-2 transition-all duration-200 text-left',
              selectedTemplate === template.type
                ? 'border-accent bg-accent/5 shadow-glow'
                : 'border-border bg-card hover:border-accent/50'
            )}
          >
            {selectedTemplate === template.type && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-accent-foreground" />
              </motion.div>
            )}

            {/* Template preview */}
            <div className="aspect-[3/4] rounded-lg bg-background border border-border mb-3 p-3 overflow-hidden">
              <div className={`h-8 w-16 rounded bg-gradient-to-r ${template.gradient} mb-3`} />
              <div className="space-y-1.5">
                <div className="h-2 bg-muted rounded w-3/4" />
                <div className="h-1.5 bg-muted rounded w-1/2" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-1.5 bg-muted rounded" />
                <div className="h-1.5 bg-muted rounded w-5/6" />
                <div className="h-1.5 bg-muted rounded w-4/6" />
              </div>
              <div className="mt-4 space-y-2">
                <div className={`h-1.5 rounded bg-gradient-to-r ${template.gradient} w-1/3`} />
                <div className="h-1.5 bg-muted rounded" />
                <div className="h-1.5 bg-muted rounded w-5/6" />
              </div>
            </div>

            <h3 className="font-semibold text-foreground">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TemplateSelector;
