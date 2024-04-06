import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProjects, selectProjects} from '../../../store/fuatures/ProjectSlice';
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

function Buttons() {
  const dispatch = useDispatch();
  const [shownPhotosCount, setShownPhotosCount] = useState(16);
  const navigate = useNavigate();
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  useEffect(() => {
    if (projects.length > 0) {
      const projectId = parseInt(id, 10);
      if (!isNaN(projectId)) {
        const currentIndex = projects.findIndex(project => project.id === projectId);
        setCurrentIndex(currentIndex);
      }
    }
  }, [id, projects]);
  
  const goToNextProject = () => {
    if (projects && projects.length > 0) {
      const nextIndex = (currentIndex + 1) % projects.length;
      const nextProjectId = projects[nextIndex].id;
      navigate(`/projects/info/${nextProjectId}`);
    }
  };
  
  const goToPreviousProject = () => {
    if (projects && projects.length > 0) {
      const previousIndex = (currentIndex - 1 + projects.length) % projects.length;
      const previousProjectId = projects[previousIndex].id;
      navigate(`/projects/info/${previousProjectId}`);
      window.location.reload();
    }
  };
  return (
      <div className="buttons buttons-padding">
        <div className="buttons__wrapper" onClick={goToPreviousProject}>
          <div className="buttons__btn">
            <AiOutlineLeft className="buttons__button"/>
          </div>
          <span>Попередній проєкт</span>
        </div>
        <div className="buttons__wrapper" onClick={goToNextProject}>
          <span>Наступний проєкт</span>
          <div className="buttons__btn">
            <AiOutlineRight className="buttons__button"/>
          </div>
        </div>
        <span style={{ display: 'none' }}>Кількість показаних фотографій: {shownPhotosCount}</span>
      </div>
  );
}

export default Buttons;
