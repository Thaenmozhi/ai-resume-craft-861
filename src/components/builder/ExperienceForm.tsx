import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkExperience } from '@/types/resume';

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { workExperience } = resumeData;

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    setResumeData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newExperience],
    }));
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: unknown) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((exp) => exp.id !== id),
    }));
  };

  const generateAchievements = (id: string) => {
    // Placeholder for AI generation
    const placeholders = [
      'Led a team of 5 developers to deliver a critical project 2 weeks ahead of schedule',
      'Improved system performance by 40% through code optimization',
      'Implemented automated testing that reduced bugs in production by 60%',
    ];
    updateExperience(id, 'achievements', placeholders);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <AnimatePresence>
        {workExperience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl border border-border bg-card/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Briefcase className="w-4 h-4 text-accent" />
                Experience {index + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  placeholder="Job Title"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="City, Country"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  placeholder={exp.current ? 'Present' : ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Brief description of your role..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Key Achievements</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => generateAchievements(exp.id)}
                  className="text-accent gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  Generate with AI
                </Button>
              </div>
              <Textarea
                placeholder="• Led a team of 5 to deliver project ahead of schedule&#10;• Improved performance by 40%"
                value={exp.achievements.join('\n')}
                onChange={(e) => updateExperience(exp.id, 'achievements', e.target.value.split('\n').filter(Boolean))}
                rows={3}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </motion.div>
  );
};

export default ExperienceForm;
