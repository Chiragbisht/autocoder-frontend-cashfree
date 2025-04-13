'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Proofs.module.css';

export default function Demo() {
  return (
    <div className={styles.container} id="demo">
      <section className={styles.heroSection}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          See It In Action
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Real people, real interviews, real results
        </motion.p>
      </section>
      
      <section className={styles.proofsSection}>
        <h2 className={styles.sectionTitle}>Proofs</h2>
        
        <div className={styles.videoComparisonContainer}>
          <div className={styles.videoComparison}>
            <div className={styles.videoColumn}>
              <div className={styles.videoWrapper}>
                <video 
                  className={styles.video} 
                  src="/assets/i.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                />
              </div>
              <p className={styles.videoCaption}>Interviewer Screen</p>
            </div>
            
            <div className={styles.videoColumn}>
              <div className={styles.videoWrapper}>
                <video 
                  className={styles.video} 
                  src="/assets/candi.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                />
              </div>
              <p className={styles.videoCaption}>Your Own Screen</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
