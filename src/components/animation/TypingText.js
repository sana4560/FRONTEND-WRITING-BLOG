import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingText = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [" You are welcome to share your thoughts"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false
    };

    // Make sure the ref is assigned correctly before running Typed.js
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, options);

      // Cleanup on unmount
      return () => {
        typed.destroy();
      };
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'black', fontSize: '2rem',padding:'20px' }}>
      {/* Make sure the ref is attached properly */}
      <span ref={typedRef} id="typed-output"></span>
    </div>
  );
};

export default TypingText;
