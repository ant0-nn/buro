import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import Logo from '../../../img/white-logo.png';
import bg1 from '../../../img/bg1.jpg';
import bg2 from '../../../img/bg2.jpg';
import bg3 from '../../../img/bg3.jpg';
import bg4 from '../../../img/bg4.jpg';
import bg5 from '../../../img/bg5.jpg';
import "./carusel.scss";

const Carusel = () => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);
    const backgroundImageUrls = useMemo(() => [bg1, bg2, bg3, bg4, bg5], []);
    const backgroundImageUrl = backgroundImageUrls[currentPhotoIndex];
    
    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = backgroundImageUrl;
        preloadImage.onload = () => {
            document.querySelector('.carusel').style.backgroundImage = `url(${backgroundImageUrl})`;
            document.querySelector('.carusel').style.backgroundSize = `cover`;
            setBackgroundLoaded(true);
        };
    }, [backgroundImageUrl]);
    
    const goToNextPhoto = useCallback(() => {
        if (backgroundLoaded) {
            setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % backgroundImageUrls.length);
        }
    }, [backgroundImageUrls, backgroundLoaded]);
    
    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(goToNextPhoto, 10000);
    }, [goToNextPhoto]);
    
    useEffect(() => {
        intervalRef.current = setInterval(goToNextPhoto, 10000);
        return () => clearInterval(intervalRef.current);
    }, [goToNextPhoto]);
    
    const [dotsVisible, setDotsVisible] = useState(false);
    
    const toggleDotsVisibility = () => {
        setDotsVisible(!dotsVisible);
    };
    
    const handleDotClick = (index) => {
        if (backgroundLoaded) {
            setCurrentPhotoIndex(index);
            resetTimer();
        }
    };
    
    
    const intervalRef = useRef(null);
  return(
      <section className="carusel" id="carusel">
          <div className="container">
              <div className="carusel__info">
                  <img loading="lazy" src={Logo} alt="" className="carusel__logo"/>
                  <p className="carusel__title">Оселя з українською душею</p>
              </div>
              <div className={`dots ${dotsVisible ? 'visible' : ''}`} onClick={toggleDotsVisibility}>
                  {backgroundImageUrls.map((_, index) => (
                      <span
                          key={index}
                          className={`dotes ${index === currentPhotoIndex ? 'active' : ''}`}
                          onClick={() => handleDotClick(index)}></span>
                  ))}
              </div>
          </div>
          <div className="moreOurProjects__info">
              <h2 className="moreOurProjects__title">Наші проєкти</h2>
              <p className="moreOurProjects__subtitle">
                  У нас є можливість виконання проектів під ключ і для цього ми маємо надійних
                  підрядників, які здатні якісно закрити весь спектр необхідних послуг.
              </p>
          </div>
      </section>
  )
}

export default Carusel;