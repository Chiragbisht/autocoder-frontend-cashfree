import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import WorksWith from '@/components/WorksWith';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import '../../styles/home.css';

const Index: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Check for section parameter in the URL
    const params = new URLSearchParams(location.search);
    const sectionId = params.get('section');
    
    // Or check sessionStorage (for footer navigation)
    const storedSectionId = sessionStorage.getItem('scrollToSection');
    
    // If we have a section ID from either source, scroll to it
    const targetSectionId = sectionId || storedSectionId;
    
    if (targetSectionId) {
      // Set a small timeout to ensure the page is fully loaded
      setTimeout(() => {
        const element = document.getElementById(targetSectionId);
        console.log(`Trying to scroll to: ${targetSectionId}, Element found: ${!!element}`);
        
        if (element) {
          // Scroll with offset to account for fixed navbar
          const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          
          // For pricing section, center it in the viewport
          if (targetSectionId === 'pricing') {
            const windowHeight = window.innerHeight;
            const elementHeight = element.offsetHeight;
            
            // Calculate position to center the element in the viewport
            const scrollPosition = elementPosition - (windowHeight / 2) + (elementHeight / 2);
            
            window.scrollTo({
              top: Math.max(0, scrollPosition),
              behavior: 'smooth'
            });
          } else {
            console.log(`Scrolling to position ${elementPosition - navbarHeight - 20}px`);
            
            window.scrollTo({
              top: elementPosition - navbarHeight - 20, // 20px extra padding
              behavior: 'smooth'
            });
          }
          
          // Clear the sessionStorage after use
          if (storedSectionId) {
            sessionStorage.removeItem('scrollToSection');
          }
        } else {
          console.error(`Element with id '${targetSectionId}' not found`);
        }
      }, 1000); // Increased timeout for better reliability
    } else {
      // If there's no section ID and it's a refresh (performance navigation type 1)
      // then scroll to top
      if (window.performance && window.performance.navigation.type === 1) {
        window.scrollTo(0, 0);
      }
    }
  }, [location]);
  
  return (
    <div className="homeContainer">
      <Navbar />
      <main className="homeMain">
        <Hero />
        <Features />
        <Demo />
        <WorksWith />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
