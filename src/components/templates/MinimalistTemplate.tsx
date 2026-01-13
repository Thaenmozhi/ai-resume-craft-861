import { ResumeData } from '@/types/resume';

interface MinimalistTemplateProps {
  data: ResumeData;
}

const MinimalistTemplate = ({ data }: MinimalistTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 p-8 min-h-[297mm] font-sans text-sm leading-relaxed">
      {/* Header */}
      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-1">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600 text-xs mt-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Experience</h2>
          <div className="space-y-5">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-2">{exp.company}{exp.location && `, ${exp.location}`}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
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

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-600 text-xs">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Skills</h2>
          <p className="text-gray-700 text-xs">{skills.join(' • ')}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-gray-700 text-xs">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <span className="text-gray-900">{cert.name}</span>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistTemplate;
