import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ResumeData, TemplateType, defaultResumeData } from '@/types/resume';

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: TemplateType;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isImported: boolean;
  setIsImported: React.Dispatch<React.SetStateAction<boolean>>;
  resetToDefault: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [currentStep, setCurrentStep] = useState(0);
  const [isImported, setIsImported] = useState(false);

  const resetToDefault = useCallback(() => {
    setResumeData(defaultResumeData);
    setSelectedTemplate('modern');
    setCurrentStep(0);
    setIsImported(false);
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        selectedTemplate,
        setSelectedTemplate,
        currentStep,
        setCurrentStep,
        isImported,
        setIsImported,
        resetToDefault,
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
