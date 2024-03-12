import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../../store/fuatures/ProjectSlice';

function Buttons() {
  const [shownPhotosCount, setShownPhotosCount] = useState(16);
  const navigate = useNavigate();
  const { id } = useParams();
  const projects = useSelector(selectProjects);
  const projectId = parseInt(id, 10);
  const projectIndex = projects.findIndex((block) => block.id === projectId);
  
  useEffect(() => {
    setShownPhotosCount(16);
  }, [projectId]);
  
  const goToNextProject = () => {
    const nextProjectIndex = (projectIndex + 1) % projects.length;
    
    if (projects.length > 0 && nextProjectIndex >= 0) {
      const nextProjectId = projects[nextProjectIndex].id;
      navigate(`/projects/info/${nextProjectId}`);
    }
  };
  
  const goToPreviousProject = () => {
    const previousProjectIndex = (projectIndex - 1 + projects.length) % projects.length;
    
    if (projects.length > 0 && previousProjectIndex >= 0) {
      const previousProjectId = projects[previousProjectIndex].id;
      navigate(`/projects/info/${previousProjectId}`);
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
