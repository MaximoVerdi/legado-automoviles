import React, { useEffect, useState } from 'react';
import './scrollEffect.css';

const Counter = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const rect = document.getElementById(label).getBoundingClientRect();
    if (rect.top <= window.innerHeight && !isVisible) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev < target) {
            return Math.ceil(prev + target / 100);
          }
          clearInterval(interval);
          return target;
        });
      }, 20);
    }

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, target]);

  return (
    <div id={label} className="stat">
        <div className='border-number'>
        <p className="number">{count}</p>
        </div>
      <p>{label}</p>
    </div>

  );
};

export { Counter };
