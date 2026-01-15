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
    <div className="w-full h-full min-h-[500px] bg-muted p-3 rounded-xl flex items-center justify-center overflow-hidden">
      {/* Fixed A4 aspect ratio container - size is FIXED, content scrolls inside */}
      <div 
        className="relative bg-white shadow-lg origin-center"
        style={{
          width: '210mm',
          height: '297mm',
          transform: 'scale(0.35)',
          transformOrigin: 'center center',
        }}
      >
        <div className="absolute inset-0 overflow-auto">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
