import React from 'react';
import { Code, BookOpen, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-Time Coding Assistance",
      description: "Get suggestions and help as you code, just like having an expert by your side.",
      icon: <Code className="h-8 w-8 text-[#483D8B]" />
    },
    {
      title: "Interview Patterns Library",
      description: "Access a comprehensive collection of interview patterns from top tech companies.",
      icon: <BookOpen className="h-8 w-8 text-[#483D8B]" />
    },
    {
      title: "Performance Analytics",
      description: "Track your progress and identify areas for improvement with detailed analytics.",
      icon: <BarChart className="h-8 w-8 text-[#483D8B]" />
    }
  ];

  return (
    <section className="py-16 bg-background" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose AutoCoder</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="p-6 rounded-lg glass-card hover:border-accent/30 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
