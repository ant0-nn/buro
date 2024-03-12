/* eslint-disable no-unused-vars */
import './style.scss';
import React, { useRef, useState, useEffect } from 'react';
import frame from './img/Frame.svg';
import frame1 from './img/Frame1.svg';
import frame2 from './img/Frame2.svg';
import frame3 from './img/Frame3.svg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from './img/logo.svg';

if (window.innerWidth >= 1024) {
  gsap.registerPlugin(ScrollTrigger);
}

const ourWorks = [
  {
    image: frame,
    title: 'Попередній ескіз',
    text: "Визначення стилістичного рішення інтер'єру, підготовка технічних завдань, планувальних рішень, колажів для всіх приміщень.",
  },
  {
    image: frame1,
    title: 'Візуализація проєкта',
    text: "Детальна візуалізація кожної кімнати. 3D-зображення враховують раніше вибрані елементи інтер'єру та оздоблювальні матеріали",
  },
  {
    image: frame2,
    title: 'Рабоча документація',
    text: "Створення робочої документації для проєкту дизайну інтер'єру: специфікації та планування з меблями.",
  },
  {
    image: frame3,
    title: 'Авторський нагляд',
    text: "Контроль відповідність будівельних робіт проєктному плану. Наш дизайнер та інженер регулярно відвідують об'єкт і все контролюють. Ми здійснюємо закупівлю матеріалів.",
  },
];

const LOGO_WIDTHS = {
  small: 34,
  medium: 65,
  large: 85,
};

const imageMap = {
  logo: logo,
};

function OurWork() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const titleRef = useRef(null);
  const [maxLogosInRow, setMaxLogosInRow] = useState(0);

  useEffect(() => {
    function handleResize() {
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      let maxLogosInRow;
      let logoWidth;

      const newWindowWidth = window.innerWidth;

      if (newWindowWidth <= 480) {
        const titleWidth = titleRef.current.getBoundingClientRect().width;
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.small + 4);
        maxLogosInRow = Math.min(maxLogosInRow, 8);
        logoWidth = LOGO_WIDTHS.small;
      } else if (newWindowWidth <= 1024) {
        const titleWidth = titleRef.current.getBoundingClientRect().width;
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.medium);
        maxLogosInRow = Math.min(maxLogosInRow, 9);
        logoWidth = LOGO_WIDTHS.medium;
      } else {
        const titleWidth = titleRef.current.getBoundingClientRect().width;
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.large / 2);
        logoWidth = LOGO_WIDTHS.large;
      }
      setMaxLogosInRow(maxLogosInRow);
      setWindowWidth(newWindowWidth);
      document.querySelectorAll('.ourWork-container--logo').forEach((logo) => {
        logo.style.width = `${logoWidth}px`;
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return;

      const list = mainRef.current.querySelector('ul');
      const sections = list.querySelectorAll('li');
      let activeIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          activeIndex = index;
        }
      });

      setCurrentIndex(activeIndex);

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = (scrollTop / (scrollHeight - windowHeight)) * 100;
      setScrollProgress(progress);
      sections.forEach((section, index) => {
        const stepper = section.querySelector('.ourWork-container--stepper');
        if (index === activeIndex) {
          stepper.classList.add('active-number');
        } else {
          stepper.classList.remove('active-number');
        }
        const imageContainer = section.querySelector('.ourWork-container--image');
        if (index === activeIndex) {
          imageContainer.classList.add('active');
        } else {
          imageContainer.classList.remove('active');
        }
      });

      if (gsap && ScrollTrigger) {
        gsap.to('.ourWork-container--image', { borderRadius: '0', duration: 0.1 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const list = mainRef.current.querySelector('ul');
    const sections = list.querySelectorAll('li');

    sections.forEach((section, index) => {
      if (gsap && ScrollTrigger) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top center ',
            end: 'bottom 70%',
            scrub: true,
          },
        });

        tl.to(section, {
          className: (index) => `+=active ${index % 2 === 0 ? 'even' : 'odd'}`,
          duration: 0.5,
        });

        const stepper = section.querySelector('.ourWork-container--stepper');
        const lineContainer = document.createElement('div');
        lineContainer.className = 'vertical-line-container';
        stepper.appendChild(lineContainer);

        const line = document.createElement('div');
        line.className = 'vertical-line';
        lineContainer.appendChild(line);

        if (line) {
          const startScroll = (index - 1) / sections.length;
          const endScroll = index / sections.length;

          tl.fromTo(
            line,
            { width: '0%' },
            { width: '100%', duration: 0.5, scrub: true, start: startScroll, end: endScroll }
          );
        }
      }
    });
  }, []);

  const formatIndex = (index) => {
    const formattedIndex = index + 1;
    return formattedIndex < 10 ? `0${formattedIndex}` : formattedIndex;
  };

  const logos = new Array(maxLogosInRow || 0).fill(imageMap.logo);

  return (
    <section className="ourWork" id="OurWork" ref={mainRef}>
      <div className="ourWork-header" ref={containerRef}>
        <div className="ourWork-header-logos">
          {logos.map((logo, index) => (
            <img
              loading="lazy"
              src={logo}
              alt="#"
              className="ourWork-container--logo"
              key={index}
            />
          ))}
        </div>
        <h2 className="ourWork-header--title" ref={titleRef}>
          як ми працюємо
        </h2>
        <div className="ourWork-header-logo">
          {logos.map((logo, index) => (
            <img
              loading="lazy"
              src={logo}
              alt="#"
              className="ourWork-container--logo"
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <ul className="ourWork-list">
          {ourWorks.map((works, index) => (
            <li key={index} style={{ marginBottom: index === ourWorks.length - 1 ? '0' : '3rem' }}>
              <div className={`ourWork-container box-${index + 1}`}>
                <div
                  className={`ourWork-container--image image-box${index + 1} ${
                    index === 2 ? 'image-box3' : 'image-box4'
                  } `}
                  style={{
                    borderRadius:
                      index % 4 === 0
                        ? '10px 10px 0 10px'
                        : index % 4 === 1
                        ? '10px 10px 10px 0'
                        : index % 4 === 2
                        ? '10px 0 10px 10px'
                        : '0 10px 10px 10px',
                  }}>
                  <img loading="lazy" src={works.image} className={`box box-${index + 1}`} alt="" />
                </div>
                <div className="ourWork-container--stepper">
                  <div className="step-number">{formatIndex(index)}</div>
                  {index < ourWorks.length - 1 && <div className="stepper-line"></div>}
                </div>
                <div
                  className={`ourWork-container--info info-box${index + 1} ${
                    windowWidth >= 1024 && index === currentIndex ? 'active' : ''
                  }`}>
                  <h3 className="ourWork-container--title">{works.title}</h3>
                  <p className="ourWork-container--text box">{works.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default React.memo(OurWork);
