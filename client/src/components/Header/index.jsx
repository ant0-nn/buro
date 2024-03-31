import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import PopUpContainer from '../PopUp/PopUp-container/index.jsx';
import Logo from '../../img/white-logo.webp';
import { scroller } from 'react-scroll';
import './style.scss';

function Header() {
    const location = useLocation();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isPopupSubmitted, setPopupSubmitted] = useState(false);
    const [nav, setNav] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollTop = useRef(0);
    const [isScrollLocked, setScrollLocked] = useState(false);
    
    
    useLayoutEffect(() => {
        const handleScroll = () => {
            if (nav) {
                // Якщо навбар активний, просто повертати
                return;
            }
            const { pageYOffset } = window;
            
            const isNavbarOpened = document.querySelector('.navbar.opened');
            
            if (!isNavbarOpened) {
                if (pageYOffset > lastScrollTop.current) {
                    setIsHeaderVisible(false);
                } else if (pageYOffset < lastScrollTop.current) {
                    setIsHeaderVisible(true);
                }
                lastScrollTop.current = pageYOffset;
            }
        };
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [nav]);
    
    useEffect(() => {
        if (isScrollLocked) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isScrollLocked]);


    const handleMobileNavClick = () => {
        setNav(false);
    };

    const openPopup = () => {
        setPopupVisible(true);
        setPopupSubmitted(true);
        document.body.classList.add('no-scroll');
    };

    const closePopup = () => {
        setPopupVisible(false);
        document.body.classList.remove('no-scroll');
    };

    const scrollToElement = (elementId) => {
        scroller.scrollTo(elementId, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -70,
        });
    };

    const handleClick = (elementId) => {
        if (location.pathname === '/') {
        scrollToElement(elementId);
        } else {
        window.location.replace(`/`);
        setTimeout(() => {
            scrollToElement(elementId);
        }, 1000);
        }
        handleMobileNavClick();
    };

    return (
        <header className={`header ${isHeaderVisible ? "visible" : ""}`}>
        <div className="container">
            <div className="header-block">
            <a onClick={() => handleClick('First ')}>
                <img loading="lazy" src={Logo} alt="logo" className="header-logo" />
            </a>
            <div className={`header-wrapper ${nav ? 'active' : ''}`}>
                <div className="header-info">
                <ul className="header-list">
                    <li className="header-list__item">
                    <span onClick={() => handleClick('AboutUs')}>Про нас</span>
                    </li>
                    <Link to="/projects" className="header-list__item">
                    <span >Проєкти</span>
                    </Link>
                    <li className="header-list__item">
                    <span onClick={() => handleClick('OurWork')}>Як ми працюємо</span>
                    </li>
                    <li className="header-list__item">
                    <span onClick={() => handleClick('Services')}>Послуги</span>
                    </li>
                </ul>
                <button className="header__btn" onClick={openPopup}>
                    Безкоштовний розрахунок
                </button>
                </div>
            </div>
            <div onClick={() => {
                setNav(!nav)
                setScrollLocked(!isScrollLocked)
                }}
                 className="header__btns ">
                <div className={`menu-icon ${nav ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>
            </div>
        </div>
        {isPopupVisible && (
            <div className="popup-overlay">
            <PopUpContainer
                onClose={closePopup}
                source="кнопка в меню"
                onCloseButton={() => {
                closePopup();
                setPopupSubmitted(false);
                }}
                isOpenByButton={isPopupSubmitted}
            />
            </div>
        )}
        </header>
    );
}

export default Header;