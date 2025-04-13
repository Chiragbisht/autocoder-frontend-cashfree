import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../styles/help.module.css';

const Help: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Handle section navigation when page loads
    if (typeof window !== 'undefined') {
      // First check for section in query params
      const params = new URLSearchParams(location.search);
      const targetId = params.get('section');
      
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } 
      // Fall back to hash if no query param
      else if (location.hash) {
        const id = location.hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }, [location]);
  
  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    // First ensure the element exists
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Scroll to the element
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update URL without reloading the page
    // Use history API directly
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('section', sectionId);
    
    // Remove any hash to prevent conflicts
    newUrl.hash = '';
    
    window.history.pushState({}, '', newUrl);
  };
  
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Help & Support</h1>
        
        <div className={styles.helpGrid}>
          <div className={styles.helpSidebar}>
            <h2>Topics</h2>
            <nav className={styles.helpNav}>
              <a href="#getting-started" onClick={handleSectionClick('getting-started')} className={styles.helpLink}>Getting Started</a>
              <a href="#installation" onClick={handleSectionClick('installation')} className={styles.helpLink}>Installation Guide</a>
              <a href="#troubleshooting" onClick={handleSectionClick('troubleshooting')} className={styles.helpLink}>Troubleshooting</a>
              <a href="#refund-policy" onClick={handleSectionClick('refund-policy')} className={styles.helpLink}>Refund Policy</a>
              <a href="#cancellation-policy" onClick={handleSectionClick('cancellation-policy')} className={styles.helpLink}>Cancellation Policy</a>
              <a href="#privacy-policy" onClick={handleSectionClick('privacy-policy')} className={styles.helpLink}>Privacy Policy</a>
              <a href="#terms" onClick={handleSectionClick('terms')} className={styles.helpLink}>Terms & Conditions</a>
              <a href="#contact" onClick={handleSectionClick('contact')} className={styles.helpLink}>Contact Support</a>
            </nav>
          </div>
          
          <div className={styles.helpContent}>
            <section id="getting-started" className={styles.helpSection}>
              <h2>Getting Started with AutoCoder</h2>
              <p>Welcome to AutoCoder! This guide will help you get up and running quickly with our interview preparation platform.</p>
              <div className={styles.helpCard}>
                <h3>1. Create an Account</h3>
                <p>You've already completed this step by logging in. Your account gives you access to all AutoCoder features.</p>
              </div>
              <div className={styles.helpCard}>
                <h3>2. Download the Desktop App</h3>
                <p>For the best experience, download our desktop application which provides real-time coding assistance.</p>
                <Link to="/#download">
                  <motion.span 
                    className={styles.helpButton}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    Download Now
                  </motion.span>
                </Link>
              </div>
              <div className={styles.helpCard}>
                <h3>3. Keyboard Shortcuts</h3>
                <p>Maximize your productivity with these essential keyboard shortcuts:</p>
                <ul className={styles.shortcutsList}>
                  <li><strong>Ctrl + Arrow keys</strong>: Move the screen in the corresponding direction</li>
                  <li><strong>Ctrl + Q</strong>: Minimize the application window</li>
                  <li><strong>Ctrl + R</strong>: Reset the screen</li>
                  <li><strong>Ctrl + S</strong>: Take screenshot</li>
                </ul>
              </div>
            </section>
            
            <section id="installation" className={styles.helpSection}>
              <h2>Installation Guide</h2>
              <h3>Windows Installation</h3>
              <ol className={styles.stepsList}>
                <li>Download the Windows installer (.exe) from the download page</li>
                <li>Run the installer and follow the on-screen instructions</li>
                <li>Once installed, launch AutoCoder from your Start menu or desktop</li>
                <li>Sign in with your account credentials</li>
              </ol>
              
              <h3>System Requirements</h3>
              <ul className={styles.requirementsList}>
                <li>Windows 10 or 11 (64-bit)</li>
                <li>4GB RAM minimum, 8GB recommended</li>
                <li>1GB available hard disk space</li>
                <li>Internet connection for account verification and updates</li>
              </ul>
            </section>
            
            <section id="troubleshooting" className={styles.helpSection}>
              <h2>Troubleshooting</h2>
              <p>Encountering issues with AutoCoder? Here are solutions to common problems:</p>
              
              <div className={styles.helpCard}>
                <h3>Application Won't Launch</h3>
                <p>If AutoCoder fails to start after installation:</p>
                <ol className={styles.stepsList}>
                  <li>Verify you're running Windows 10/11 with the latest updates</li>
                  <li>Run the application as administrator</li>
                  <li>Check your antivirus isn't blocking the application</li>
                  <li>Try reinstalling the application</li>
                </ol>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Login Issues</h3>
                <p>If you're having trouble logging in:</p>
                <ol className={styles.stepsList}>
                  <li>Ensure your internet connection is stable</li>
                  <li>Clear your browser cookies and cache</li>
                  <li>Try using a different browser</li>
                  <li>Verify your Google account is working correctly</li>
                </ol>
              </div>
              
              <div className={styles.helpCard}>
                <h3>AI Response Delays</h3>
                <p>If you're experiencing slow AI responses during interviews:</p>
                <ol className={styles.stepsList}>
                  <li>Check your internet connection speed</li>
                  <li>Close other resource-intensive applications</li>
                  <li>Restart the application</li>
                  <li>Try reducing your prompt length for faster responses</li>
                </ol>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Billing or Subscription Issues</h3>
                <p>For any payment or subscription problems:</p>
                <ul className={styles.requirementsList}>
                  <li>Verify your payment method has sufficient funds</li>
                  <li>Check if your card hasn't expired</li>
                  <li>Contact your bank to ensure transactions aren't being blocked</li>
                  <li>For persistent issues, please <a href="#contact" onClick={handleSectionClick('contact')} className={styles.inlineLink}>contact our support team</a></li>
                </ul>
              </div>
            </section>
            
            <section id="refund-policy" className={styles.helpSection}>
              <h2>Refund Policy</h2>
              <p>Please read our refund policy carefully before making a purchase:</p>
              
              <div className={styles.helpCard}>
                <h3>No Refund Policy</h3>
                <p><strong>All purchases are final and non-refundable.</strong> We do not provide refunds for any subscription plans purchased, regardless of the circumstances.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Billing Clarification</h3>
                <p>When you cancel your subscription:</p>
                <ul className={styles.requirementsList}>
                  <li>You will <strong>not</strong> receive a refund for any portion of your current billing period</li>
                  <li>You will continue to have full access to all AutoCoder features until the end of your current billing period</li>
                  <li>You will not be charged for the next billing cycle</li>
                </ul>
              </div>
            </section>
            
            <section id="cancellation-policy" className={styles.helpSection}>
              <h2>Cancellation Policy</h2>
              <p>We understand that your needs may change. Here's everything you need to know about cancelling your AutoCoder subscription:</p>
              
              <div className={styles.helpCard}>
                <h3>How to Cancel Your Subscription</h3>
                <p>You can cancel your subscription at any time by following these simple steps:</p>
                <ol className={styles.stepsList}>
                  <li>Log in to your AutoCoder account</li>
                  <li>Navigate to Account Settings &gt; Subscriptions</li>
                  <li>Click on "Cancel Subscription"</li>
                  <li>Follow the prompts to confirm cancellation</li>
                </ol>
                <p>You will receive a confirmation email once your cancellation is processed.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>What Happens After Cancellation</h3>
                <ul className={styles.requirementsList}>
                  <li><strong>No Refunds:</strong> Cancellation does not entitle you to a refund of any kind for your current billing period</li>
                  <li><strong>Continued Access:</strong> You will continue to have full access to all AutoCoder features until the end of your current billing period</li>
                  <li><strong>No Future Charges:</strong> No further charges will be made to your payment method after cancellation</li>
                  <li><strong>Account Status:</strong> Your account will automatically downgrade to the free tier when your subscription ends</li>
                </ul>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Cancellation Timeline</h3>
                <p>To avoid being charged for the next billing cycle, please cancel at least 24 hours before your renewal date. Cancellation requests received less than 24 hours before renewal may not be processed in time to prevent the next charge.</p>
                <p>Remember that cancelling your subscription means you're only stopping future payments — you'll still have access until the end of your paid period.</p>
              </div>
              
              <p>If you have any questions about cancelling your subscription, please <a href="#contact" onClick={handleSectionClick('contact')} className={styles.inlineLink}>contact our support team</a>.</p>
            </section>
            
            <section id="privacy-policy" className={styles.helpSection}>
              <h2>Privacy Policy</h2>
              <p>Last updated: April 1, 2025</p>
              <p>We collect the following types of information:</p>
              <ul className={styles.requirementsList}>
                <li><strong>Account Information:</strong> Email address, name, and profile picture from your Google account</li>
                <li><strong>Usage Data:</strong> Information about how you use our services, including interview practice sessions and code submissions</li>
                <li><strong>Device Information:</strong> Device type, operating system, and browser information</li>
                <li><strong>Payment Information:</strong> When you purchase a subscription, our payment processor collects billing information</li>
              </ul>
              
              <div className={styles.helpCard}>
                <h3>How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul className={styles.requirementsList}>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative messages, updates, and security alerts</li>
                  <li>Personalize your experience and provide tailored content</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                </ul>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Data Retention</h3>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Your Rights</h3>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className={styles.requirementsList}>
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Restriction or objection to processing</li>
                  <li>Data portability</li>
                </ul>
                <p>To exercise these rights, please <a href="#contact" onClick={handleSectionClick('contact')} className={styles.inlineLink}>contact us</a>.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Cookies</h3>
                <p>We use cookies to improve your experience on our website. You can control cookies through your browser settings.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Third-Party Services</h3>
                <p>Our service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Changes to This Privacy Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
              </div>
              
              <p>By using our services, you acknowledge that you have read and understand this Privacy Policy.</p>
            </section>
            
            <section id="terms" className={styles.helpSection}>
              <h2>Terms and Conditions</h2>
              <p>Last updated: April 1, 2025</p>
              <p>Please read these terms carefully before using our services:</p>
              
              <div className={styles.helpCard}>
                <h3>License Usage</h3>
                <p>Your subscription grants you a non-exclusive, non-transferable license to use AutoCoder for personal interview preparation purposes only. This license is governed by these Terms and our <a href="#privacy-policy" onClick={handleSectionClick('privacy-policy')} className={styles.inlineLink}>Privacy Policy</a>.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>User Accounts</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Our <a href="#cancellation-policy" onClick={handleSectionClick('cancellation-policy')} className={styles.inlineLink}>Cancellation Policy</a> applies to all account subscriptions.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Prohibited Activities</h3>
                <ul className={styles.requirementsList}>
                  <li>Sharing your account with others</li>
                  <li>Attempting to reverse engineer or modify the software</li>
                  <li>Using the service for unauthorized commercial purposes</li>
                  <li>Violating any applicable laws or regulations</li>
                  <li>Using the service in a way that could disable, overburden, or impair its functioning</li>
                </ul>
                <p>Violation of these terms may result in account termination without refund, as described in our <a href="#refund-policy" onClick={handleSectionClick('refund-policy')} className={styles.inlineLink}>Refund Policy</a>.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Intellectual Property</h3>
                <p>All content, features, and functionality of our service, including but not limited to text, graphics, logos, icons, and code, are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Limitation of Liability</h3>
                <p>AutoCoder and its affiliates are not liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.</p>
              </div>
              
              <div className={styles.helpCard}>
                <h3>Governing Law</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              </div>
              
              <p className={styles.legalNote}>By using our service, you agree to these terms and conditions in full. Please read our <a href="#privacy-policy" onClick={handleSectionClick('privacy-policy')} className={styles.inlineLink}>Privacy Policy</a> for information on how we handle your data.</p>
            </section>
            
            <section id="contact" className={styles.helpSection}>
              <h2>Contact Support</h2>
              <p>Need additional help? Our support team is ready to assist you.</p>
              
              <div className={styles.helpCard}>
                <h3>Email Support</h3>
                <p>Send us an email at: <a href="mailto:contact.autocoder@gmail.com" className={styles.emailLink}>contact.autocoder@gmail.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Help; 