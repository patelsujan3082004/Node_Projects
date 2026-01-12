import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">🎬 Pro Movie</div>
          <p className="footer-text">Discover. Watch. Remember.</p>
        </div>

        <div className="footer-right">
          <p>Movie project</p>
          <p className="muted">© {new Date().getFullYear()} Pro Movie</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
