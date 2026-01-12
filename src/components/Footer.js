import React from 'react';
import './Footer.css';
import companyLogo from '../assets/company-logo.png';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={companyLogo} alt="Open Credits" />
            <span>Open Credits</span>
          </div>
          <div className="footer-social">
            <span>Connect with us</span>
            <div className="social-links">
              <a
                href="https://www.youtube.com/channel/UC_-jWh7QNdsUgdhBcUseXyw"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
              <a href="https://x.com/opencredits_org" aria-label="X" target="_blank" rel="noreferrer">
                <FaXTwitter />
              </a>
              <a href="#facebook" aria-label="Facebook" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/opencredits/about/?viewAsMember=true"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-hero">
            <h2>Transferable College Credits – 100% Online</h2>
            <button className="footer-cta" type="button">Enroll Now</button>
            <div className="footer-contact">
              <h4>Contact us</h4>
              <p>+1 (669) 369-9668</p>
              <p>contact@opencredits.com</p>
              <p>Menlo Park, California</p>
            </div>
          </div>
          <div className="footer-column">
            <ul>
              <li><a href="#transcript">Request Transcript</a></li>
              <li><a href="#accreditation">Accreditation</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <ul>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#find-college">Find My College</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Copyright Open Credits by Vipi International Inc. 2026 | Accredited by NYSED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
