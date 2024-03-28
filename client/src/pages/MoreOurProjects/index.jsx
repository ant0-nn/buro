import  { useState, useEffect, useMemo, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/fuatures/ProjectSlice';
import Preloader from '../../components/Preloader';
import { GoArrowUpRight } from 'react-icons/go';
import { FaChevronDown } from "react-icons/fa";
import Carusel from "./carusel/Carusel.jsx";

function MoreOurProjects() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects)
  console.log(projects)
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialType = params.get('type') || 'all';
  const [type, setType] = useState(initialType);
  
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  
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
  
  const filteredProjects = useMemo(() => {
    if (type === 'all') {
      return projects;
    } else {
      return projects.filter(project => project.typeFilter === type);
    }
  }, [type, projects]);
  
  const handleHovered = useCallback(() => {
    setIsHovered(prevState => !prevState);
  }, []);
  const handleChange = (selectedType) => {
    setType(selectedType);
    navigate(`/projects?type=${selectedType}`);
    setIsHovered(false);
  };
  
  const typeWatch = () => {
    const information = filterOptions.find(block => block.type === type)
    return information.name
  }
  
  const chevronRotationStyle = useMemo(() => ({
    transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease', // Додайте плавну анімацію
  }), [isHovered]);
  
  return (
      <section className="moreOurProjects">
        <Preloader />
        <Carusel />
        <div className="moreOurProjects-section">
          <div className="container">
            <div className="moreOurProjects__filter-buttons">
              <div className={`moreOurProjects__dropdown ${isHovered ? 'hovered' : ''}`}>
                <button
                    onClick={handleHovered}
                    className="moreOurProjects__dropdown-button"
                >
                  {typeWatch()} <FaChevronDown style={chevronRotationStyle}/>
                </button>
                <div className={`moreOurProjects__dropdown-content${isHovered ? ' hovered' : ''}`}>
                  {filterOptions.map((filter) => (
                      <button
                          key={filter.name}
                          onClick={() => handleChange(filter.type)} // Правильно передаємо тип фільтра
                          className="moreOurProjects__dropdown-buttons"
                      >
                        {filter.name}
                      </button>
                  ))}
                </div>
              </div>
              {/*<div className="moreOurProjects__dropdown">*/}
              {/*  <select*/}
              {/*      id="filter"*/}
              {/*      name="filter"*/}
              {/*      value={type}*/}
              {/*      onChange={handleChange}*/}
              {/*      className="moreOurProjects__dropdown-button"*/}
              {/*  >*/}
              {/*    {filterOptions.map(option => (*/}
              {/*        <option key={option.type} value={option.type}>{option.name}</option>*/}
              {/*    ))}*/}
              {/*  </select>*/}
              {/*</div>*/}
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
                        src={`http://139.28.37.125:8000/img/${project.mainimage}`}
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
