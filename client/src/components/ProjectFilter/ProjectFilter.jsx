import React, { useState, useMemo } from 'react';
import { FaChevronDown } from "react-icons/fa";

const ProjectFilter = ({ filterOptions, selectedType, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleHovered = () => {
    setIsHovered(prevState => !prevState);
  };
  
  const selectedFilter = useMemo(() => {
    return filterOptions.find(option => option.type === selectedType);
  }, [selectedType, filterOptions]);
  
  const chevronRotationStyle = useMemo(() => ({
    transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
  }), [isHovered]);
  
  return (
    <div className={`moreOurProjects__dropdown ${isHovered ? 'hovered' : ''}`}>
      <button
        onClick={handleHovered}
        className="moreOurProjects__dropdown-button"
      >
        {selectedFilter ? selectedFilter.name : 'Всі проекти'} <FaChevronDown style={chevronRotationStyle}/>
      </button>
      <div className={`moreOurProjects__dropdown-content${isHovered ? ' hovered' : ''}`}>
        {filterOptions.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onChange(filter.type)}
            className="moreOurProjects__dropdown-buttons"
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectFilter;
