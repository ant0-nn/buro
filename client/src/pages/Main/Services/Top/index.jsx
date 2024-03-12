import React, { useState, useEffect, useRef } from 'react';
import logotype from '../../../../img/ornament.svg';

const LOGO_WIDTHS = {
  small: 34,
  medium: 65,
  large: 85,
};

const imageMap = {
  logo: logotype,
};

function Top() {
  const [maxLogosInRow, setMaxLogosInRow] = useState(0);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const titleWidth = titleRef.current.getBoundingClientRect().width;
      let maxLogosInRow;
      let logoWidth;

      if (windowWidth <= 480) {
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.small);
        maxLogosInRow = Math.min(maxLogosInRow, 5);
        logoWidth = LOGO_WIDTHS.small;
      } else if (windowWidth <= 1023) {
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.medium);
        maxLogosInRow = Math.min(maxLogosInRow, 9);
        logoWidth = LOGO_WIDTHS.medium;
      } else {
        const textWidth = textRef.current.getBoundingClientRect().width;
        maxLogosInRow = Math.floor((containerWidth - titleWidth - textWidth) / LOGO_WIDTHS.large);
        logoWidth = LOGO_WIDTHS.large;
      }

      setMaxLogosInRow(maxLogosInRow);
      setWindowWidth(containerWidth);

      document.querySelectorAll('.section-container--logo').forEach((logo) => {
        logo.style.width = `${logoWidth}px`;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const logos = new Array(maxLogosInRow || 0).fill(imageMap.logo);
  const paragraph =
    window.innerWidth > 1023 ? (
      <p className="services-top__text" ref={textRef}>
        Усі проєкти ми виконуємо у нашому {''}
        <span className="services-top__span">авторському українському стилі</span>
      </p>
    ) : null;

  return (
    <section className="services-top" ref={containerRef}>
      {windowWidth > 1023 && (
        <img loading="lazy" src={logotype} alt="#" className="section-container--logo" />
      )}
      <h2 className="services-top--title" ref={titleRef}>
        Послуги
      </h2>
      {paragraph}
      {logos.slice(0, logos.length - 2).map((logo, index) => (
        <img loading="lazy" src={logo} alt="#" className="section-container--logos" key={index} />
      ))}
    </section>
  );
}
export default React.memo(Top);
