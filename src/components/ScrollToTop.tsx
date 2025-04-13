import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, search } = useLocation();
  
  useEffect(() => {
    // Don't automatically scroll to top if:
    // 1. We have a section parameter in the URL query
    // 2. We have a stored section in sessionStorage
    const params = new URLSearchParams(search);
    const hasSection = params.has('section');
    const hasStoredSection = sessionStorage.getItem('scrollToSection') !== null;
    
    // If neither condition is true, scroll to top
    if (!hasSection && !hasStoredSection) {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);
  
  return null; // This is a utility component that doesn't render anything
} 