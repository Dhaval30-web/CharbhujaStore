import React from 'react';
import './style.css';
import Logo from '../../Assets/Images/Logo.png';

const PageLoader = ({ fadeOut }) => {
  return (
    <div className={`page-loader${fadeOut ? ' fade-out' : ''}`}>
      <div className="loader-content">

        <div className="loader-brand">
          <div className="loader-icon">
            <img src={Logo} alt="logo" className="w-100"/>
          </div>
          <h1 className="loader-title">Charbhuja Store</h1>
          <p className="loader-subtitle">Your Family Store</p>
        </div>

        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p className="loader-text">Loading fresh products...</p>

      </div>
    </div>
  );
};

export default PageLoader;