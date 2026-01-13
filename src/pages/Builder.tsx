import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PersonalInfoForm from '@/components/builder/PersonalInfoForm';
import EducationForm from '@/components/builder/EducationForm';
import SkillsForm from '@/components/builder/SkillsForm';
import ExperienceForm from '@/components/builder/ExperienceForm';
import ProjectsForm from '@/components/builder/ProjectsForm';
import CertificationsForm from '@/components/builder/CertificationsForm';
import TemplateSelector from '@/components/builder/TemplateSelector';
import FontSelector from '@/components/builder/FontSelector';
import SavedResumesPanel from '@/components/builder/SavedResumesPanel';
import ResumePreview from '@/components/templates/ResumePreview';
import { useResume } from '@/context/ResumeContext';
import { 
  User, GraduationCap, Wrench, Briefcase, FolderGit2, Award, Layout, 
  ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 0, name: 'Personal Info', icon: User },
  { id: 1, name: 'Education', icon: GraduationCap },
  { id: 2, name: 'Skills', icon: Wrench },
  { id: 3, name: 'Experience', icon: Briefcase },
  { id: 4, name: 'Projects', icon: FolderGit2 },
  { id: 5, name: 'Certifications', icon: Award },
  { id: 6, name: 'Template', icon: Layout },
];

const Builder = () => {
  const navigate = useNavigate();
  const { currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <SkillsForm />;
      case 3:
        return <ExperienceForm />;
      case 4:
        return <ProjectsForm />;
      case 5:
        return <CertificationsForm />;
      case 6:
        return <TemplateSelector />;
      default:
        return <PersonalInfoForm />;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/preview');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Panel - Steps & Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Saved Resumes Panel */}
              <SavedResumesPanel />
              
              {/* Step indicators */}
              <div className="flex flex-wrap gap-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    <step.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{step.name}</span>
                  </button>
                ))}
              </div>

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {steps[currentStep].name}
                </h2>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <Button
                    variant="hero"
                    onClick={handleNext}
                    className="gap-2"
                  >
                    {currentStep === steps.length - 1 ? 'Preview Resume' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Live Preview</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="lg:hidden gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {showPreview ? 'Hide' : 'Show'}
                  </Button>
                </div>
                
                <div className={cn(
                  'lg:block rounded-xl overflow-hidden border border-border',
                  showPreview ? 'block' : 'hidden'
                )}>
                  <ResumePreview />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Builder;
