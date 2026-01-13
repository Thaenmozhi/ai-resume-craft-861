export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
    location: string;
    summary: string;
  };
  education: Education[];
  skills: string[];
  workExperience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'minimalist' | 'executive' | 'technical' | 'elegant' | 'compact';

export interface FontSettings {
  headingFont: string;
  bodyFont: string;
}

export interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  template: TemplateType;
  fontSettings: FontSettings;
  savedAt: string;
}

export const availableFonts = [
  { value: 'Inter', label: 'Inter (Sans-serif)', category: 'sans-serif' },
  { value: 'Georgia', label: 'Georgia (Serif)', category: 'serif' },
  { value: 'Playfair Display', label: 'Playfair Display (Classic)', category: 'serif' },
  { value: 'Roboto', label: 'Roboto (Modern)', category: 'sans-serif' },
  { value: 'Lora', label: 'Lora (Elegant)', category: 'serif' },
  { value: 'Open Sans', label: 'Open Sans (Clean)', category: 'sans-serif' },
  { value: 'Merriweather', label: 'Merriweather (Traditional)', category: 'serif' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro (Professional)', category: 'sans-serif' },
];

export const defaultFontSettings: FontSettings = {
  headingFont: 'Inter',
  bodyFont: 'Inter',
};

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    location: '',
    summary: '',
  },
  education: [],
  skills: [],
  workExperience: [],
  projects: [],
  certifications: [],
};
