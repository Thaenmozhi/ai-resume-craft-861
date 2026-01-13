import { ResumeData } from '@/types/resume';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate = ({ data }: ExecutiveTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] font-serif">
      {/* Header with dark background */}
      <header className="bg-slate-800 text-white px-8 py-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-6 text-slate-300 text-sm mt-4">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-amber-400 rounded-full"></span>
              {personalInfo.location}
            </span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8 border-l-4 border-amber-500 pl-6">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {workExperience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{exp.position}</h3>
                      <p className="text-amber-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mt-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-amber-600">{edu.field}</p>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 px-3 py-1 text-sm rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mt-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-slate-200 pb-2">
              Certifications & Awards
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  <div>
                    <span className="font-medium text-slate-900">{cert.name}</span>
                    <span className="text-gray-500 text-sm ml-2">({cert.date})</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
