import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ResumeData, TemplateType, FontSettings, SavedResume, defaultResumeData, defaultFontSettings } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  fontSettings: FontSettings;
  setFontSettings: React.Dispatch<React.SetStateAction<FontSettings>>;
  savedResumes: SavedResume[];
  saveResume: (name: string) => void;
  loadResume: (id: string) => void;
  deleteResume: (id: string) => void;
  currentResumeId: string | null;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'resume-builder-saved-resumes';

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [currentStep, setCurrentStep] = useState(0);
  const [fontSettings, setFontSettings] = useState<FontSettings>(defaultFontSettings);
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);

  // Load saved resumes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedResumes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load saved resumes:', e);
      }
    }
  }, []);

  // Persist saved resumes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResumes));
  }, [savedResumes]);

  const saveResume = (name: string) => {
    const newResume: SavedResume = {
      id: currentResumeId || crypto.randomUUID(),
      name,
      data: resumeData,
      template: selectedTemplate,
      fontSettings,
      savedAt: new Date().toISOString(),
    };

    setSavedResumes((prev) => {
      const existingIndex = prev.findIndex((r) => r.id === newResume.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newResume;
        return updated;
      }
      return [...prev, newResume];
    });
    setCurrentResumeId(newResume.id);
  };

  const loadResume = (id: string) => {
    const resume = savedResumes.find((r) => r.id === id);
    if (resume) {
      setResumeData(resume.data);
      setSelectedTemplate(resume.template);
      setFontSettings(resume.fontSettings);
      setCurrentResumeId(id);
      setCurrentStep(0);
    }
  };

  const deleteResume = (id: string) => {
    setSavedResumes((prev) => prev.filter((r) => r.id !== id));
    if (currentResumeId === id) {
      setCurrentResumeId(null);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
        fontSettings,
        setFontSettings,
        savedResumes,
        saveResume,
        loadResume,
        deleteResume,
        currentResumeId,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
