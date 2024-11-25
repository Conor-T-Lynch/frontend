import React, { useState, useEffect } from 'react';
import axios from 'axios';


const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ArticleForm = ({ article, onSave, fetchArticles, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    publish_date: '',
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        author: article.author,
        content: article.content,
        publish_date: formatDate(article.publish_date),
      });
    } else {
      setFormData({
        title: '',
        author: '',
        content: '',
        publish_date: '',
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (article) {
        
        const response = await axios.put(
          `http://34.193.120.111:3000/articles/${article.id}`,
          formData
        );
        setFeedbackMessage('Article updated successfully!');
        console.log('Updated article:', response.data);
      } else {
        
        await axios.post('http://34.193.120.111:3000/articles', formData);
        setFeedbackMessage('Article created successfully!');
      }
      fetchArticles();
      onSave();
    } catch (error) {
      console.error('Error saving article:', error);
      setFeedbackMessage('An error occurred while saving the article.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
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
      <div className="form-group">
        <label htmlFor="author">Author</label>
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
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="publish_date">Publish Date</label>
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
      <button type="submit" className="btn btn-primary mt-3">
        {article ? 'Update Article' : 'Create Article'}
      </button>
      {onBack && (
        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={onBack}>
          Back
        </button>
      )}
      {feedbackMessage && (
        <div className="alert alert-info mt-3" role="alert">
          {feedbackMessage}
        </div>
      )}
    </form>
  );
};

export default ArticleForm;
