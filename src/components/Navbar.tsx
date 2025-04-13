import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { LogOut, Menu, X, LogIn, User as UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState<{ name?: string; username: string; email: string } | null>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for user in localStorage on mount and setup scroll listener
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsMenuOpen(false);
    // Reload page
    window.location.reload();
  };

  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Attempting to navigate to section: ${sectionId}`);
    
    // If we're on the home page, scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      console.log(`On home page, element found: ${!!element}`);
      
      if (element) {
        // Scroll with offset to account for fixed navbar
        const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        // For pricing section, center it in the viewport
        if (sectionId === 'pricing') {
          const windowHeight = window.innerHeight;
          const elementHeight = element.offsetHeight;
          
          // Calculate position to center the element in the viewport
          const scrollPosition = elementPosition - (windowHeight / 2) + (elementHeight / 2);
          
          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
          });
        } else {
          // For other sections, use the regular offset
          window.scrollTo({
            top: elementPosition - navbarHeight - 20, // 20px extra padding
            behavior: 'smooth'
          });
        }
        
        setIsMenuOpen(false);
      } else {
        console.error(`Element with id '${sectionId}' not found on current page`);
      }
    } else {
      // If we're on another page, navigate to home with the section parameter
      console.log(`Not on home page, navigating to /?section=${sectionId}`);
      
      // Store the target section in sessionStorage to access after page load
      sessionStorage.setItem('scrollToSection', sectionId);
      
      // Navigate to the home page with the section parameter
      navigate(`/?section=${sectionId}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If already on home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on another page, navigate to the home page
      navigate('/');
      
      // Clear any stored scroll positions
      sessionStorage.removeItem('scrollToSection');
    }
  };

  const isLoggedIn = !!user;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="logo flex items-center">
            <a href="/" className="flex items-center" onClick={handleLogoClick}>
              <div className="logoImageContainer mr-2">
                {!logoError ? (
                  <img
                    src="/assets/logo.png"
                    alt="AutoCoder Logo"
                    width={scrolled ? 32 : 40}
                    height={scrolled ? 32 : 40}
                    className="logoImage transition-all duration-200"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className={`logoFallback ${scrolled ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-accent/20 flex items-center justify-center transition-all duration-200`}>
                    AC
                  </div>
                )}
              </div>
              {!scrolled && (
                <span className="logoText text-xl font-bold">AutoCoder</span>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav hidden md:flex items-center space-x-6">
            <a 
              href="#pricing" 
              onClick={(e) => handleSectionClick('pricing', e)}
              className={`navLink text-sm font-medium hover:text-accent transition-colors ${
                location.pathname === '/' && location.hash === '#pricing' ? 'text-accent' : 'text-foreground'
              }`}
            >
              Pricing
            </a>
            <a 
              href="#demo" 
              onClick={(e) => handleSectionClick('demo', e)}
              className={`navLink text-sm font-medium hover:text-accent transition-colors ${
                location.pathname === '/' && location.hash === '#demo' ? 'text-accent' : 'text-foreground'
              }`}
            >
              Proofs
            </a>
            <Link 
              to="/help"
              className={`navLink text-sm font-medium hover:text-accent transition-colors ${
                location.pathname === '/help' ? 'text-accent' : 'text-foreground'
              }`}
            >
              Help
            </Link>
          </nav>

          {/* User Actions */}
          <div className="userActions flex items-center space-x-4">
            <Link 
              to="/about"
              className={`navLink text-sm font-medium hover:text-accent transition-colors hidden md:block ${
                location.pathname === '/about' ? 'text-accent' : 'text-foreground'
              }`}
            >
              About
            </Link>
            
            {isLoggedIn ? (
              <div className="userProfile flex items-center space-x-2">
                <Avatar className="userAvatar h-8 w-8">
                  <AvatarFallback className="bg-accent/20 text-foreground">
                    {user?.name?.charAt(0) ?? user?.username?.charAt(0) ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="logoutButton login-button-gradient text-white button-hover logout-button-hover"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleLoginClick}
                className="loginButton login-button-gradient text-white button-hover"
              >
                Sign in
              </Button>
            )}

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-sm border-b border-border animate-fade-in">
          <div className="container mx-auto p-4 flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#pricing" 
                onClick={(e) => handleSectionClick('pricing', e)}
                className="navLink block py-2 border-b border-border text-foreground hover:text-accent transition-colors"
              >
                Pricing
              </a>
              <a 
                href="#demo" 
                onClick={(e) => handleSectionClick('demo', e)}
                className="navLink block py-2 border-b border-border text-foreground hover:text-accent transition-colors"
              >
                Proofs
              </a>
              <Link 
                to="/help"
                className="navLink block py-2 border-b border-border text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link 
                to="/about"
                className="navLink block py-2 border-b border-border text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-muted-foreground">{user?.username}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2 login-button-gradient text-white button-hover logout-button-hover"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleLoginClick}
                  className="w-full flex items-center justify-center gap-2 login-button-gradient text-white button-hover"
                >
                  <LogIn size={16} />
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
