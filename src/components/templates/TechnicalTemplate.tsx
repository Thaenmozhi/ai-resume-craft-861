import { ResumeData } from '@/types/resume';

interface TechnicalTemplateProps {
  data: ResumeData;
}

const TechnicalTemplate = ({ data }: TechnicalTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] font-mono text-sm">
      {/* Header */}
      <header className="bg-emerald-900 text-white px-8 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-emerald-300">Software Engineer</p>
          </div>
          <div className="text-right text-sm text-emerald-200 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
            {personalInfo.portfolio && <p>{personalInfo.portfolio}</p>}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-50 p-6 min-h-full">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
                <span className="text-emerald-500">&lt;</span>
                Skills
                <span className="text-emerald-500">/&gt;</span>
              </h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-emerald-600">→</span>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
                <span className="text-emerald-500">&lt;</span>
                Education
                <span className="text-emerald-500">/&gt;</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-gray-900">{edu.degree}</p>
                    <p className="text-gray-600 text-xs">{edu.field}</p>
                    <p className="text-gray-500 text-xs">{edu.institution}</p>
                    <p className="text-emerald-600 text-xs">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
                <span className="text-emerald-500">&lt;</span>
                Certs
                <span className="text-emerald-500">/&gt;</span>
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-gray-900 text-xs">{cert.name}</p>
                    <p className="text-gray-500 text-xs">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                // About
              </h2>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 border-l-4 border-emerald-500">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {workExperience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                // Experience
              </h2>
              <div className="space-y-5">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-emerald-600">{exp.company}</p>
                      </div>
                      <code className="text-xs bg-gray-100 px-2 py-1 text-gray-600">
                        {exp.startDate} - {exp.current ? 'now' : exp.endDate}
                      </code>
                    </div>
                    {exp.achievements.length > 0 && (
                      <ul className="space-y-1 mt-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-700 text-xs flex gap-2">
                            <span className="text-emerald-500">$</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                // Projects
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-4 rounded">
                    <h3 className="font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-gray-600 text-xs mb-2">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <code key={i} className="text-xs bg-emerald-100 text-emerald-700 px-1">
                            {tech}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TechnicalTemplate;
