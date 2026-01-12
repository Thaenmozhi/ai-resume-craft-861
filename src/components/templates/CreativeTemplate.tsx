import { ResumeData } from '@/types/resume';

interface CreativeTemplateProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const CreativeTemplate = ({ data }: CreativeTemplateProps) => {
  const { personalInfo, education, skills, workExperience, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-900 min-h-[1056px] w-full max-w-[816px] mx-auto shadow-lg" id="resume-content">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-purple-200 text-sm">
              {workExperience[0]?.position || 'Professional'}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-purple-200">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
              {personalInfo.portfolio && <p className="break-all">{personalInfo.portfolio}</p>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-purple-200">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-white/20 text-white text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-purple-200">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-semibold text-sm">{edu.degree}</h3>
                    <p className="text-purple-200 text-xs">{edu.institution}</p>
                    <p className="text-purple-300 text-xs">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-3 text-purple-200">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="font-semibold text-sm">{cert.name}</h3>
                    <p className="text-purple-200 text-xs">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="w-2/3 p-6">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-purple-600 mb-2">About Me</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {workExperience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-bold text-purple-600 mb-3">Experience</h2>
              <div className="space-y-4">
                {workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-purple-200">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-purple-600 rounded-full" />
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-purple-600">{exp.company}</p>
                    <p className="text-xs text-gray-500 mb-2">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-700">{exp.description}</p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc ml-4 text-sm text-gray-700 mt-2 space-y-1">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-600 mb-3">Projects</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="p-3 bg-purple-50 rounded-lg">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-700">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-purple-200 text-purple-800 text-xs rounded"
                          >
                            {tech}
                          </span>
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

export default CreativeTemplate;
