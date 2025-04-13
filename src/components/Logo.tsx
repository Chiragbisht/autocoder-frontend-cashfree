
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
        <span className="text-lg font-bold text-primary-foreground">AC</span>
      </div>
      <span className="text-xl font-bold">AutoCoder</span>
    </div>
  );
};

export default Logo;
