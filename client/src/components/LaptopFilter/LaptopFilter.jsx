import "./laptopFilter.scss";

const ProjectFilter = ({ filterOptions, selectedType, onChange }) => {

  const handleClick = (type) => {
    onChange(type);
  };

  return (
    <div className="project-flter">
        <div className="project-filter-wrapper">
      {filterOptions.map((filter) => (
        <button
          key={filter.type}
          onClick={() => handleClick(filter.type)}
          className={`filter-button ${selectedType === filter.type ? 'active' : ''}`}
        >
          {filter.name}
        </button>
      ))}
    </div>
    </div>
  );
};

export default ProjectFilter;
