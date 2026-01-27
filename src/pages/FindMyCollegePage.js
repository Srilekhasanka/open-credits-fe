import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../App.css';
import './FindMyCollegePage.css';
import { universities as universityData } from '../data/universities';

const FindMyCollegePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return universityData;
    }

    return universityData.filter((uni) => uni.name.toLowerCase().includes(query));
  }, [searchQuery]);

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
  const emailTemplateHref = `https://mail.google.com/mail/?view=cm&fs=1&to=Connect@opencredits.org&su=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <p className="find-college-note">
            If your U.S. university isn't listed, send them this{' '}
            <a href={emailTemplateHref} target="_blank" rel="noreferrer">
              email template to confirm if they will accept any college credits: click here.
            </a>
          </p>

          <div className="find-college-grid">
            {filteredUniversities.map((university) => {
              const content = university.logo ? (
                <img src={university.logo} alt={university.name} />
              ) : (
                <span style={{ color: university.color }}>{university.name}</span>
              );

              return (
                <Link
                  key={university.slug}
                  className="find-college-card"
                  to={`/universities/${university.slug}`}
                  aria-label={`View ${university.name}`}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="find-college-footer">
          <span>Have more Questions?</span>
          <button type="button">Talk to an Advisor</button>
        </div>
      </div>
    </div>
  );
};

export default FindMyCollegePage;
