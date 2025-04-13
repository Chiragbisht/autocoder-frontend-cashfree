import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    
    // If already on the help page
    if (window.location.pathname === '/help') {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update URL without reloading
        const url = new URL(window.location.href);
        url.searchParams.set('section', target);
        // Remove any hash to prevent conflicts
        url.hash = '';
        window.history.pushState({}, '', url);
      }
    } else {
      // Navigate to help page with section parameter
      navigate(`/help?section=${target}`);
    }
  };

  const handleHomeSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    console.log(`Footer: Attempting to navigate to section: ${sectionId}`);
    
    if (location.pathname === '/') {
      // If we're already on the home page, just scroll to the section
      const element = document.getElementById(sectionId);
      console.log(`Footer: On home page, element found: ${!!element}`);
      
      if (element) {
        // Scroll with offset to account for fixed navbar
        const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        console.log(`Footer: Scrolling to element position: ${elementPosition}, with navbar offset: ${navbarHeight}`);
        
        window.scrollTo({
          top: elementPosition - navbarHeight - 20, // 20px extra padding
          behavior: 'smooth'
        });
      } else {
        console.error(`Footer: Element with id '${sectionId}' not found on current page`);
      }
    } else {
      // If we're on another page, navigate to home with the section parameter
      console.log(`Footer: Not on home page, navigating to /?section=${sectionId}`);
      
      // Store the target section in sessionStorage to access after page load
      sessionStorage.setItem('scrollToSection', sectionId);
      
      // Navigate to the home page with the section parameter
      navigate(`/?section=${sectionId}`);
    }
  };

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              {!logoError ? (
                <img
                  src="/assets/logo.png"
                  alt="AutoCoder Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-2">
                  AC
                </div>
              )}
              <span className="text-xl font-bold">AutoCoder</span>
            </div>
            <p className="text-muted-foreground mb-4">
              AutoCoder is a desktop app designed to help job seekers ace technical interviews by providing real-time assistance with coding questions.
            </p>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-muted-foreground">All systems online</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/help#refund-policy" onClick={(e) => handleSmoothScroll(e, 'refund-policy')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="/help#cancellation-policy" onClick={(e) => handleSmoothScroll(e, 'cancellation-policy')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="/help#privacy-policy" onClick={(e) => handleSmoothScroll(e, 'privacy-policy')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/help#terms" onClick={(e) => handleSmoothScroll(e, 'terms')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#demo" onClick={(e) => handleHomeSection(e, 'demo')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="/#pricing" onClick={(e) => handleHomeSection(e, 'pricing')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/help#troubleshooting" onClick={(e) => handleSmoothScroll(e, 'troubleshooting')} className="text-muted-foreground hover:text-foreground transition-colors">
                  Troubleshooting
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} AutoCoder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
