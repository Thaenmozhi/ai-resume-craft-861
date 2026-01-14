import * as mammoth from 'mammoth';
import * as pdfjs from 'pdfjs-dist';
import { ResumeData, defaultResumeData } from '@/types/resume';

// Set PDF.js worker - use unpkg for v5.x compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type SupportedFileType = 'pdf' | 'docx' | 'doc' | 'txt' | 'rtf' | 'html';

export const getSupportedFileType = (file: File): SupportedFileType | null => {
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type;

  if (extension === 'pdf' || mimeType === 'application/pdf') return 'pdf';
  if (extension === 'docx' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
  if (extension === 'doc' || mimeType === 'application/msword') return 'doc';
  if (extension === 'txt' || mimeType === 'text/plain') return 'txt';
  if (extension === 'rtf' || mimeType === 'application/rtf') return 'rtf';
  if (extension === 'html' || extension === 'htm' || mimeType === 'text/html') return 'html';
  
  return null;
};

const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};

const extractTextFromDOCX = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const extractTextFromTextFile = async (file: File): Promise<string> => {
  return await file.text();
};

const extractTextFromHTML = async (file: File): Promise<string> => {
  const html = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = getSupportedFileType(file);
  
  if (!fileType) {
    throw new Error('Unsupported file type');
  }

  switch (fileType) {
    case 'pdf':
      return await extractTextFromPDF(file);
    case 'docx':
      return await extractTextFromDOCX(file);
    case 'doc':
      // DOC files are harder to parse in browser, try as text
      return await extractTextFromTextFile(file);
    case 'txt':
    case 'rtf':
      return await extractTextFromTextFile(file);
    case 'html':
      return await extractTextFromHTML(file);
    default:
      throw new Error('Unsupported file type');
  }
};

// Parsing helpers
const extractEmail = (text: string): string => {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
};

const extractPhone = (text: string): string => {
  const phoneRegex = /(\+?1?[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
};

const extractLinkedIn = (text: string): string => {
  const linkedinRegex = /(?:linkedin\.com\/in\/|linkedin:?\s*)([a-zA-Z0-9-]+)/i;
  const match = text.match(linkedinRegex);
  return match ? `linkedin.com/in/${match[1]}` : '';
};

const extractName = (text: string): string => {
  // Try to get first line as name (common resume format)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // Check if it looks like a name (2-4 words, no special chars)
    if (/^[A-Za-z\s]{2,50}$/.test(firstLine) && firstLine.split(/\s+/).length <= 4) {
      return firstLine;
    }
  }
  return '';
};

const extractSummary = (text: string): string => {
  const summaryPatterns = [
    /(?:summary|profile|objective|about me)[:\s]*\n?([\s\S]*?)(?=\n(?:experience|education|skills|work|employment|projects)|\n\n)/i,
  ];
  
  for (const pattern of summaryPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim().slice(0, 500);
    }
  }
  return '';
};

const extractSkills = (text: string): string[] => {
  const skillsPatterns = [
    /(?:skills|technical skills|core competencies)[:\s]*\n?([\s\S]*?)(?=\n(?:experience|education|work|employment|projects|certifications)|\n\n)/i,
  ];
  
  for (const pattern of skillsPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const skillsText = match[1].trim();
      // Split by common delimiters
      const skills = skillsText
        .split(/[,•·\n|]/)
        .map(s => s.trim())
        .filter(s => s.length > 0 && s.length < 50);
      return skills.slice(0, 20);
    }
  }
  return [];
};

const extractLocation = (text: string): string => {
  // Common location patterns
  const locationPatterns = [
    /([A-Za-z\s]+,\s*[A-Z]{2}(?:\s+\d{5})?)/,
    /([A-Za-z\s]+,\s*[A-Za-z\s]+(?:,\s*[A-Za-z\s]+)?)/,
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }
  return '';
};

export const parseResumeText = (text: string): Partial<ResumeData> => {
  const summary = extractSummary(text);
  const skills = extractSkills(text);

  const personalInfo = {
    fullName: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    location: extractLocation(text),
    linkedin: extractLinkedIn(text),
    portfolio: '',
    summary: summary,
  };

  return {
    personalInfo,
    skills,
    // Return empty arrays for sections that need manual input
    education: [],
    workExperience: [],
    projects: [],
    certifications: [],
  };
};

export const parseResume = async (file: File): Promise<Partial<ResumeData>> => {
  const text = await extractTextFromFile(file);
  return parseResumeText(text);
};

export const mergeWithDefaults = (parsed: Partial<ResumeData>): ResumeData => {
  return {
    ...defaultResumeData,
    ...parsed,
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...parsed.personalInfo,
    },
  };
};
