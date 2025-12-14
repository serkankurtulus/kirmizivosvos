'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader" style={{ display: isLoading ? 'block' : 'none' }}>
      <div className="loader-inner">
        <svg
          width="120"
          height="220"
          viewBox="0 0 100 100"
          className="loading-spinner"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="spinner"
            cx="50"
            cy="50"
            r="21"
            fill="#13181d"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}
