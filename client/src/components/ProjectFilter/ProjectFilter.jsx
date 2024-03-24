import { useState, useMemo, useCallback } from 'react';
import { FaChevronDown } from "react-icons/fa";

function ProjectFilter({ filterOptions, selectedFilter, onSelectFilter }) {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleHovered = useCallback(() => {
        setIsHovered(!isHovered);
    }, []);
    
    const chevronRotationStyle = useMemo(() => ({
        transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
    }), [isHovered]);
    
    return (
        <div className={`moreOurProjects__dropdown ${isHovered ? 'hovered' : ''}`}>
            <button onClick={handleHovered} className="moreOurProjects__dropdown-button">
                {selectedFilter} <FaChevronDown style={chevronRotationStyle}/>
            </button>
            <div className={`moreOurProjects__dropdown-content${isHovered ? ' hovered' : ''}`}>
                {filterOptions
                    .filter((filter) => filter.name !== selectedFilter)
                    .map((filter) => (
                        <button
                            key={filter.type}
                            onClick={() => onSelectFilter(filter.type)} // змінено на filtemer.na
                            className="moreOurProjects__dropdown-buttons"
                        >
                            {filter.name}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default ProjectFilter;