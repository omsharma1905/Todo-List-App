import React from "react";

const FilterBar = ({ filter, setFilter, theme, changeTheme }) => {
  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>All</button>
        <button className={filter === "Completed" ? "active" : ""} onClick={() => setFilter("Completed")}>Completed</button>
        <button className={filter === "Incomplete" ? "active" : ""} onClick={() => setFilter("Incomplete")}>Incomplete</button>
      </div>
      <button className="theme-toggle" onClick={changeTheme}>
        <i className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"}`}></i>
      </button>
    </div>
  );
};

export default FilterBar;