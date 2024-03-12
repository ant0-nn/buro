/* eslint-disable react/prop-types */
import './style.scss';
import Top from './Top/index';
import Bottom from './Bottom/index';

const ServiceItem = ({ text }) => (
  <div className="services-center-container">
    <p className="services-center-container__text">{text}</p>
    <button className="services-center-container__button">
      <svg
        width="27"
        height="27"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
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
    </button>
  </div>
);

const Services = () => (
  <section className="services" id="Services">
    <Top />
    <div className="services-center container">
      {['Приватні простори', 'Комерційні приміщення', 'Архітектура та будівництво'].map(
        (item, index) => (
          <ServiceItem key={index} text={item} />
        )
      )}
    </div>
    <Bottom />
  </section>
);

export default Services;
