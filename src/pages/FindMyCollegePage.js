import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../App.css';
import { CALENDLY_URL } from '../config/constants';
import './FindMyCollegePage.css';
import { universities as localUniversities } from '../data/universities';
import { API_ENDPOINTS } from '../config/constants';
import apiService from '../services/apiService';

const FindMyCollegePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const debounceTimer = useRef(null);

  const isSearching = searchQuery.trim().length > 0;

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!query.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await apiService.get(API_ENDPOINTS.UNIVERSITIES.SEARCH(query));
        const data = response?.payload?.universities || [];
        setSearchResults(data);
      } catch (error) {
        console.error('Failed to search universities:', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const displayUniversities = isSearching ? searchResults : localUniversities;

  const emailSubject = 'Inquiry About Transfer Credits';
  const emailBody =
    'Dear Registrar,\r\n\r\n' +
    'My name is [Your Name], and I am an incoming/current student for the Bachelor\'s program in ' +
    '[Your Program Name] starting in September 2024.\r\n\r\n' +
    'I am writing to inquire about the possibility of transferring credits to our university. ' +
    'I understand that our university accepts transcripts from regionally accredited four-year ' +
    'universities. I will be receiving a transcript from a 4-year university - Excelsior University in ' +
    'New York. I also saw that our university is listed as a cooperating member of ACE (American Council ' +
    'on Education) and NCCRS (National College Credit Recommendation Service) for accepting their ' +
    'recommended courses.\r\n\r\n' +
    'Based on the university\'s credit transfer policy, I believe I am eligible to apply for consideration ' +
    'of transfer credits from other colleges as well as ACE/NCCRS recommended courses. However, I would ' +
    'like to confirm if these credits would be potentially considered for transfer toward my degree ' +
    'program.\r\n\r\n' +
    'Best regards,\r\n' +
    '[Your Name]\r\n';
  const emailTemplateHref = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  const handleImgError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = '';
  };

  return (
    <div className="find-college-page">
      <div className="find-college-container">
        <div className="find-college-header">
          <h1>Find Your College</h1>
          <p>
            Open Credits has sent transcripts to over 1,500 colleges and universities. If your
            university is with the nationally accredited bodies, or accepts transcripts from a
            four-year university for credit review.
          </p>
        </div>

        <div className="find-college-panel">
          <div className="find-college-search">
            <FaSearch aria-hidden="true" />
            <input
              type="text"
              placeholder="Search your college"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <p className="find-college-note">
            If your U.S. university isn't listed, send your university registrar this{' '}
            <a href={emailTemplateHref} target="_blank" rel="noreferrer">
              email template to confirm if they will accept any college credits: click here.
            </a>
          </p>

          <div className="find-college-grid">
            {searching ? (
              <p>Searching...</p>
            ) : (
              displayUniversities.map((university) => {
                const key = university.slug || university.id;
                const logoSrc = university.logo || university.logo_url;

                const content = logoSrc ? (
                  <>
                    <img
                      src={logoSrc}
                      alt={university.name}
                      onError={handleImgError}
                    />
                    <span className="find-college-card-fallback" style={{ display: 'none' }}>
                      {university.name}
                    </span>
                  </>
                ) : (
                  <span style={{ color: university.color }}>{university.name}</span>
                );

                if (isSearching) {
                  return (
                    <div
                      key={key}
                      className={`find-college-card${university.fullBleed ? ' full-bleed' : ''}`}
                      aria-label={university.name}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={key}
                    className={`find-college-card${university.fullBleed ? ' full-bleed' : ''}`}
                    to={`/universities/${university.slug}`}
                    aria-label={`View ${university.name}`}
                  >
                    {content}
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="find-college-footer">
          <span>Have more Questions?</span>
          <button type="button" onClick={() => window.open(CALENDLY_URL, '_blank')}>Talk to an Advisor</button>
        </div>
      </div>
    </div>
  );
};

export default FindMyCollegePage;
