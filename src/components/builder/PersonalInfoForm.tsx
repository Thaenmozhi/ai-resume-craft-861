import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, User, Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const PersonalInfoForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { personalInfo } = resumeData;

  const updateField = (field: keyof typeof personalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const generateSummary = () => {
    // Placeholder for AI generation - will be implemented with Cloud
    const placeholder = `Dynamic professional with a passion for excellence and continuous improvement. Seeking opportunities to leverage skills and contribute to innovative projects in a collaborative environment.`;
    updateField('summary', placeholder);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={personalInfo.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={personalInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            Phone
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={personalInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={personalInfo.location}
            onChange={(e) => updateField('location', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-muted-foreground" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={personalInfo.linkedin}
            onChange={(e) => updateField('linkedin', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio" className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            Portfolio / Website
          </Label>
          <Input
            id="portfolio"
            placeholder="johndoe.com"
            value={personalInfo.portfolio}
            onChange={(e) => updateField('portfolio', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="summary">Professional Summary</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={generateSummary}
            className="text-accent gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Generate with AI
          </Button>
        </div>
        <Textarea
          id="summary"
          placeholder="Write a brief professional summary..."
          value={personalInfo.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          rows={4}
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;
