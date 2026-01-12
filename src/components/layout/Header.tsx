import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isHome ? 'bg-transparent' : 'glass'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Resume<span className="text-accent">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {location.pathname !== '/builder' && (
              <Link to="/builder">
                <Button variant="hero" size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Build Resume
                </Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
