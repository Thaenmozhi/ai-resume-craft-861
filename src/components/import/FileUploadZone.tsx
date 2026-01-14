import { useState, useCallback } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
  acceptedTypes?: string;
}

const FileUploadZone = ({
  onFileSelect,
  isLoading = false,
  error = null,
  acceptedTypes = '.doc,.docx,.pdf,.html,.rtf,.txt',
}: FileUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-12 transition-all duration-200 text-center',
          isDragOver
            ? 'border-accent bg-accent/5'
            : 'border-border hover:border-accent/50 bg-card',
          error && 'border-destructive',
          isLoading && 'opacity-70 pointer-events-none'
        )}
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="text-muted-foreground">Parsing your resume...</p>
          </div>
        ) : selectedFile && !error ? (
          <div className="flex flex-col items-center gap-4">
            <FileText className="w-12 h-12 text-accent" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-1">
                Drag and drop your resume here
              </p>
              <p className="text-muted-foreground mb-4">or</p>
              <label>
                <input
                  type="file"
                  accept={acceptedTypes}
                  onChange={handleFileInput}
                  className="hidden"
                />
                <Button type="button" variant="outline" asChild>
                  <span className="cursor-pointer">Browse Files</span>
                </Button>
              </label>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Supported formats: DOC, DOCX, PDF, HTML, RTF, TXT
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-4 text-destructive">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
