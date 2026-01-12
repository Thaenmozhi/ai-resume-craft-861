import { useResume } from '@/context/ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certification } from '@/types/resume';

const CertificationsForm = () => {
  const { resumeData, setResumeData } = useResume();
  const { certifications } = resumeData;

  const addCertification = () => {
    const newCertification: Certification = {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      link: '',
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <AnimatePresence>
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl border border-border bg-card/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <Award className="w-4 h-4 text-accent" />
                Certification {index + 1}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(cert.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Certification Name</Label>
                <Input
                  placeholder="AWS Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Issuing Organization</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Date Obtained</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Credential URL (Optional)</Label>
                <Input
                  placeholder="https://..."
                  value={cert.link}
                  onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addCertification}
        className="w-full gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </Button>
    </motion.div>
  );
};

export default CertificationsForm;
