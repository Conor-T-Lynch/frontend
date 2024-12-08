//@Reference https://apidog.com/blog/react-axios-post/
//@Reference https://letsreact.org/making-http-requests-using-axios/
//@Reference https://dev.to/cesareferrari/create-a-form-for-updating-a-remote-item-with-react-7of
//@Reference https://www.kindacode.com/article/how-to-fetch-data-with-axios-and-hooks-in-react
//@Reference https://www.w3schools.com/REACT/default.asp
//@Reference https://www.w3schools.com/REACT/react_forms.asp
//@Reference https://www.w3schools.com/REACT/react_usestate.asp
//@Reference https://www.w3schools.com/REACT/react_useeffect.asp
//@Reference https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
//@Reference https://www.w3schools.com/react/react_es6.asp
//@Reference https://codersdesiderata.com/2023/06/21/fetching-data-with-async-await-in-a-react-component/
//Import React and necessary hooks for state and lifecycle management
import React, { useState, useEffect } from 'react';
//Import axios for HTTP requests
import axios from 'axios';

//Helper funtion to format the date for a more readable interface 
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  //Ensures to get two digits for month
  const month = String(d.getMonth() + 1).padStart(2, '0');
  //Ensures to get two digits for day
  const day = String(d.getDate()).padStart(2, '0');
  //Returns the formatted data
  return `${year}-${month}-${day}`;
};
//Functional component for the article form
const ArticleForm = ({ article, onSave, fetchArticles, onBack }) => {
  //State for the form data, initialized with empty fields
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    publish_date: '',
  });
  //State for feedback messages displayed to the user
  const [feedbackMessage, setFeedbackMessage] = useState('');
  //Effect hook to set form data when the article prop changes
  useEffect(() => {
    if (article) {
      //Populate the form with articles data when editing
      setFormData({
        title: article.title,
        author: article.author,
        content: article.content,
        publish_date: formatDate(article.publish_date),
      });
    } else {
      //Clears the form data when creating a new article
      setFormData({
        title: '',
        author: '',
        content: '',
        publish_date: '',
      });
    }
     //Runs when the article prop changes
  }, [article]);
  //Handle changes to form inputs
  const handleChange = (e) => {
    //Extract name and value of the changes input
    const { name, value } = e.target;
    //Updates the corresponding field in formData
    setFormData({ ...formData, [name]: value });
  };
  //Handle form submission for creating or updating an article
  const handleSubmit = async (e) => {
    //Prevents default submission behavior
    e.preventDefault();

    try {
      if (article) {
        //Update an existing article
        const response = await axios.put(
          //API endpoint for updating
          `http://34.193.120.111:3000/articles/${article.id}`,
          //Send formData in the request body
          formData
        );
        //Display the success message
        setFeedbackMessage('Article updated successfully!');
        //Log the response for debugging perposes
        console.log('Updated article:', response.data);
      } else {
        //Create a new article, API endpoint for updating
        await axios.post('http://34.193.120.111:3000/articles', formData);
        //Display the success message
        setFeedbackMessage('Article created successfully!');
      }
      //Refresh the list of articles
      fetchArticles();
      //Modify perent comonent of save completion
      onSave();
    } catch (error) {
      //Log error for debugging
      console.error('Error saving article:', error);
      //Displays error message 
      setFeedbackMessage('An error occurred while saving the article.');
    }
  };
  //Rendering the form
  return (
    <form onSubmit={handleSubmit}>
      {/* Title input */}
      <div className="form-group">
        <label htmlForm="title">Title</label>
        <input
          type="text"
          id="title"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      {/* Author input */}
      <div className="form-group">
        <label htmlForm="author">Author</label>
        <input
          type="text"
          id="author"
          className="form-control"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      {/* Content input */}
      <div className="form-group">
        <label htmlForm="content">Content</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      {/* Publish Date input */}
      <div className="form-group">
        <label htmlForm="publish_date">Publish Date</label>
        <input
          type="date"
          id="publish_date"
          className="form-control"
          name="publish_date"
          value={formData.publish_date}
          onChange={handleChange}
          required
        />
      </div>
      {/* Submit button with dynamic label for creating or updating */}
      <button type="submit" className="btn btn-primary mt-3">
        {article ? 'Update Article' : 'Create Article'}
      </button>
      {/* Back button, displayed if `onBack` is provided */}
      {onBack && (
        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={onBack}>
          Back
        </button>
      )}
      {/* Feedback message displayed to the user */}
      {feedbackMessage && (
        <div className="alert alert-info mt-3" role="alert">
          {feedbackMessage}
        </div>
      )}
    </form>
  );
};
//Export the ArticleForm component as the default export
export default ArticleForm;
