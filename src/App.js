//@Reference https://apidog.com/blog/react-axios-post/
//@Reference https://letsreact.org/making-http-requests-using-axios/
//@Reference https://www.kindacode.com/article/how-to-fetch-data-with-axios-and-hooks-in-react
//@Reference https://www.w3schools.com/REACT/react_router.asp
//@Reference https://www.w3schools.com/react/react_es6.asp
//Importing the necessary react usestate and useeffect, and the library components.
import React, { useState, useEffect } from 'react';
//Importing bootstrap styles for the UI design for the views of the app.
import 'bootstrap/dist/css/bootstrap.min.css';
//Enabling the routing functionality for the application.
import { BrowserRouter as Router } from 'react-router-dom';
//Http client for the API requests from the backend rails API.
import axios from 'axios';
//Component for handling the search input field, for the unique library that adds meaningful functionality to the app.
import SearchBar from './components/SearchBar';
//Component for displaying a array list of articles in a react table.
import ArticleTable from './components/ArticleTable';
//Compnent for creating and editing an article using a form layout, that can be switched from create to edit and will.
import ArticleForm from './components/ArticleForm';

//The main app component.
const App = () => {
  //Search query input from the user, defaults to empty query until a query has been made by the user.
  const [searchQuery, setSearchQuery] = useState('');
  //The list of articles fetched from the backend server in an array , in Json format.
  const [articles, setArticles] = useState([]);
  //Boolen to change the state of the form from create to editing, if the user decides not to edit the article they can return to the create article form.
  const [isEditing, setIsEditing] = useState(false);
  //Sets the current article that is being edited, if the user decides to edit the article sets the current article to be edited.
  const [currentArticle, setCurrentArticle] = useState(null);
  //Function that fetches the articles from the rails backend API app.
  const fetchArticles = async (query) => {
    try {
      //checks for presnt queries, defaulted to an empty query so as not to make any unnessesary search.
      const params = query ? { search: query } : {};
      //API call to the EC2 instance public IP to fetch the articles from the backend API data in Json format.
      const response = await axios.get('http://34.193.120.111:3000/articles', { params });
      //Updates the articles state with the fetched data from the rails backend API.
      setArticles(response.data);
      //Logs any errors if the API call should fail to fetch the data from the backebd server.
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  //Hook to fetch the searched article whenever a search query changes within the search bar field.
  useEffect(() => {
    fetchArticles(searchQuery);
  }, [searchQuery]);

  //Function for user input for a search from the search query.
  const handleSearch = (query) => {
    //Updates the state when a query has been made by the user.
    setSearchQuery(query);
  };

  //Function for saving the created article.
  const handleSave = async () => {
    //Resets the the articles on the table after the user has finished creating, saving or editing an article.
    fetchArticles();
  };

  //Function for editing an article.
  const handleEdit = (article) => {
    //Boolean value that changes the create article form to the editing form.
    setIsEditing(true);
    //If editing, setting the current article to be editied.
    setCurrentArticle(article);
  };

  //Function for deleting an article by its ID.
  const handleDelete = async (id) => {
    try {
      //API call to the backend, to delete an article by its ID.
      await axios.delete(`http://34.193.120.111:3000/articles/${id}`);
      //Resets the current state of the articles in the table, to show the updated table of the article deleted.
      fetchArticles();
    } catch (error) {
      //Logs any errors if the article was not deleted.
      console.error('Error deleting article:', error);
    }
  };

  //Function for the View article functionality.
  const handleView = (article) => {
    //PLaceholder functionality for viewing any article.
    alert(`Viewing article: ${article.title}`);
  };

  //Function for the back option for when the user does not want to edit the article.
  const handleBack = () => {
    //PLaceholder functionality to handle the back button for when deciding not to edit an article.
    setIsEditing(false);
    //Clearing the currently edited article, after the user has decided not to edit the article.
    setCurrentArticle(null);
  };

  //Embedded HTML for the views, the frontend UI of the app itself, styled in bootstrap classes.
  return (
    //Wraps the application in a router to enable routing functionality, helped in cors policey errors that would not allow the frontend to comuinicate with the backend due to being on different ports/domains.
    <Router>
      {/*  Bootstrap container, top margin  */}
      <div className="container mt-5">
        {/*  Main title  */}
        <h1 className="mb-4 text-center">News Article System</h1>
        {/*  Searchbar bottom margin  */}
        <div className="mb-4">
          <SearchBar
          //Function that handles search input changes from the user in real-time.
            onSearch={handleSearch}
            //The current search query state to be displayed in the table, made by the user in real-time.
            query={searchQuery}
            //Function to clear the search query, set to empty search so as all articles are visable in the table again.
            onReset={() => setSearchQuery('')}
          />
        </div>
        {/*  Displying the articles in a table, bottom margin */}
        <div className="mb-4">
          <ArticleTable
            //Passing the current search query as a prop for filtering or display, into the article table.
            searchQuery={searchQuery}
            //Function that handles the editing of an article, when the user interacts with the edit form.
            onEdit={handleEdit}
            //Function that handles the deleting of an article, when the user deletes an article from the table.
            onDelete={handleDelete}
            //Function that handles the viewing of an article, when the user views an article from the table.
            onView={handleView}
            //The Json array of articles being fecthed from the backend server, AWS EC2 instance.
            articles={articles}
          />
        </div>
        {/*  Creating/Editing form, top margin */}
        <div className="mt-4">
          {/*  Form selector, create/edit */}
          <h3 className="mb-3 text-center">{isEditing ? 'Edit' : 'Create'} Article</h3>
          <ArticleForm
            //Passing the article that has been created/edited, by the user.
            article={currentArticle}
            //Function that handles the saving of the form, be it the create or edit form.
            onSave={handleSave}
            //Function to reset the articles table when an article has been created/edited, by the user.
            fetchArticles={fetchArticles}
            //Function to cancel editing by the user and return to the create form instead.
            onBack={handleBack}
          />
        </div>
      </div>
    </Router>
  );
};

//Exporting the App component as the default export.
export default App;
