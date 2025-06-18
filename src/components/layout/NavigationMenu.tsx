import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile menu
import { Menu, Rocket, BarChart3, Newspaper, UserCircle } from 'lucide-react'; // Example icons

interface NavLinkItem {
  href: string;
  label: string;
  icon?: React.ElementType;
}

const navLinks: NavLinkItem[] = [
  { href: '/', label: 'Home' },
  { href: '/entities', label: 'Entities', icon: Rocket }, // Example, replace with actual page
  { href: '/compare', label: 'Compare', icon: BarChart3 },
  { href: '/news', label: 'News', icon: Newspaper },
];

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu. Mobile open:", isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          {/* Replace with your Logo/Site Name */}
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">SpaceTrack</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Placeholder for User Auth / Profile */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard"> {/* Or login page */}
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Rocket className="h-6 w-6 text-primary" />
                  <span>SpaceTrack</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
export default NavigationMenu;