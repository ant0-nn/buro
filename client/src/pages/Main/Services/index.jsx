/* eslint-disable react/prop-types */
import './style.scss';
import Top from './Top/index';
import Bottom from './Bottom/index';
import privatImg from './img/privat.png';
import archImg from './img/arch.png';
import comImg from './img/com.png';

const SvgIcon = () => {
  return (
      <svg width="27" height="27" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
          <path
              d="M21.9557 9.04175L9.03906 21.9584"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
          <path
              d="M10.3359 9.04175H21.9609V20.6667"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="31" height="31" fill="white" />
          </clipPath>
        </defs>
      </svg>
  );
};

const Services = () => {
  return (
      <section className="services" id="Services">
        <Top />
        <div className="services-center container">
          <div style={{ backgroundImage: `url(${privatImg})` }} className="services-center-container">
            <p className="services-center-container__text">
              Приватні простори
              <button className="services-center-container__button">
                <SvgIcon />
              </button>
            </p>
          </div>
          <div style={{ backgroundImage: `url(${comImg})` }} className="services-center-container">
            <p className="services-center-container__text">
              Комерційні приміщення
              <button className="services-center-container__button">
                <SvgIcon />
              </button>
            </p>
          </div>
          <div style={{ backgroundImage: `url(${archImg})` }} className="services-center-container">
            <p className="services-center-container__text">
              Архітектура та будівництво
              <button className="services-center-container__button">
                <SvgIcon />
              </button>
            </p>
          </div>
        </div>
        <Bottom />
      </section>
  );
};

export default Services;