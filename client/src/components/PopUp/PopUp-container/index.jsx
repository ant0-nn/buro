import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

function PopUpContainer({ onCloseButton, source, onClose }) {
  const [customTime, setCustomTime] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [timeSelection, setTimeSelection] = useState('Найближчим часом');
  const [isImmediateTimeSelected, setIsImmediateTimeSelected] = useState(true);

  const showErrorNotification = () => {
    toast.error('Помилка! Не вдалося відправити форму.', {
      position: 'top-right',
      autoClose: 5000,
    });
  };

  function getMinDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function formatDate(dateTime) {
    if (!dateTime) {
      return '';
    }

    const date = new Date(dateTime);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${day}.${month}.${year}; ${hours}:${formattedMinutes}`;
  }

  const showSuccessNotification = () => {
    toast.success('Дані успішно відправлено', {
      position: 'top-right',
      autoClose: 5000,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && phoneNumber && selectedPackage && (timeSelection !== 'Інше' || customTime)) {
      const namePattern = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ]+$/u;
      if (!namePattern.test(name)) {
        toast.error('Будь ласка, введіть коректне ім’я.');
        return;
      }
      const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      if (!phonePattern.test(phoneNumber)) {
        toast.error('Будь ласка, введіть коректний номер телефону.');
        return;
      }
      const formData = `
        🔥Нове повiдомлення з сайту!🔥\n\n📩 Поп-ап: ${source}\n🤵‍♂️ Iм'я: ${name}\n📱 Номер телефону: +${phoneNumber}\n📋 Пакет послуг: ${selectedPackage}\n⌚️ Коли дзвонити: ${
        timeSelection === 'Найближчим часом' ? timeSelection : formatDate(customTime)
      }
      `.trim();

      try {
        const botToken = '6809113635:AAEAPNVeXhN78oUhxyGEpuahfr1pMTWSLM0';
        const groupId = '-1002050844018';

        const message = encodeURIComponent(formData);
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${groupId}&text=${message}`;

        const response = await fetch(url, {
          method: 'POST',
        });

        if (response.ok) {
          showSuccessNotification();
          resetForm();
        } else {
          showErrorNotification();
        }
      } catch (error) {
        alert('Помилка сервера.');
        showErrorNotification();
      }
    }
  };
  const resetForm = () => {
    setName('');
    setPhoneNumber('');
    setSelectedPackage('');
    setCustomTime('');
  };

  const popupVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <AnimatePresence>
      <motion.div
        className={`popUp-wrapper `}
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {onCloseButton && (
          <svg
            onClick={onCloseButton}
            className="popUp-wrapper--closeButton"
            width="2.5rem"
            height="2.5rem"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#BF1616">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#Bf1616"
              strokeWidth="0.288"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="#BF1616"
                strokeWidth="1.5"
                strokeLinecap="round"></path>
            </g>{' '}
          </svg>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <label className="popUp-wrapper__label">
            Ваше ім'я
            <input
              type="text"
              name="Ваше ім'я"
              placeholder="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="popUp-wrapper__label">
            Ваш телефон
            <PhoneInput
              name="number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              country={'ua'}
              enableSearch
              inputStyle={{
                width: '100%',
                border: '1px solid black',
                borderRadius: '11px',
              }}
              placeholder="Введіть ваш номер"
              required
            />
          </label>
          <label className="popUp-wrapper__label">
            Коли вам передзвонити?
            <select
              value={timeSelection}
              onChange={(e) => {
                setTimeSelection(e.target.value);
                setIsImmediateTimeSelected(e.target.value === 'Найближчим часом');
                if (e.target.value === 'Інше') {
                  setCustomTime('');
                }
              }}
              name="Коли вам передзвонити?"
              required>
              <option value="Найближчим часом">Найближчим часом</option>
              <option value="Інше">Інше</option>
            </select>
            {timeSelection === 'Інше' && (
              <input
                type="datetime-local"
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                style={{ marginTop: '10px', borderRadius: '11px', width: '100%' }}
                min={getMinDateTime()}
                required
              />
            )}
          </label>
          <p className="popUp-wrapper__text">Який пакет послуг Вас цікавить?</p>
          <label className="popUp-wrapper__radio-label">
            <input
              type="radio"
              name="Пакет послуг"
              value="Авторський проєкт"
              onChange={(e) => setSelectedPackage(e.target.value)}
              style={{}}
              required
            />
            Авторський проєкт
          </label>
          <label className="popUp-wrapper__radio-label">
            <input
              type="radio"
              name="Пакет послуг"
              value="Міні-проєкт"
              onChange={(e) => setSelectedPackage(e.target.value)}
              style={{}}
              required
            />
            Міні-проєкт
          </label>
          <button className="popUp-wrapper__button" type="submit">
            Відправити
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

export default React.memo(PopUpContainer);
