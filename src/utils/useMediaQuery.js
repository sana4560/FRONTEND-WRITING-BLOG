// src/utils/useMediaQuery.js
import { useEffect, useState } from 'react';

const useMediaQuery = (width) => {
  const [matches, setMatches] = useState(window.innerWidth <= width);

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.innerWidth <= width);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return matches;
};

export default useMediaQuery;
