import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileType } from 'lucide-react';
import { toast } from 'sonner';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const ExportButtons = () => {
  const { resumeData } = useResume();

  const exportToPDF = async () => {
    const element = document.getElementById('resume-content');
    if (!element) {
      toast.error('Resume preview not found');
      return;
    }

    toast.loading('Generating PDF...');

    const options = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in' as const, format: 'letter', orientation: 'portrait' as const },
    };

    try {
      await html2pdf().set(options).from(element).save();
      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate PDF');
      console.error(error);
    }
  };

  const exportToDocx = async () => {
    toast.loading('Generating DOCX...');

    try {
      const { personalInfo, education, skills, workExperience, projects, certifications } = resumeData;

      const children: Paragraph[] = [];

      // Name
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.fullName || 'Your Name',
              bold: true,
              size: 48,
            }),
          ],
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        })
      );

      // Contact info
      const contactParts = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.location,
      ].filter(Boolean);
      
      if (contactParts.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: contactParts.join(' | '),
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
          })
        );
      }

      // Links
      const linkParts = [personalInfo.linkedin, personalInfo.portfolio].filter(Boolean);
      if (linkParts.length > 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: linkParts.join(' | '),
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          })
        );
      }

      // Summary
      if (personalInfo.summary) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: personalInfo.summary, size: 22 })],
            spacing: { after: 200 },
          })
        );
      }

      // Experience
      if (workExperience.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'WORK EXPERIENCE', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );

        workExperience.forEach((exp) => {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: exp.position, bold: true, size: 22 })],
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `${exp.company} | ${exp.location || ''}`, italics: true, size: 20 })],
            })
          );
          if (exp.description) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: exp.description, size: 20 })],
                spacing: { after: 100 },
              })
            );
          }
          exp.achievements.forEach((ach) => {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: `• ${ach}`, size: 20 })],
              })
            );
          });
        });
      }

      // Education
      if (education.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'EDUCATION', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );

        education.forEach((edu) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${edu.degree} ${edu.field ? `in ${edu.field}` : ''}`, bold: true, size: 22 }),
              ],
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: edu.institution, size: 20 })],
              spacing: { after: 100 },
            })
          );
        });
      }

      // Skills
      if (skills.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'SKILLS', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: skills.join(', '), size: 20 })],
            spacing: { after: 200 },
          })
        );
      }

      // Projects
      if (projects.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'PROJECTS', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );

        projects.forEach((proj) => {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: proj.name, bold: true, size: 22 })],
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: proj.description, size: 20 })],
              spacing: { after: 100 },
            })
          );
        });
      }

      // Certifications
      if (certifications.length > 0) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: 'CERTIFICATIONS', bold: true, size: 24 })],
            spacing: { before: 200, after: 100 },
          })
        );

        certifications.forEach((cert) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: cert.name, bold: true, size: 22 }),
                new TextRun({ text: ` – ${cert.issuer}`, size: 20 }),
              ],
            })
          );
        });
      }

      const doc = new Document({
        sections: [{ children }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${personalInfo.fullName || 'resume'}.docx`);
      
      toast.dismiss();
      toast.success('DOCX downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate DOCX');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button onClick={exportToPDF} variant="hero" size="lg" className="gap-2">
        <FileText className="w-4 h-4" />
        Download PDF
      </Button>
      <Button onClick={exportToDocx} variant="outline" size="lg" className="gap-2">
        <FileType className="w-4 h-4" />
        Download DOCX
      </Button>
    </div>
  );
};

export default ExportButtons;
