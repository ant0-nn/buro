/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/fuatures/ProjectSlice';
import First from '../Main/First/First';
import Preloader from '../../components/Preloader';
import { GoArrowUpRight } from 'react-icons/go';
import { FaChevronDown } from "react-icons/fa";

function MoreOurProjects() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Всі проекти');
  console.log("rendering page");
  
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);
  
  const filterOptions = useMemo(() => [
    {
      type: "all",
      name: "Всі проекти"
    },
    {
      type: "private",
      name: "Приватні простори"
    },
    {
      type: "commerce",
      name: "Комерційні приміщення"
    },
    {
      type: "architecture",
      name: "Архітектура та будівництво"
    },
  ], []);
  
  const typeFilter = useCallback((filterType) => {
    const selectedFilterObj = filterOptions.find(option => option.type === filterType);
    setSelectedFilter(selectedFilterObj ? selectedFilterObj.name : 'Всі проекти');
    setIsHovered(false);
    if (filterType === 'all') {
      setFilteredProjects(projects);
      setIsHovered(false);
    } else {
      const filtered = projects.filter((project) => project.typeFilter === filterType);
      setFilteredProjects(filtered);
      setIsHovered(false);
    }
  }, [projects, filterOptions]);
  
  const handleHovered = useCallback(() => {
    setIsHovered(prevState => !prevState);
  }, []);
  
  const chevronRotationStyle = useMemo(() => ({
    transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease', // Додайте плавну анімацію
  }), [isHovered]);
  
  return (
      <section className="moreOurProjects">
        <Preloader />
        <First />
        <div className="moreOurProjects-section">
          <div className="moreOurProjects__info">
            <h2 className="moreOurProjects__title">Наші проєкти</h2>
            <p className="moreOurProjects__subtitle">
              У нас є можливість виконання проектів під ключ і для цього ми маємо надійних
              підрядників, які здатні якісно закрити весь спектр необхідних послуг.
            </p>
          </div>
          <div className="container">
            <div className="moreOurProjects__filter-buttons">
              <div className={`moreOurProjects__dropdown ${isHovered ? 'hovered' : ''}`}>
                <button
                    onClick={handleHovered}
                    className="moreOurProjects__dropdown-button"
                >
                  {selectedFilter} <FaChevronDown style={chevronRotationStyle}/>
                </button>
                <div className={`moreOurProjects__dropdown-content${isHovered ? ' hovered' : ''}`}>
                  {filterOptions
                      .filter((filter) => filter.name !== selectedFilter)
                      .map((filter) => (
                          <button
                              key={filter.name}
                              onClick={() => typeFilter(filter.type)}
                              className="moreOurProjects__dropdown-buttons"
                          >
                            {filter.name}
                          </button>
                      ))}
                </div>
              </div>
            </div>
            <div className="moreOurProjects__wrapper">
              {filteredProjects.map((project) => (
                  <NavLink
                      key={project.id}
                      to={`/projects/info/${project.id}`}
                      className="moreOurProjects__block"
                  >
                    <img
                        loading="lazy"
                        src={`data:image/jpeg;base64,${project.mainimage}`}
                        alt={project.name}
                        className="moreOurProjects__block__img"
                    />
                    <div className="moreOurProjects__block__info">
                      <h3 className="moreOurProjects__block__name">{project.name}</h3>
                      <span className="moreOurProjects__block__square">{project.square}</span>
                      <GoArrowUpRight className="moreOurProjects__block__arrow"/>
                    </div>
                  </NavLink>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export default MoreOurProjects;
