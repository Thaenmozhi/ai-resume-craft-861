import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FolderGit2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/resume';
import { useState } from 'react';

const ProjectsForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { projects } = resumeData;
  const [techInputs, setTechInputs] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: unknown) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addTechnology = (projectId: string, tech: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
      setTechInputs((prev) => ({ ...prev, [projectId]: '' }));
    }
  };

  const removeTechnology = (projectId: string, tech: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(
        projectId,
        'technologies',
        project.technologies.filter((t) => t !== tech)
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl border border-border bg-card/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <FolderGit2 className="w-4 h-4 text-accent" />
                Project {index + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  placeholder="Project Title"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Project Link (Optional)</Label>
                <Input
                  placeholder="https://github.com/..."
                  value={project.link}
                  onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your project, its purpose, and your role..."
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology..."
                  value={techInputs[project.id] || ''}
                  onChange={(e) => setTechInputs((prev) => ({ ...prev, [project.id]: e.target.value }))}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology(project.id, techInputs[project.id] || '');
                    }
                  }}
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => addTechnology(project.id, techInputs[project.id] || '')}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => removeTechnology(project.id, tech)}
                  >
                    {tech}
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </motion.div>
  );
};

export default ProjectsForm;
