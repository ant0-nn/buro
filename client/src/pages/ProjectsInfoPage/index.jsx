import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProjectById,
  selectProjectById,
} from '../../store/fuatures/ProjectSlice';
import Header from '../../components/Header';
import './style.scss';
import Buttons from './Buttons/index.jsx';
import Modal from './Modal';
import Preloader from "../../components/Preloader/index.jsx";

const ProjectInfo = () => {
  const [shownPhotosCount, setShownPhotosCount] = useState(16);
  const { id: routeId } = useParams(); // Отримати id з параметрів шляху
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const project = useSelector((state) => selectProjectById(state, id));
  const [showSlider, setShowSlider] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  
  
  useEffect(() => {
    // Якщо routeId не є undefined, тоді встановлюємо його значення у стані компонента
    if (routeId !== undefined) {
      setId(routeId);
    }
  }, [routeId]); // Перевірка зміни параметрів шляху
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== null) {
          await dispatch(getProjectById(id));
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    
    fetchData();
  }, [dispatch, id]);
  
  useEffect(() => {
    // Скидання кількості показаних фотографій при зміні проекту
    setShownPhotosCount(16);
  }, [project]);
  
  const handleLoadMorePhotos = (event) => {
    event.stopPropagation();
    setShownPhotosCount((prevCount) => prevCount + 16);
  };

  let projectBlockInfoStyle = {};

  if (project !== null) {
    projectBlockInfoStyle = {
      backgroundImage: `url(/img/${project.mainimage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  const handlePrev = () => {
    if (sliderIndex > 0) {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const handleNext = () => {
    if (sliderIndex < project.images.length - 1) {
      setSliderIndex(sliderIndex + 1);
    }
  };

  return (
    <div className="project-container">
      <Preloader />
      <Header />
      {project !== null && (
        <div className="project-container__info" style={projectBlockInfoStyle}>
          <div className="project-container__intro">
            <div className="project-container__wrapper">
              <h1 className="project-container__title">{project.name}</h1>
              <div className="project-container__description">
                <span className="project-container__subtitle">{project.square}</span>
                <span className="project-container__subtitle">{project.city}</span>
                <span className="project-container__subtitle">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="project-container__photo">
        <div className="container">
          <Buttons id={id} />
          {project !== null && (
            <div className="project-info">
              {project.images.slice(0, shownPhotosCount).map((item, i) => (
                <div
                  className="project-info__item"
                  key={i}
                  onClick={() => {
                    setSliderIndex(i);
                    setShowSlider(true);
                  }}>
                  <img
                    key={i}
                    className="project-info__img"
                    src={`/img/${item}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
          {project !== null && shownPhotosCount < project.images.length && (
            <button className="project-info__load-more" onClick={handleLoadMorePhotos}>
              Показати більше
            </button>
          )}
          <Buttons />
        </div>
        {showSlider && (
          <Modal
            onClose={() => setShowSlider(false)}
            imageSrc={project.images[sliderIndex]}
            imageAlt="gallery image"
            onPrev={handlePrev}
            onNext={handleNext}
            isPrevDisabled={sliderIndex === 0}
            isNextDisabled={sliderIndex === project.images.length - 1}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
