import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Cloud, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useResume } from '@/context/ResumeContext';
import FileUploadZone from '@/components/import/FileUploadZone';
import { parseResume, mergeWithDefaults, getSupportedFileType } from '@/utils/resumeParser';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ImportResume = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setResumeData, setCurrentStep, setIsImported } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file type
    const fileType = getSupportedFileType(file);
    if (!fileType) {
      setError('Unsupported file type. Please upload a DOC, DOCX, PDF, HTML, RTF, or TXT file.');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Maximum file size is 5MB.');
      return;
    }

    setIsLoading(true);

    try {
      const parsedData = await parseResume(file);
      const completeData = mergeWithDefaults(parsedData);
      
      // Set resume data and mark as imported - this ensures template selection won't reset it
      setResumeData(completeData);
      setIsImported(true);
      setCurrentStep(0);

      toast({
        title: 'Resume imported successfully!',
        description: 'Your resume data has been extracted. Review and edit as needed.',
      });

      navigate('/builder');
    } catch (err) {
      console.error('Error parsing resume:', err);
      setError('Failed to parse resume. Please try a different file or format.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-8 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>

            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How do you want to upload your resume?
              </h1>
              <p className="text-lg text-muted-foreground">
                Just review, edit, and update it with new information
              </p>
            </div>

            <Card className="p-8 mb-8">
              <FileUploadZone
                onFileSelect={handleFileSelect}
                isLoading={isLoading}
                error={error}
              />
            </Card>

            {/* Integration placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 gap-3"
                disabled
              >
                <Cloud className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Google Drive</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 gap-3"
                disabled
              >
                <HardDrive className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Dropbox</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ImportResume;
