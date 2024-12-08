//@Reference https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
//@Reference https://blog.logrocket.com/create-search-bar-react-from-scratch/
//@Reference https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js
//@Reference https://dev.to/ma7moud3bas/build-a-live-search-bar-in-react-a-step-by-step-guide-2ibh
//Importing React and the useState hook for managing state
//@Reference https://www.w3schools.com/REACT/default.asp
//@Reference https://www.w3schools.com/REACT/react_forms.
//@Reference https://www.w3schools.com/REACT/react_usestate.asp
//@Reference https://www.w3schools.com/react/react_es6.asp
import React, { useState } from 'react';
//Functional component for the search bar
const SearchBar = ({ onSearch }) => {
  //State to manage the search query inout
  const [searchQuery, setSearchQuery] = useState('');
  //Function to handle changes in the input field and update the state
  const handleChange = (e) => {
    //Update the searchQuery state with the input value
    setSearchQuery(e.target.value);
  };
  //Function to handle the form submission
  const handleSubmit = (e) => {
    //Prevents the default form submission behavior
    e.preventDefault();
    //Only call onsearch if the search query is not empty
    if (searchQuery.trim()) {
      //Calls the onSearch function passed as a prop with the search query
      onSearch(searchQuery);
    }
  };
  //Function to handle the reset action, by clearing the search query and triggering it with an empty search
  const handleReset = () => {
    //Resets the search query to an empty string
    setSearchQuery('');
    //Trigger the onSearch function with an empty query to clear the search results
    onSearch('');       
  };
  //Rendering the search bar
  return (
    <div className="container mt-4">
      {/* Form to contain the input field and buttons. Uses inline form layout and centers it */}
      <form className="form-inline justify-content-center" onSubmit={handleSubmit}>
        <div className="input-group w-50">
          {/* Input group for text field and buttons, sets the width to 50% */}
          <label htmlFor="searchInput" className="sr-only">
            Search for articles
          </label>
          {/* Input fields */}
          <input
            type="text"
            id="searchInput"
            name="searchQuery"
            className="form-control"
            placeholder="Search for articles"
            //Binds input value to the searchQuery state
            value={searchQuery}
            //Calls the handleChange when input changes
            onChange={handleChange}
          />
          {/* Div to wrap the buttons, aligns them next to the input */}
          <div className="input-group-append">
            {/* Submit button to trigger the search action */}
            <button type="submit" className="btn btn-primary mr-2">
              Search
            </button>
            {/* Button to reset the search query and clear the search */}
            <button type="button" className="btn btn-info" onClick={handleReset}>
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
//Exporting the SearchBar component to be used in other parts of the application
export default SearchBar;
