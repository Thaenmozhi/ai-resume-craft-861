import { ResumeData } from '@/types/resume';

interface CompactTemplateProps {
  data: ResumeData;
}

const CompactTemplate = ({ data }: CompactTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[297mm] p-6 font-sans text-xs leading-tight">
      {/* Header */}
      <header className="flex justify-between items-start border-b-2 border-indigo-600 pb-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.summary && (
            <p className="text-gray-600 mt-1 max-w-md text-xs">{personalInfo.summary}</p>
          )}
        </div>
        <div className="text-right text-gray-600 space-y-0.5">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
          {personalInfo.linkedin && <p className="text-indigo-600">{personalInfo.linkedin}</p>}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-4">
          {/* Experience */}
          {workExperience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase bg-indigo-600 text-white px-2 py-1 mb-2">
                Experience
              </h2>
              <div className="space-y-3">
                {workExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-indigo-900">{exp.position}</h3>
                      <span className="text-gray-500 text-xs">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600">{exp.company}, {exp.location}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-gray-700 mt-1 space-y-0.5">
                        {exp.achievements.slice(0, 3).map((achievement, i) => (
                          <li key={i}>{achievement}</li>
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
              <h2 className="text-xs font-bold uppercase bg-indigo-600 text-white px-2 py-1 mb-2">
                Projects
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 p-2 rounded">
                    <h3 className="font-bold text-indigo-900">{project.name}</h3>
                    <p className="text-gray-600 text-xs">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-indigo-600 text-xs mt-1">
                        {project.technologies.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase bg-indigo-600 text-white px-2 py-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase bg-indigo-600 text-white px-2 py-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-indigo-900">{edu.degree}</p>
                    <p className="text-gray-600">{edu.field}</p>
                    <p className="text-gray-500">{edu.institution}</p>
                    <p className="text-indigo-600">{edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase bg-indigo-600 text-white px-2 py-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-indigo-900">{cert.name}</p>
                    <p className="text-gray-500">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactTemplate;
