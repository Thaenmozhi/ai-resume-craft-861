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
  const { resumeData, selectedTemplate, fontSettings } = useResume();

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
    <div className="w-full overflow-auto bg-muted p-4 rounded-xl">
      <div 
        className="transform scale-[0.6] origin-top-left lg:scale-75 xl:scale-90"
        style={{
          '--resume-heading-font': fontSettings.headingFont,
          '--resume-body-font': fontSettings.bodyFont,
        } as React.CSSProperties}
      >
        <style>{`
          #resume-content h1, 
          #resume-content h2, 
          #resume-content h3, 
          #resume-content h4 {
            font-family: var(--resume-heading-font), system-ui, sans-serif !important;
          }
          #resume-content p, 
          #resume-content span, 
          #resume-content li,
          #resume-content div:not(:has(h1)):not(:has(h2)):not(:has(h3)):not(:has(h4)) {
            font-family: var(--resume-body-font), system-ui, sans-serif;
          }
        `}</style>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
