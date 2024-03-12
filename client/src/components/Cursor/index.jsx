import React, { useState, useEffect } from 'react';
import AnimatedCursor from 'react-animated-cursor';

function Cursor () {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    function handleWindowResize() {
      if (window.innerWidth < 1024) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
    }

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (!isDesktop) {
    return null; // Повертаємо null, якщо не є десктопом
  }

  return (
        <AnimatedCursor
            className="animated-cursor"
            innerSize={10}
            color="0, 0, 0"
            innerScale={2}
            innerStyle={{
                backgroundColor: 'white',
                mixBlendMode: 'exclusion',
                zIndex: '9999999',
            }}
            outerStyle={{
                display: 'none',
            }}
            clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'input[type="radio"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
                '.grid-item',
            ]}
        />
    );
}

export default React.memo(Cursor);