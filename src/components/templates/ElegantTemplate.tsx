import { ResumeData } from '@/types/resume';

interface ElegantTemplateProps {
  data: ResumeData;
}

const ElegantTemplate = ({ data }: ElegantTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] p-10 font-serif">
      {/* Header */}
      <header className="text-center mb-10 border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-light tracking-widest text-gray-800 uppercase mb-4">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center items-center gap-4 text-gray-500 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span className="text-rose-300">✦</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span className="text-rose-300">✦</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="flex justify-center items-center gap-4 text-gray-500 text-sm mt-2">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.linkedin && personalInfo.portfolio && <span className="text-rose-300">✦</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-10 max-w-2xl mx-auto text-center">
          <p className="text-gray-600 leading-relaxed italic">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workExperience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] text-rose-400 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h3 className="font-medium text-gray-900 text-lg">{exp.position}</h3>
                <p className="text-rose-500">{exp.company}</p>
                <p className="text-gray-400 text-sm mb-3">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.achievements.length > 0 && (
                  <ul className="max-w-xl mx-auto text-left space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-600 text-sm pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-rose-300">
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

      <div className="grid grid-cols-3 gap-10">
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-center text-sm uppercase tracking-[0.3em] text-rose-400 mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="text-center">
                  <p className="font-medium text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600 text-sm">{edu.field}</p>
                  <p className="text-gray-400 text-sm">{edu.institution}</p>
                  <p className="text-rose-400 text-xs">{edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-center text-sm uppercase tracking-[0.3em] text-rose-400 mb-6">
              Skills
            </h2>
            <div className="text-center space-y-2">
              {skills.map((skill, index) => (
                <p key={index} className="text-gray-600 text-sm">{skill}</p>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 className="text-center text-sm uppercase tracking-[0.3em] text-rose-400 mb-6">
              Certifications
            </h2>
            <div className="text-center space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-medium text-gray-900 text-sm">{cert.name}</p>
                  <p className="text-gray-400 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-10">
          <h2 className="text-center text-sm uppercase tracking-[0.3em] text-rose-400 mb-6">
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="text-center">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ElegantTemplate;
