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
  const projects = useSelector(selectProjects);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeParam = searchParams.get('type');
  const [selectedFilter, setSelectedFilter] = useState(typeParam || 'Всі проекти');
  console.log(selectedFilter)
  
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
    const selectedFilterName = selectedFilterObj ? selectedFilterObj.name : 'Всі проекти';
    setSelectedFilter(selectedFilterName);
    setIsHovered(false);
    
    if (filterType === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.typeFilter === filterType);
      setFilteredProjects(filtered);
    }
    
    // Зміна URL з додаванням #residential
    navigate(`/projects?filter=${filterType}`);
  }, [projects, filterOptions, navigate]);
  
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
        <Carusel />
        <div className="moreOurProjects-section">
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
