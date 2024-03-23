/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import firstFamilyPhoto from './img/3.png';
import secondFamilyPhoto from './img/family2.png';
import foundersIvan from './img/2.png';
import foundersDasha from './img/IMG_0850.jpg';
import ornament from './img/ornament.png';
import tabletOr from './img/tabletOr.png';

const founders = [
  {
    id: 1,
    image: foundersIvan,
    name: 'Іван',
    title: 'Головний архітектор та керівник BureauX',
    info: 'На сьогоднішній день я вважаю себе батьком двох дітей: сина та нашого архітектурного бюро.',
    text: '“Ціную в людях відкритість до спілкування та щирість. Для мене також є дуже важливим, залишатися друзями із нашими замовниками та не губитися після їхнього переїзду, тому робимо все можливе, щоб залишитися у добрих стосунках!”',
  },
  {
    id: 2,
    image: foundersDasha,
    name: 'Дар’я',
    title: 'Головний дизайнер-архітектор та генератор творчих ідей',
    info: '«Для мене дизайн – це робота душі! З особливим задоволення працюю із замовниками задля втілення їх мрій та бажань!',
    text: 'Дизайн - це спосіб наповнити оселю вашою душею!\t Важливо, щоб простір був не тільки зручний для вас, а й надихаючим!»',
  },
];

function Founders() {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(window.innerWidth >= 1024);
  const foundersRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const foundersHeight = foundersRef.current?.offsetHeight || 0;
      const foundersTop = foundersRef.current?.offsetTop || 0;
      const scrollPos = window.scrollY;

      if (scrollPos >= foundersTop + foundersHeight / 5) {
        setCurrentIndex(1);
      } else {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentFounder = founders[currentIndex];

  return (
    <section ref={foundersRef} className="founders">
      <div className="founders-content">
        <h1 className="founders-title">Засновники</h1>
        <div className="founders-img">
          <img loading="lazy" src={firstFamilyPhoto} alt="" />
          <p>молоде подружжя архітекторів за освітою та захопленням</p>
          <img loading="lazy" src={secondFamilyPhoto} alt="" />
        </div>
        {isDesktopOrLaptop ? (
          <Carousel items={founders} currentItem={currentFounder} />
        ) : (
          <div className="founders-data">
            {founders.map((founder) => (
              <div className="founders-container" key={founder.id}>
                <img loading="lazy" src={founder.image} alt="img" />
                <div className="founders-container--ornament">
                  <img loading="lazy" src={tabletOr} alt=""  />
                </div>
                <p className="founders-container--name">{founder.name}</p>
                <h4 className="founders-container--title">{founder.title}</h4>
                <p className="founders-container--info">{founder.info}</p>
                <p className="founders-container--text">{founder.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Carousel({ items, currentItem }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const activeItem = carousel.querySelector('.carousel-item.active');
    if (activeItem) {
      carousel.scroll({
        top: activeItem.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [currentItem]);

  return (
    <div className="founders-carousel" ref={carouselRef}>
      {items.map((item) => (
        <div
          className={`carousel-item ${item.id === currentItem.id ? 'active' : ''}`}
          key={item.id}>
          <div className="founders-container">
            <img src={item.image} alt="img" className="founders-container__photo" />
            <img src={ornament} alt="" className="founders-container--ornament" />
            <p className="founders-container--name">{item.name}</p>
            <h4 className="founders-container--title">{item.title}</h4>
            <p className="founders-container--info">{item.info}</p>
            <p className="founders-container--text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default React.memo(Founders);
