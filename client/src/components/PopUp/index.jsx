/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './style.scss';
import PopUpContainer from './PopUp-container/index.jsx';
function PopUp() {
  return (
    <section className="popUp">
      <h2 className="popUp-title">Зробіть житло Вашої мрії!</h2>
      <div className="container">
        <p className="popUp-text">
          Залишайте Ваші дані і ми Вам обов'язково передзвонимо, коли Вам буде зручніше!
        </p>
        <PopUpContainer source="Відправка з сайту" />
      </div>
    </section>
  );
}

export default React.memo(PopUp);
