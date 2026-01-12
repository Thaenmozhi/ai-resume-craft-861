import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Resume<span className="text-accent">AI</span>
            </span>
          </Link>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeAI. Build your future, one resume at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
