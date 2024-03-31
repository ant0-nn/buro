import union from '../../../../img/Union.svg';
import PopUpContainer from '../../../../components/PopUp/PopUp-container/index.jsx';
import React, { useState } from 'react';
function Bottom() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupSubmitted, setPopupSubmitted] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
    document.body.classList.add('no-scroll');
  };

  const closePopup = () => {
    setPopupVisible(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <section className="services-bottom">
      <div className="services-bottom-content">
        <p className="services-bottom--text">
          Кожен проект є унікальним і розробляється під потреби клієнта, саме тому точна вартість
          залежить від низки факторів.
          <span>
             Пропонуємо вам заповнити коротку анкету, після якої ми зможемо порахувати вартість та
            обговорити більше деталей у телефонній розмові!
          </span>
        </p>
        <span className="services-bottom--button" onClick={openPopup}>
          безкоштовний розрахунок
          <img loading="lazy" src={union} alt="" />
        </span>
        {isPopupVisible && (
          <div className="popup-overlay">
            <PopUpContainer
              source="кнопка в послугах"
              onClose={closePopup}
              onCloseButton={() => {
                closePopup();
                setPopupSubmitted(false);
              }}
              isOpenByButton={isPopupSubmitted}
            />
          </div>
        )}
      </div>
    </section>
  );
}
export default React.memo(Bottom);
