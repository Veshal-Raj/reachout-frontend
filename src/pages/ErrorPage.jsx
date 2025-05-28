// src/pages/ErrorPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const errorMessage = params.get('message') || 'An unexpected error occurred';

  const handleRetry = () => {
    navigate('/');
  };

  return (
    <div className="error-page">
      <div className="card">
        <h1 className="page-title text-center">Oops!</h1>
        <div className="alert alert-error">
          {errorMessage}
        </div>
        <div className="text-center">
          <button 
            className="btn btn-primary"
            onClick={handleRetry}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;