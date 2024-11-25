import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ArticleTable from './components/ArticleTable';
import ArticleForm from './components/ArticleForm';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const fetchArticles = async (query) => {
    try {
      const params = query ? { search: query } : {};
      const response = await axios.get('http://34.193.120.111:3000/articles', { params });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  
  
  useEffect(() => {
    fetchArticles(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSave = async () => {
    fetchArticles();
  };

  const handleEdit = (article) => {
    setIsEditing(true);
    setCurrentArticle(article);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://34.193.120.111:3000/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleView = (article) => {
    alert(`Viewing article: ${article.title}`);
  };

  const handleBack = () => {
    setIsEditing(false);
    setCurrentArticle(null);
  };
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">News Article System</h1>

        <div className="mb-4">
          <SearchBar
            onSearch={handleSearch}
            query={searchQuery}
            onReset={() => setSearchQuery('')}
          />
        </div>

        <div className="mb-4">
          <ArticleTable
            searchQuery={searchQuery}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            articles={articles}
          />
        </div>

        <div className="mt-4">
          <h3 className="mb-3 text-center">{isEditing ? 'Edit' : 'Create'} Article</h3>
          <ArticleForm
            article={currentArticle}
            onSave={handleSave}
            fetchArticles={fetchArticles}
            onBack={handleBack}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
