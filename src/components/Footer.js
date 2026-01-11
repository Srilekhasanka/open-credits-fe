import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">⚬⚬</span>
              <span className="logo-text">Open Credits</span>
            </div>
            <p>
              Transferable College<br />
              Credits – 100% Online
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Pages</h4>
              <ul>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#financing">Financing</a></li>
                <li><a href="#resources">Resources</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#partners">Our Partners</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#twitter" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="#linkedin" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="#instagram" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Open Credits. All rights reserved. Made With ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
