import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Rocket } from 'lucide-react';

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">SpaceTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Tracking humanity's reach for the stars.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/entities" className="text-muted-foreground hover:text-primary">Entities</Link></li>
              <li><Link to="/compare" className="text-muted-foreground hover:text-primary">Compare</Link></li>
              <li><Link to="/news" className="text-muted-foreground hover:text-primary">News</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground">Follow Us</h4>
            <div className="mt-3 flex space-x-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} SpaceTrack. All rights reserved. Data for illustrative purposes only.
        </div>
      </div>
    </footer>
  );
};
export default Footer;