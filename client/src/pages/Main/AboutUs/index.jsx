/* eslint-disable react/no-unescaped-entities */
import { useRef, useEffect, useState } from 'react';
import './style.scss';
import logoImg from '../../../img/ornament.svg';
import firstPhoto from './img/IMG_0969.jpg';
import firstGridPhoto from './img/photo2.png';
import secondGridPhoto from './img/photo1.png';
import thirdGridPhoto from './img/photo4.png';
import fourthGridPhoto from './img/photo3.png';
import fifthGridPhoto from './img/photo5.png';

const LOGO_WIDTHS = {
  small: 34,
  medium: 65,
  large: 85,
};
const imageMap = {
  logo: logoImg,
};

function AboutUs() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [maxLogosInRow, setMaxLogosInRow] = useState(0);

  useEffect(() => {
    function handleResize() {
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
        maxLogosInRow = Math.floor((containerWidth - titleWidth) / LOGO_WIDTHS.large);
        logoWidth = LOGO_WIDTHS.large;
      }

      setMaxLogosInRow(maxLogosInRow);
      setWindowWidth(containerWidth);

      document.querySelectorAll('.section-container--logo').forEach((logo) => {
        logo.style.width = `${logoWidth}px`;
      });
      document.querySelectorAll('.section-container--logos').forEach((logo) => {
        logo.style.width = `${logoWidth}px`;
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const logos = new Array(maxLogosInRow || 0).fill(imageMap.logo);

  return (
    <section className="section">
      <div className="section-container" id="AboutUs" ref={containerRef}>
        <img loading="lazy" src={logoImg} alt="#" className="section-container--logos" />
        <h1 className="section-container--title" ref={titleRef}>
          Про нас
        </h1>

        {logos.map((logo, index) => (
          <img loading="lazy" src={logo} alt="#" className="section-container--logos" key={index} />
        ))}
      </div>
      <div className="container">
        <div className="section-grid">
          <div className="section-grid__container--photo">
            <img
              loading="lazy"
              src={windowWidth <= 1023 ? fifthGridPhoto : firstPhoto}
              alt="f"
              className="section-grid--photo"
            />
          </div>
          <p className="section-grid--bureaux">
            <span>BureauX (Бюро Ікс)</span> – бюро архітектури та дизайну, засновниками якого є
            молоде подружжя архітекторів за освітою та захопленням. Вже понад 5 років ми
            розвиваємося у цій сфері та даруємо людям приємні емоції під час розробки дизайну та
            ремонту.
          </p>
          <p className="section-grid--mission">
            <span>Наша місія</span> – створювати ідеальний та унікальний простір для клієнтів з
            урахуванням їхніх потреб та бажань, використовуючи сучасні технології та інноваційні
            ідеї в дизайні, приділяючи увагу деталям та якості матеріалів.
          </p>
          <p className="section-grid--conclusion">
            Ми просуваємо <b>новий стиль українського дизайну</b>, поєднуючи сучасні тенденції та
            українські традиції, щоб створити для наших клієнтів затишний простір, який відповідає
            їхньому способу життя.
          </p>
        </div>
      </div>
      <div className="section-containers">
        {windowWidth > 1023 ? (
          <div className="logo-container">
            {logos
              .map((logo, index) => (
                <img
                  loading="lazy"
                  src={logo}
                  alt="#"
                  className="section-container--logo"
                  key={index}
                />
              ))
              .slice(0, 1)}
            <h2 className="title">Чому слід обирати нас</h2>
            {logos
              .map((logo, index) => (
                <img
                  loading="lazy"
                  src={logo}
                  alt="#"
                  className="section-container--logo"
                  key={index}
                />
              ))
              .slice(0, maxLogosInRow - 10)}
          </div>
        ) : (
          <>
            <h2 className="title">Чому слід обирати нас</h2>
            <div className="logo-container logo-containers">
              {logos.map((logo, index) => (
                <img
                  loading="lazy"
                  src={logo}
                  alt="#"
                  className="section-container--logo"
                  key={index}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="container1">
        <div className="container1-wrapper ">
          <div className="wrapper-info wrapper-1">
            <h3 className="container1-title box1-title">Відносини з клієнтом</h3>
            <p className="container1-info box1-paragraph">
              Для нас клієнт – це потенційний друг. Ми ведемо чесні та відкриті стосунки, а також
              прагнемо зберігати довгострокові відносини зі своїми замовниками.
            </p>
          </div>
          <div className="wrapper-number">
            <span className="container1-number box1">01</span>
            <img
              loading="lazy"
              src={firstGridPhoto}
              alt=""
              className="container1-image box1-photo"
            />
          </div>
        </div>
        <div className="container1-wrapper ">
          <div className="wrapper-info wrapper-2">
            <h3 className="container1-title box2-title">Якість та надійність</h3>
            <p className="container1-info box2-paragraph">
              Надійність - це головна ознака гарного ремонту та добре спроектованого будинку. Ми
              надаємо гарантії як на ремонтні роботи, так і на дизайн-проект.
            </p>
          </div>
          <div className="wrapper-number">
            <span className="container1-number box2">02</span>
            <img
              loading="lazy"
              src={secondGridPhoto}
              alt=""
              className="container1-image box2-photo"
            />
          </div>
        </div>
        <div className="container1-wrapper ">
          <div className="wrapper-info wrapper-3">
            <h3 className="container1-title box3-title">Український етнос</h3>
            <p className="container1-info box3-paragraph">
              Ми цінуємо та поважаємо нашу українську культуру та віримо, що український етнос
              любитимуть не лише у нас на батьківщині, а й у всьому світі, більше ніж скандинавський
              стиль.
            </p>
          </div>
          <div className="wrapper-number">
            <span className="container1-number box3">03</span>
            <img
              loading="lazy"
              src={thirdGridPhoto}
              alt=""
              className="container1-image box3-photo"
            />
          </div>
        </div>
        <div className="container1-wrapper ">
          <div className="wrapper-info wrapper-4">
            <h3 className="container1-title box4-title">Сімейні цінності</h3>
            <p className="container1-info box4-paragraph">
              Ми знаємо, як важливо проводити час із сім'єю, і як важливий сімейний затишок, тому
              враховуємо побажання та захоплення всіх членів сім'ї для створення приємної атмосфери
              вдома.
            </p>
          </div>
          <div className="wrapper-number">
            <span className="container1-number box4">04</span>
            {windowWidth > 480 && windowWidth <= 1024 && (
              <img
                loading="lazy"
                src={fifthGridPhoto}
                alt=""
                className="container1-image box4-photo"
              />
            )}
            {windowWidth > 1024 && (
              <img
                loading="lazy"
                src={fourthGridPhoto}
                alt=""
                className="container1-image box4-photo"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
