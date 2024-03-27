import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProjects, selectProjects} from '../../../store/fuatures/ProjectSlice';

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none">
              <g clipPath="url(#clip0_0_40643)">
                <path
                    d="M16.875 20.252L10.125 13.502L16.875 6.75195"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_40643">
                  <rect width="27" height="27" fill="white" transform="matrix(0 -1 -1 0 27 27)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span>Попередній проєкт</span>
        </div>
        <div className="buttons__wrapper" onClick={goToNextProject}>
          <span>Наступний проєкт</span>
          <div className="buttons__btn">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none">
              <g clipPath="url(#clip0_0_40650)">
                <path
                    d="M10.125 20.252L16.875 13.502L10.125 6.75195"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_0_40650">
                  <rect width="27" height="27" fill="white" transform="matrix(0 -1 1 0 0 27)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <span style={{ display: 'none' }}>Кількість показаних фотографій: {shownPhotosCount}</span>
      </div>
  );
}

export default React.memo(Buttons);
