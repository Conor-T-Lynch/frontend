//@Reference https://www.bezkoder.com/react-table-example-hooks-crud/
//@Reference https://muhimasri.com/blogs/react-editable-table/
//@Reference https://www.youtube.com/watch?v=MINQoCSBmds&ab_channel=CodeComplete
//@Reference https://react-bootstrap.netlify.app/docs/components/modal/
//@Reference https://www.w3schools.com/REACT/default.asp
//@Reference https://www.w3schools.com/REACT/react_usestate.asp
//@Reference https://www.w3schools.com/react/react_es6.asp
//Importing React and useState hook
import React, { useState } from 'react';
//Importing Bootstrap components for model, button and alert
import { Modal, Button, Alert } from 'react-bootstrap';
//Functional component to display articles in a tavle format
const ArticleTable = ({ articles, searchQuery, onEdit, onDelete }) => {
  //State for controlling model visibility
  const [showModal, setShowModal] = useState(false);
  //State to hold the current article being viewed
  const [currentArticle, setCurrentArticle] = useState(null);
  //State for storing a success message after article is deleted
  const [deleteMessage, setDeleteMessage] = useState('');
  //Filltering the articles based on the search query, checks title, author or content
  const filteredArticles = articles.filter(article =>
    //checks if title matches 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //checks if author matches
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //checks if content matches
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //Function to handle viewing an article
  const handleView = (article) => {
    //Sets the current article to be viewed
    setCurrentArticle(article);
    //Shows the model
    setShowModal(true);
  };
  //Function to close the Model and reset the current article
  const handleCloseModal = () => {
    //Closes the model
    setShowModal(false);
    //Resets the current article
    setCurrentArticle(null);
  };
  //Function to handle the deletion of an article, triggers the onDelete prop function and sets a success message
  const handleDelete = (articleId) => {
    //Calls the onDelete function passed as a prop
    onDelete(articleId);
    //Sets the success message
    setDeleteMessage('Article deleted successfully!');
  };
  //Rendering the article table
  return (
    <div className="container mt-4">
      {/* Table to display articles */}
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            {/* Table columns for article atributes */}
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
            <th>Publish Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Display message if no articles match the search query */}
          {filteredArticles.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                {/* No articles found message */}
                No articles found matching your search query.
              </td>
            </tr>
          ) : (
            //Loops through the filtered articles and displays each article in the table
            filteredArticles.map((article) => (
              <tr key={article.id}>
                {/* Display articles in the table */}
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.content}</td>
                <td>{article.formatted_publish_date || new Date(article.publish_date).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    {/* Button to view the article */}
                    <button
                      className="btn btn-info btn-sm"
                      //Calls the handleView when clicked
                      onClick={() => handleView(article)}
                      //Accessability label
                      aria-label={`View ${article.title}`}
                    >
                      View
                    </button>
                     {/* Button to edit the article */}
                    <button
                      className="btn btn-warning btn-sm"
                      //Calls the onEdit function passed as a prop
                      onClick={() => onEdit(article)}
                      //Accessability label
                      aria-label={`Edit ${article.title}`}
                    >
                      Edit
                    </button>
                    {/* Button to delete the article */}
                    <button
                      className="btn btn-danger btn-sm"
                      //Calls the handleDelete function when clicked
                      onClick={() => handleDelete(article.id)}
                      //Accessability label
                      aria-label={`Delete ${article.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Modal to view article details */}
      {/* Show the modal when showModal is true */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {/* Modal title showing the current article's title */}
          <Modal.Title>Viewing Article: {currentArticle ? currentArticle.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display article details if currentArticle is set */}
          {currentArticle ? (
            <div>
              <h4>{currentArticle.title}</h4>
              <p><strong>Author:</strong> {currentArticle.author}</p>
              <p><strong>Content:</strong> {currentArticle.content}</p>
              <p><strong>Publish Date:</strong> {currentArticle.formatted_publish_date || new Date(currentArticle.publish_date).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>Loading article...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Button to close the modal */}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Display success message after deleting an article */}
      {deleteMessage && (
        <Alert variant="success" className="mb-3" style={{ textAlign: 'center', color: 'green' }}>
          {/* Show the delete success message */}
          {deleteMessage}
        </Alert>
      )}
    </div>
  );
};
//Export the ArticleTable component
export default ArticleTable;
