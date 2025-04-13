'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Pricing.module.css';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  
  const pricingPlans = [
    {
      name: "Monthly",
      price: "₹299",
      features: [
        "Access all features for a month",
        "1 user",
        "Email support"
      ]
    },
    {
      name: "Yearly",
      price: "₹999",
      popular: true,
      features: [
        "Access to all features forever",
        "24/7 dedicated support",
        "Advanced security"
      ]
    }
  ];
  
  // Check if the user is logged in by reading from localStorage
  const isLoggedIn = !!localStorage.getItem('user');

  const handleSelectPlan = (plan: any) => {
    if (isLoggedIn) {
      navigate('/subscribe', { state: { plan } });
    } else {
      navigate('/auth', { state: { plan } });
    }
  };

  return (
    <div className={styles.container} id="pricing">
      <section className={styles.heroSection}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Choose Your Plan
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get access to AutoCoder and ace your technical interviews
        </motion.p>
      </section>
      
      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Pricing Plans</h2>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`${styles.pricingCard} ${plan.popular ? styles.popularPlan : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              {plan.popular && <div className={styles.popularTag}>Popular</div>}
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.planPrice}>
                {plan.price}
                <span>/plan</span>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button 
                className={styles.planButton}
                onClick={() => handleSelectPlan(plan)}
              >
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
