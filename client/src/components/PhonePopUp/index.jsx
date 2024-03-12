/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import './style.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PhonePopUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);

  const handlePhoneButtonClick = () => {
    setIsPhonePopupOpen(!isPhonePopupOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        if (!phonePattern.test(phoneNumber)) {
        toast.error('Будь ласка, введіть коректний номер телефону.');
        return;
        }

    try {
      const botToken = '6809113635:AAEAPNVeXhN78oUhxyGEpuahfr1pMTWSLM0';
      const groupId = '-1002050844018';

      const formData = `
        📞 Запит на дзвінок!\n\n📱 Номер телефону: ${phoneNumber}
      `;

      const message = encodeURIComponent(formData);
      const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${groupId}&text=${message}`;

      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Ваш номер телефону було надіслано успішно.');
        setIsSubmitting(false);
        setIsPhonePopupOpen(false);
      } else {
        toast.error('Помилка! Не вдалося відправити форму.');
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Помилка сервера.');
      toast.error('Помилка! Не вдалося відправити форму.');
      setIsSubmitting(false);
    }
  };
  return (
    <section className="phonePopUp">
      <button onClick={handlePhoneButtonClick} title="form" className="phonePopUp-button">
        {isPhonePopupOpen ? (
          <svg
            width="30px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.35220 21.1362 3.71903 20.7457 3.32851Z"
              fill="#000000"
            />
          </svg>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_22_6)">
              <path
                d="M8.33309 6.6665H14.9998L18.3331 14.9998L14.1664 17.4998C15.9514 21.1191 18.8805 24.0482 22.4998 25.8332L24.9998 21.6665L33.3331 24.9998V31.6665C33.3331 32.5506 32.9819 33.3984 32.3568 34.0235C31.7317 34.6486 30.8838 34.9998 29.9998 34.9998C23.4985 34.6048 17.3667 31.844 12.7611 27.2385C8.1556 22.6329 5.39484 16.5011 4.99976 9.99984C4.99976 9.11578 5.35095 8.26794 5.97607 7.64281C6.60119 7.01769 7.44903 6.6665 8.33309 6.6665Z"
                stroke="black"
                strokeWidth="1.44348"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.9998 11.6665C25.8838 11.6665 26.7317 12.0177 27.3568 12.6428C27.9819 13.2679 28.3331 14.1158 28.3331 14.9998"
                stroke="black"
                strokeWidth="1.44348"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.9998 5C27.6519 5 30.1955 6.05357 32.0708 7.92893C33.9462 9.8043 34.9998 12.3478 34.9998 15"
                stroke="black"
                strokeWidth="1.44348"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_22_6">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
      {isPhonePopupOpen && (
        <div className="phonePopUp-container">
          <h2 className="phonePopUp-container--title">
            Залишіть свій номер телефону і ми зв'яжемося з вами
          </h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="tel"
              placeholder="Ваш номер телефону"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="submit" disabled={isSubmitting}>
              Подзвонити!
            </button>
          </form>
          <p className="phonePopUp-container--text">
            Або ви можете подзвонити нам за цим номером телефону:{' '}
            <a href="tel:+380989498648">+380 (98) 949 86 48</a>
          </p>
        </div>
      )}
        </section>
    );
}

export default React.memo(PhonePopUp);
