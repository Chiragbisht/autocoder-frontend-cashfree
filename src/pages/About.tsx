import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../../styles/about.css';

const About: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <Navbar />
      <div className="aboutContainer">
        <h1 className="title">About AutoCoder</h1>
        
        <motion.div 
          className="content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.section className="section" variants={item}>
            <h2>Our Story</h2>
            <p>
              Founded in 2025 by an engineering graduate who loves creating mobile and webapps,
              AutoCoder was born from firsthand experience with the broken technical interview system.
            </p>
            <p>
              After experiencing the disconnect between actual engineering work and coding interview questions,
              the founder created a solution to help engineers prepare for interviews without wasting time on
              irrelevant puzzles.
            </p>
          </motion.section>

          <motion.section className="section" variants={item}>
            <h2>Our Mission</h2>
            <div className="manifesto">
              <h3>Your Coding Interview Is a Joke</h3>
              <p>
                Hiring great engineers? Stop asking them to invert binary trees on a whiteboard.
              </p>
              <p>
                The best engineers don't spend their days solving leetcode puzzles. They build scalable 
                systems. They debug complex issues. They communicate ideas clearly.
              </p>
              
              <div className="comparisonContainer">
                <div className="comparisonColumn">
                  <h4>Today's scenario</h4>
                  <ul className="badList">
                    <li>Who studied leetcode the most.</li>
                    <li>Who has the best short-term memory.</li>
                    <li>Who can endure the most unnecessary stress.</li>
                  </ul>
                </div>
                
                <div className="comparisonColumn">
                  <h4>A great interview:</h4>
                  <ul className="goodList">
                    <li>How well someone thinks through a problem.</li>
                    <li>How they approach real-world scenarios.</li>
                    <li>How they collaborate and communicate under pressure.</li>
                  </ul>
                </div>
              </div>
              
              <p className="finalStatement">
                AutoCoder exists to bridge this gap—helping engineers showcase their true skills while
                navigating the reality of today's interview landscape.
              </p>
            </div>
          </motion.section>
          
          <motion.section className="section" variants={item}>
            <h2>Contact Us</h2>
            <p>Have questions, feedback or want to discuss how AutoCoder can help you? Get in touch!</p>
            <div className="contactInfo">
              <div>
                <h3>Email</h3>
                <p><a href="mailto:contact.autocoder@gmail.com">contact.autocoder@gmail.com</a></p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About; 
