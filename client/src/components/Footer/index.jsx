import React from 'react';
import logo from '../../img/black-logo.webp';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';

import './style.scss';

const Footer = () => {
  const location = useLocation();
  
  const handleClick = (elementId) => {
    if (location.pathname === '/') {
      scrollToElement(elementId);
    } else {
      window.location.replace(`/`);
      setTimeout(() => {
        scrollToElement(elementId);
      }, 1000);
    }
  };
  
  const scrollToElement = (elementId) => {
    scroller.scrollTo(elementId, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -70,
    });
  };
  
  return (
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <Link
                  to="First"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="footer-logo">
                <img  src={logo} alt="Bureaux" />
              </Link>
              <span className="footer-info--item">Design & Architecture</span>
              <span className="footer-info--item">Україна, Київ</span>
              <span className="footer-info--item">Copyright</span>
            </div>
            <div className="footer-navigation">
              <h3 className="footer-navigation--title">Навігація</h3>
              <span className="footer-navigation--item" onClick={() => handleClick('First')}>
              Головна
            </span>
              <span className="footer-navigation--item" onClick={() => handleClick('AboutUs')}>
              Про нас
            </span>
              <span className="footer-navigation--item" onClick={() => handleClick('Services')}>
              Послуги
            </span>
              <span className="footer-navigation--item" onClick={() => handleClick('Projects')}>
              Проєкти
            </span>
              <span className="footer-navigation--item" onClick={() => handleClick('Reviews')}>
              Відгуки
            </span>
              <span className="footer-navigation--item" onClick={() => handleClick('FAQs')}>
              Запитання
            </span>
            </div>
            <div className="footer-contacts">
              <h3 className="footer-contacts--title">Контакти</h3>
              <a href="tel:+380 98 949 86 48" rel="noreferrer" target="_blank">
                <span className="footer-contacts--item">+380 98 949 86 48</span>
              </a>
              <a href="mailto:bureaux.ivan@gmail.com" rel=" noreferrer" target="_blank">
                <span className="footer-contacts--item">bureaux.ivan@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/bureau.x_/" rel="noreferrer" target="_blank">
                <span className="footer-contacts--item">Instagram</span>
              </a>
              <a href="https://www.facebook.com/BureaX" rel="noreferrer" target="_blank">
                <span className="footer-contacts--item">Facebook</span>
              </a>
              <a href="https://www.behance.net/bureaux" rel="noreferrer" target="_blank">
                <span className="footer-contacts--item">Behance</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default React.memo(Footer);