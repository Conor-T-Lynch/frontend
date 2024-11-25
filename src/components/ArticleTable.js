import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const ArticleTable = ({ articles, searchQuery, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (article) => {
    setCurrentArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentArticle(null);
  };

  const handleDelete = (articleId) => {
    onDelete(articleId);
    setDeleteMessage('Article deleted successfully!');
  };

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
            <th>Publish Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No articles found matching your search query.
              </td>
            </tr>
          ) : (
            filteredArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.content}</td>
                <td>{article.formatted_publish_date || new Date(article.publish_date).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleView(article)}
                      aria-label={`View ${article.title}`}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(article)}
                      aria-label={`Edit ${article.title}`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(article.id)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Viewing Article: {currentArticle ? currentArticle.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {deleteMessage && (
        <Alert variant="success" className="mb-3" style={{ textAlign: 'center', color: 'green' }}>
          {deleteMessage}
        </Alert>
      )}
    </div>
  );
};

export default ArticleTable;
