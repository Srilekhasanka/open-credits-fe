import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './PartnerUniversities.css';
import { API_ENDPOINTS, CALENDLY_URL } from '../config/constants';
import apiService from '../services/apiService';
import { universities as localUniversities } from '../data/universities';

const PartnerUniversities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const debounceTimer = useRef(null);

  const isSearching = searchQuery.trim().length > 0;

  const handleSearch = (event) => {
    const query = event.target.value;
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

  return (
    <section className="partner-universities">
      <div className="universities-container">
        <h2>
          Partnered <span className="highlight">Universities</span>
        </h2>
        <div className="partnered-image-wrap">
          <div className="partnered-search">
            <input
              type="text"
              placeholder="Search your college"
              aria-label="Search your college"
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className="partnered-search-icon" aria-hidden="true" />
          </div>
          <div className="partnered-grid">
            {searching ? (
              <p>Searching...</p>
            ) : (
              displayUniversities.map((university) => {
                const key = university.slug || university.id;
                const logoSrc = university.logo || university.logo_url;

                const handleImgError = (e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = '';
                };

                const cardContent = logoSrc ? (
                  <>
                    <img
                      src={logoSrc}
                      alt={university.name}
                      onError={handleImgError}
                    />
                    <span className="partnered-card-fallback" style={{ display: 'none' }}>
                      {university.name}
                    </span>
                  </>
                ) : (
                  <span style={{ color: university.color }}>{university.name}</span>
                );

                if (!isSearching && university.hasPartnerPage) {
                  return (
                    <Link
                      key={key}
                      className={`partnered-card${university.fullBleed ? ' full-bleed' : ''}`}
                      to={`/universities/${university.slug}`}
                      aria-label={`View ${university.name}`}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={key}
                    className={`partnered-card${university.fullBleed ? ' full-bleed' : ''}`}
                    aria-label={university.name}
                  >
                    {cardContent}
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="partnered-footer">
          <span>Have more questions ?</span>
          <button className="partnered-footer-button" type="button" onClick={() => window.open(CALENDLY_URL, '_blank')}>Talk to an Advisor</button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
