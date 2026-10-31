import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';
 
function App() {
  const [showProductList, setShowProductList] = useState(false);
 
  // "Get Started" button handler: shows the product listing page
  const handleGetStartedClick = () => {
    setShowProductList(true);
  };
 
  // Called from the navbar "Home" link to return to the landing page
  const handleHomeClick = () => {
    setShowProductList(false);
  };
 
  return (
    <div className="app-container">
      {/* Landing page with background image, company name and Get Started button */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>
 
      {/* Product listing page */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {showProductList && <ProductList onHomeClick={handleHomeClick} />}
      </div>
    </div>
  );
}
 
export default App;
