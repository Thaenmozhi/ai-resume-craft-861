import { useResume } from '@/context/ResumeContext';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechnicalTemplate from './TechnicalTemplate';
import ElegantTemplate from './ElegantTemplate';
import CompactTemplate from './CompactTemplate';

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'minimalist':
        return <MinimalistTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'technical':
        return <TechnicalTemplate data={resumeData} />;
      case 'elegant':
        return <ElegantTemplate data={resumeData} />;
      case 'compact':
        return <CompactTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="w-full h-full min-h-[600px] overflow-auto bg-muted p-2 rounded-xl flex items-start justify-center">
      <div className="transform scale-[0.48] origin-top md:scale-[0.55] lg:scale-[0.65] xl:scale-[0.75] 2xl:scale-[0.85]">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
