import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects, selectLoading } from '../../../store/fuatures/ProjectSlice';
import Logo from '../../../img/white-logo.png';
import './first.scss';
// import { projects } from '../../../data/projects';
import MoreProject from '../../../components/MoreProject/MoreProject';
import PhonePopUp from '../../../components/PhonePopUp';
import bg1 from './img/bg.png';
import bg2 from './img/bg2.png';
import bg3 from './img/bg3.png';
import bg4 from './img/bg4.png';
import bg5 from './img/bg5.png';
import Preloader from "../../../components/Preloader/index.jsx";

const First = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const newProjects = projects.filter((project) => project.section === 'new');
  // const newProjects = projects.filter((project) => project.section === 'new');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const projectsWrapperStyle =
    location.pathname === '/projects' ? { paddingBottom: '2rem', height: '40rem' } : {};

  const backgroundImageUrls = useMemo(() => [bg1, bg2, bg3, bg4, bg5], []);

  const backgroundImageUrl = backgroundImageUrls[currentPhotoIndex];

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = backgroundImageUrl;
    preloadImage.onload = () => {
      document.querySelector('.First').style.backgroundImage = `url(${backgroundImageUrl})`;
      document.querySelector('.First').style.backgroundSize = `cover`;
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
  return (
    <section className="First" id="First" style={{ ...projectsWrapperStyle }}>
      <div className="container">
        <div className="First-content">
          <div className="First__info">
            <img loading="lazy" src={Logo} alt="" className="First__logo" />
            <p className="First__title">Оселя з українською душею</p>
          </div>
          <div className={`dots ${dotsVisible ? 'visible' : ''}`} onClick={toggleDotsVisibility}>
            {backgroundImageUrls.map((_, index) => (
              <span
                key={index}
                className={`dotes ${index === currentPhotoIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}></span>
            ))}
          </div>
          {!location.pathname.includes('/projects') && (
            <div className="First__projects">
              <h3 className="First__projects__title">Проєкти</h3>
              <div className="First__projects__wrapper">
                {newProjects.slice(0, 3).map((item) => (
                  <Link
                    to={`/projects/info/${item.id}`}
                    className="First__projects__block"
                    key={item.id}>
                    <img
                      loading="lazy"
                      src={`data:image/jpeg;base64,${item.mainimage}`}
                      className="First__projects__img"
                      alt=""
                    />
                    <div className="First__projects--container">
                      <span className="First__projects--number">{item.id}</span>
                      <p className="First__projects--title">{item.name}</p>
                      <p className="First__projects--square">{item.square}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <MoreProject />
            </div>
          )}
        </div>
      </div>
      <PhonePopUp />
    </section>
  );
};

export default First;
