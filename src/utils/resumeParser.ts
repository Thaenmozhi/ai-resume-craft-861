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

// Generate unique ID for entries
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Extract education entries
const extractEducation = (text: string): Array<{
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}> => {
  const educationSection = text.match(
    /(?:education|academic|qualifications)[:\s]*\n?([\s\S]*?)(?=\n(?:experience|work|employment|skills|projects|certifications|professional)|\n\n\n|$)/i
  );

  if (!educationSection || !educationSection[1]) return [];

  const entries: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }> = [];

  const sectionText = educationSection[1].trim();
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Common degree patterns
  const degreePatterns = [
    /\b(Bachelor(?:'s)?|Master(?:'s)?|Ph\.?D\.?|Doctor(?:ate)?|Associate(?:'s)?|B\.?S\.?|B\.?A\.?|M\.?S\.?|M\.?A\.?|M\.?B\.?A\.?|B\.?E\.?|B\.?Tech|M\.?Tech)\b/i
  ];

  // Date patterns
  const datePattern = /(\d{4})\s*[-–—to]\s*(\d{4}|present|current)/i;
  const singleYearPattern = /\b(20\d{2}|19\d{2})\b/g;

  let currentEntry: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  } | null = null;

  for (const line of lines) {
    // Check for degree pattern - indicates new entry
    let hasDegree = false;
    let degreeMatch = '';
    for (const pattern of degreePatterns) {
      const match = line.match(pattern);
      if (match) {
        hasDegree = true;
        degreeMatch = match[0];
        break;
      }
    }

    // Check for university/institution keywords
    const isInstitution = /\b(university|college|institute|school|academy)\b/i.test(line);

    // Check for dates
    const dateMatch = line.match(datePattern);
    const years = line.match(singleYearPattern);

    // Check for GPA
    const gpaMatch = line.match(/GPA[:\s]*(\d+\.?\d*)/i);

    if (hasDegree || isInstitution) {
      // Start a new entry or update current
      if (!currentEntry) {
        currentEntry = {
          id: generateId(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
        };
      }

      if (isInstitution && !currentEntry.institution) {
        currentEntry.institution = line.replace(datePattern, '').trim();
      }

      if (hasDegree) {
        // Try to extract degree and field
        const parts = line.split(/\s+in\s+/i);
        if (parts.length > 1) {
          currentEntry.degree = parts[0].trim();
          currentEntry.field = parts[1].replace(datePattern, '').trim();
        } else {
          currentEntry.degree = degreeMatch;
          // Rest of line might be field
          const fieldPart = line.replace(degreeMatch, '').replace(datePattern, '').trim();
          if (fieldPart && !currentEntry.field) {
            currentEntry.field = fieldPart.replace(/^[,\s]+|[,\s]+$/g, '');
          }
        }
      }
    }

    // Extract dates for current entry
    if (currentEntry) {
      if (dateMatch) {
        currentEntry.startDate = dateMatch[1];
        currentEntry.endDate = dateMatch[2].toLowerCase() === 'present' || dateMatch[2].toLowerCase() === 'current' 
          ? 'Present' 
          : dateMatch[2];
      } else if (years && years.length >= 2) {
        currentEntry.startDate = years[0];
        currentEntry.endDate = years[1];
      } else if (years && years.length === 1 && !currentEntry.endDate) {
        currentEntry.endDate = years[0];
      }

      if (gpaMatch) {
        currentEntry.gpa = gpaMatch[1];
      }
    }

    // If we have enough info for an entry and hit a blank or new section, save it
    if (currentEntry && currentEntry.institution && currentEntry.degree) {
      // Check if next line might be a new entry
      const nextLineIdx = lines.indexOf(line) + 1;
      if (nextLineIdx < lines.length) {
        const nextLine = lines[nextLineIdx];
        const nextHasDegree = degreePatterns.some(p => p.test(nextLine));
        const nextIsInstitution = /\b(university|college|institute|school|academy)\b/i.test(nextLine);
        
        if (nextHasDegree || nextIsInstitution) {
          entries.push({ ...currentEntry });
          currentEntry = null;
        }
      }
    }
  }

  // Don't forget the last entry
  if (currentEntry && (currentEntry.institution || currentEntry.degree)) {
    entries.push(currentEntry);
  }

  return entries;
};

// Extract work experience entries
const extractWorkExperience = (text: string): Array<{
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}> => {
  const experienceSection = text.match(
    /(?:experience|work history|employment|professional experience|work experience)[:\s]*\n?([\s\S]*?)(?=\n(?:education|skills|projects|certifications|references|languages)|\n\n\n|$)/i
  );

  if (!experienceSection || !experienceSection[1]) return [];

  const entries: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }> = [];

  const sectionText = experienceSection[1].trim();
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // Date patterns
  const datePattern = /(\w+\s+\d{4}|\d{4})\s*[-–—to]\s*(\w+\s+\d{4}|\d{4}|present|current)/i;
  
  // Job title patterns
  const titlePatterns = [
    /\b(manager|engineer|developer|analyst|designer|director|coordinator|specialist|consultant|lead|senior|junior|intern|associate|executive|administrator|architect|scientist)\b/i
  ];

  let currentEntry: {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for date pattern - often indicates new entry
    const dateMatch = line.match(datePattern);
    const hasTitle = titlePatterns.some(p => p.test(line));
    const isCompany = /\b(inc|llc|ltd|corp|company|technologies|solutions|services|group)\b/i.test(line);

    // Check if this line looks like a new job entry
    const isNewEntry = (dateMatch && (hasTitle || isCompany)) || 
                       (hasTitle && i < 3) || 
                       (isCompany && !currentEntry);

    if (isNewEntry || (dateMatch && !currentEntry)) {
      // Save previous entry
      if (currentEntry && (currentEntry.company || currentEntry.position)) {
        entries.push({ ...currentEntry });
      }

      currentEntry = {
        id: generateId(),
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      };
    }

    if (currentEntry) {
      // Extract dates
      if (dateMatch) {
        currentEntry.startDate = dateMatch[1];
        const endDateRaw = dateMatch[2].toLowerCase();
        currentEntry.current = endDateRaw === 'present' || endDateRaw === 'current';
        currentEntry.endDate = currentEntry.current ? 'Present' : dateMatch[2];
      }

      // Try to identify position vs company
      if (hasTitle && !currentEntry.position) {
        currentEntry.position = line.replace(datePattern, '').trim();
      } else if (isCompany && !currentEntry.company) {
        currentEntry.company = line.replace(datePattern, '').trim();
      } else if (!currentEntry.position && !hasTitle && !isCompany && !dateMatch) {
        // Could be position or company on first line
        if (!currentEntry.position) {
          currentEntry.position = line;
        } else if (!currentEntry.company) {
          currentEntry.company = line;
        }
      }

      // Check for bullet points / achievements
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*') || line.match(/^\d+\./)) {
        const achievement = line.replace(/^[•\-*\d.]+\s*/, '').trim();
        if (achievement.length > 10) {
          currentEntry.achievements.push(achievement);
        }
      } else if (currentEntry.position && currentEntry.company && !dateMatch && line.length > 50) {
        // Might be a description
        if (!currentEntry.description) {
          currentEntry.description = line;
        }
      }
    }
  }

  // Don't forget the last entry
  if (currentEntry && (currentEntry.company || currentEntry.position)) {
    entries.push(currentEntry);
  }

  return entries;
};

// Extract projects
const extractProjects = (text: string): Array<{
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}> => {
  const projectsSection = text.match(
    /(?:projects|personal projects|portfolio)[:\s]*\n?([\s\S]*?)(?=\n(?:experience|education|skills|certifications|references|languages)|\n\n\n|$)/i
  );

  if (!projectsSection || !projectsSection[1]) return [];

  const entries: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }> = [];

  const sectionText = projectsSection[1].trim();
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let currentEntry: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  } | null = null;

  for (const line of lines) {
    // Check for URL
    const urlMatch = line.match(/https?:\/\/[^\s]+/);
    
    // Check for technologies (often in parentheses or after colon)
    const techMatch = line.match(/(?:technologies|tech stack|built with|using)[:\s]*(.+)/i);
    
    // Short lines without bullets might be project names
    const isBullet = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
    const isShortLine = line.length < 60 && !isBullet;

    if (isShortLine && !urlMatch && !techMatch && !currentEntry) {
      currentEntry = {
        id: generateId(),
        name: line,
        description: '',
        technologies: [],
      };
    } else if (currentEntry) {
      if (urlMatch) {
        currentEntry.link = urlMatch[0];
      }
      if (techMatch) {
        currentEntry.technologies = techMatch[1].split(/[,•·]/).map(t => t.trim()).filter(t => t.length > 0);
      }
      if (isBullet || line.length > 50) {
        const desc = line.replace(/^[•\-*]+\s*/, '').trim();
        if (!currentEntry.description) {
          currentEntry.description = desc;
        } else {
          currentEntry.description += ' ' + desc;
        }
      }

      // Check if next line might be a new project
      const nextLineIdx = lines.indexOf(line) + 1;
      if (nextLineIdx < lines.length) {
        const nextLine = lines[nextLineIdx];
        const nextIsShort = nextLine.length < 60 && !nextLine.startsWith('•') && !nextLine.startsWith('-');
        if (nextIsShort && !nextLine.match(/https?:\/\//) && !nextLine.match(/technologies|tech/i)) {
          entries.push({ ...currentEntry });
          currentEntry = null;
        }
      }
    }
  }

  if (currentEntry && currentEntry.name) {
    entries.push(currentEntry);
  }

  return entries;
};

// Extract certifications
const extractCertifications = (text: string): Array<{
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}> => {
  const certSection = text.match(
    /(?:certifications?|certificates?|licenses?)[:\s]*\n?([\s\S]*?)(?=\n(?:experience|education|skills|projects|references|languages)|\n\n\n|$)/i
  );

  if (!certSection || !certSection[1]) return [];

  const entries: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }> = [];

  const sectionText = certSection[1].trim();
  const lines = sectionText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  for (const line of lines) {
    // Skip very short lines
    if (line.length < 5) continue;

    // Check for date
    const dateMatch = line.match(/(\d{4}|\w+\s+\d{4})/);
    
    // Check for issuer patterns
    const issuerMatch = line.match(/(?:by|from|issued by|—|–|-)\s*(.+)/i);

    const entry: {
      id: string;
      name: string;
      issuer: string;
      date: string;
      link?: string;
    } = {
      id: generateId(),
      name: line.replace(/(\d{4}|\w+\s+\d{4})/, '').trim(),
      issuer: issuerMatch ? issuerMatch[1].trim() : '',
      date: dateMatch ? dateMatch[1] : '',
    };

    // Clean up name
    entry.name = entry.name.replace(/(?:by|from|issued by|—|–|-)\s*.*/i, '').trim();

    if (entry.name.length > 3) {
      entries.push(entry);
    }
  }

  return entries;
};

export const parseResumeText = (text: string): Partial<ResumeData> => {
  const summary = extractSummary(text);
  const skills = extractSkills(text);
  const education = extractEducation(text);
  const workExperience = extractWorkExperience(text);
  const projects = extractProjects(text);
  const certifications = extractCertifications(text);

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
    education,
    workExperience,
    projects,
    certifications,
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
