import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Save, FolderOpen, Trash2, FileText, Plus, Clock 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const SavedResumesPanel = () => {
  const { 
    savedResumes, 
    saveResume, 
    loadResume, 
    deleteResume, 
    currentResumeId,
    resumeData 
  } = useResume();
  const [saveName, setSaveName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  const handleSave = () => {
    if (saveName.trim()) {
      saveResume(saveName.trim());
      setSaveName('');
      setSaveDialogOpen(false);
    }
  };

  const handleLoad = (id: string) => {
    loadResume(id);
    setLoadDialogOpen(false);
  };

  const currentResumeName = savedResumes.find(r => r.id === currentResumeId)?.name;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/30 rounded-lg border border-border">
      {/* Current Resume Indicator */}
      {currentResumeId && currentResumeName && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm">
          <FileText className="w-3.5 h-3.5" />
          <span className="font-medium">{currentResumeName}</span>
        </div>
      )}

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            {currentResumeId ? 'Update' : 'Save'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentResumeId ? 'Update Resume' : 'Save Resume'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resume-name">Resume Name</Label>
              <Input
                id="resume-name"
                placeholder="e.g., Software Engineer Resume"
                value={saveName || currentResumeName || resumeData.personalInfo.fullName || ''}
                onChange={(e) => setSaveName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {currentResumeId ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FolderOpen className="w-4 h-4" />
            Load
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Load Existing Resume</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {savedResumes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No saved resumes yet</p>
                <p className="text-sm mt-1">Save your current resume to see it here</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {savedResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border transition-colors',
                      resume.id === currentResumeId
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    <button
                      className="flex-1 text-left"
                      onClick={() => handleLoad(resume.id)}
                    >
                      <p className="font-medium text-foreground">{resume.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {format(new Date(resume.savedAt), 'MMM d, yyyy h:mm a')}
                      </div>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteResume(resume.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* New Resume Button */}
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Plus className="w-4 h-4" />
        New
      </Button>
    </div>
  );
};

export default SavedResumesPanel;
