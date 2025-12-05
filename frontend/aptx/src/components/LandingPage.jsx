import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>APT-X</h1>
      </header>
      <main className="main-content">
        <div className="content-block">
          <div className="text-content">
            <h2>Transforming Education with AI</h2>
            <p>Our platform uses cutting-edge AI to translate complex curriculum into intuitive images, making learning more accessible and engaging for students with Down syndrome.</p>
            <button className="cta-button">Learn More</button>
          </div>
          <div className="image-content">
            <img src="https://i.imgur.com/k61M12D.png" alt="Child with Down syndrome learning" />
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 APT-X. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
