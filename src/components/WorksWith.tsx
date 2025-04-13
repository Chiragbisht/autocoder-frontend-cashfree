import React, { useState } from 'react';
import '../../styles/workswith.css';

const WorksWith: React.FC = () => {
  // Use external image URLs for logos
  const platforms = [
    { 
      name: "Zoom", 
      logo: "https://download.logo.wine/logo/Zoom_Video_Communications/Zoom_Video_Communications-Logo.wine.png" 
    },
    { 
      name: "Google Meet", 
      logo: "https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png" 
    },
    { 
      name: "HackerRank", 
      logo: "https://hrcdn.net/community-frontend/assets/brand/logo-new-white-green-a5cb16e0ae.svg" 
    },
    { 
      name: "LeetCode", 
      logo: "https://leetcode.com/static/images/LeetCode_logo.png" 
    },
    { 
      name: "Microsoft Teams", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" 
    },
    { 
      name: "Skype", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Skype_logo_%282019%E2%80%93present%29.svg" 
    }
  ];

  // Track logo loading errors
  const [logoErrors, setLogoErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (platformName: string) => {
    setLogoErrors(prev => ({
      ...prev,
      [platformName]: true
    }));
  };

  return (
    <section className="worksWithSection" id="works-with">
      <div className="worksWithContainer">
        <h2 className="sectionTitle">Works With</h2>
        <p className="description">
          AutoCoder seamlessly integrates with all major technical interview platforms
        </p>
        
        <div className="platformGrid">
          {platforms.map((platform, index) => (
            <div 
              key={index}
              className="platformItem"
            >
              <div className="platformIconBox">
                <div className="platformIconWrapper">
                  {!logoErrors[platform.name] ? (
                    <div className="iconContainer">
                      <img 
                        src={platform.logo} 
                        alt={`${platform.name} logo`}
                        className="platformIcon"
                        onError={() => handleImageError(platform.name)}
                        width="48"
                        height="48"
                      />
                    </div>
                  ) : (
                    <div className="iconFallback">
                      {platform.name.substring(0, 2)}
                    </div>
                  )}
                </div>
              </div>
              <span className="platformName">{platform.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksWith;
