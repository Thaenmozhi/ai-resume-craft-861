import { useResume } from '@/context/ResumeContext';
import { availableFonts } from '@/types/resume';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Type } from 'lucide-react';

const FontSelector = () => {
  const { fontSettings, setFontSettings } = useResume();

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-2">
        <Type className="w-4 h-4 text-primary" />
        <h4 className="font-medium text-foreground">Font Customization</h4>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heading-font">Heading Font</Label>
          <Select
            value={fontSettings.headingFont}
            onValueChange={(value) =>
              setFontSettings((prev) => ({ ...prev, headingFont: value }))
            }
          >
            <SelectTrigger id="heading-font" className="w-full">
              <SelectValue placeholder="Select heading font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="body-font">Body Font</Label>
          <Select
            value={fontSettings.bodyFont}
            onValueChange={(value) =>
              setFontSettings((prev) => ({ ...prev, bodyFont: value }))
            }
          >
            <SelectTrigger id="body-font" className="w-full">
              <SelectValue placeholder="Select body font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-4 p-3 bg-background rounded border border-border">
        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
        <h5 
          className="text-lg font-bold text-foreground"
          style={{ fontFamily: fontSettings.headingFont }}
        >
          Heading Example
        </h5>
        <p 
          className="text-sm text-muted-foreground"
          style={{ fontFamily: fontSettings.bodyFont }}
        >
          Body text example - This is how your resume content will appear.
        </p>
      </div>
    </div>
  );
};

export default FontSelector;
