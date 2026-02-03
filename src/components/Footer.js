import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const companyLogo = '/images/company-logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo" aria-label="Open Credits">
            <img src={companyLogo} alt="Open Credits" />
            <span>Open Credits</span>
          </div>
          <div className="footer-social">
            <span className="footer-social-title">Connect with us</span>
            <div className="social-links">
              <a
                href="https://www.youtube.com/channel/UC_-jWh7QNdsUgdhBcUseXyw"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="https://x.com/opencredits_org"
                aria-label="X"
                target="_blank"
                rel="noreferrer"
              >
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
              <a
                href="https://www.instagram.com/opencredits/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-hero">
            <h2>Transferable College
              <br/> Credits - 100% Online</h2>
            <Link className="footer-cta" to="/enroll">
              Enroll Now
            </Link>
          </div>

          <div className="footer-links">
            <div className="footer-contact">
              <h4>Contact us</h4>
              <p>+1 (669) 369-9668</p>
              <p>contact@opencredits.org</p>
              <p>Menlo Park, California</p>
            </div>

            <nav className="footer-column" aria-label="Footer links group 1">
              <ul>
                <li>
                  <Link to="/resources">Request Transcript</Link>
                </li>
                <li>
                  <Link to="/resources">Accreditation</Link>
                </li>
                <li>
                  <Link to="/resources">Support</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer-column" aria-label="Footer links group 2">
              <ul>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/resources">Resources</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer-column" aria-label="Footer links group 3">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/find-my-college">Find My College</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright Open Credits by Vipi International Inc. 2026 | Accredited by NYSED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
