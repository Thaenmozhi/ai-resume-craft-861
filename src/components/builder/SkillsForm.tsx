import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
  'SQL', 'Git', 'AWS', 'Docker', 'REST APIs',
  'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
];

const SkillsForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex gap-2">
        <Input
          placeholder="Type a skill and press Enter"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          type="button"
          onClick={() => addSkill(newSkill)}
          disabled={!newSkill.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Your skills:</p>
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Badge
                  variant="secondary"
                  className="gap-1 py-1.5 px-3 cursor-pointer hover:bg-destructive/10"
                  onClick={() => removeSkill(skill)}
                >
                  {skill}
                  <X className="w-3 h-3" />
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
          {skills.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No skills added yet</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-accent" />
          Quick add suggestions:
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills
            .filter((skill) => !skills.includes(skill))
            .slice(0, 10)
            .map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => addSkill(skill)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsForm;
