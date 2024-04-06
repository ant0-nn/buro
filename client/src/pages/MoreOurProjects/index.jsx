import  { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, selectProjects } from '../../store/fuatures/ProjectSlice';
import Preloader from '../../components/Preloader';
import { GoArrowUpRight } from 'react-icons/go';
import Carusel from "./carusel/Carusel.jsx";
import ProjectFilter from "../../components/ProjectFilter/ProjectFilter.jsx";
import LaptopFilter from "../../components/LaptopFilter/LaptopFilter.jsx";
import useMediaQuery from '../../hooks/useMediaQuery.jsx'; 

function MoreOurProjects() {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects)
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
  
  // Визначаємо, чи ми на мобільному пристрої чи на комп'ютері
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Вибираємо відповідний фільтр залежно від типу пристрою
  const FilterComponent = isMobile ? ProjectFilter : LaptopFilter;
  
  const filteredProjects = useMemo(() => {
    if (type === 'all') {
      return projects;
    } else {
      return projects.filter(project => project.typeFilter === type);
    }
  }, [type, projects]);
  
  const handleChange = (selectedType) => {
    setType(selectedType);
    navigate(`/projects?type=${selectedType}`);
  };
  
  return (
    <section className="moreOurProjects">
      <Preloader />
      <Carusel />
      <div className="moreOurProjects-section">
        <div className="container">
          <div className="moreOurProjects__filter-buttons">
            {/* Використовуємо вибраний компонент фільтра */}
            <FilterComponent
              filterOptions={filterOptions}
              selectedType={type}
              onChange={handleChange}
            />
          </div>
          <div className="moreOurProjects__wrapper">
            {filteredProjects.map((project) => (
              <NavLink
                key={project.id}
                to={`/projects/info/${project.id}`}
                className="moreOurProjects__block"
              >
                <img
                  src={`http:///img/${project.mainimage}`}
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
