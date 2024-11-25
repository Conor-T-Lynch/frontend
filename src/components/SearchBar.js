import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    onSearch('');       
  };

  return (
    <div className="container mt-4">
      <form className="form-inline justify-content-center" onSubmit={handleSubmit}>
        <div className="input-group w-50">
          
          <label htmlFor="searchInput" className="sr-only">
            Search for articles
          </label>
          <input
            type="text"
            id="searchInput"
            name="searchQuery"
            className="form-control"
            placeholder="Search for articles"
            value={searchQuery}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary mr-2">
              Search
            </button>
            <button type="button" className="btn btn-info" onClick={handleReset}>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
