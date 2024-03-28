/* eslint-disable react/prop-types */

function Modal({ onClose, imageSrc, imageAlt, onPrev, onNext, isPrevDisabled, isNextDisabled }) {
  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => onClose()}>
          ×
        </button>
        <div className="modal-slider">
          <button className="modal-arrow prev" disabled={isPrevDisabled} onClick={onPrev}>
            &lt;
          </button>
          <img
            loading="lazy"
            className="modal-img"
            src={`http://139.28.37.125:8000/img/${imageSrc}`}
            alt={imageAlt}
          />
          <button className="modal-arrow next" disabled={isNextDisabled} onClick={onNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;