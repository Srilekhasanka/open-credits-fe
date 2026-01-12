import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../App.css';
import './FindMyCollegePage.css';

const FindMyCollegePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const universities = [
    { name: 'Bottega University', color: '#0f1a2f' },
    { name: 'Charter Oak State College', color: '#2e5a3c' },
    { name: 'Columbia Southern University', color: '#1e3a5f' },
    { name: 'Crestpoint University', color: '#4a4a4a' },
    { name: 'Dunlap-Stone University', color: '#1e4d6b' },
    { name: 'EC-Council University', color: '#c41e3a' },
    { name: 'Graceland University', color: '#3b2f6f' },
    { name: 'PACE University', color: '#003366' },
    { name: 'NJCU', color: '#0f5aa5' },
    { name: 'Indiana Tech', color: '#b43c2e' },
    { name: 'NJIT', color: '#d32f2f' },
    { name: 'The Ohio State University', color: '#bb0000' },
    { name: 'Penn State', color: '#1e407c' },
    { name: 'San Diego State University', color: '#a6192e' }
  ];

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            university is with the American Council on Education (ACE) or National College Credit
            Recommendation Service (NCCRS), or accepts transcripts from a four-year university for
            credit review.
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
            {filteredUniversities.map((university) => (
              <div key={university.name} className="find-college-card">
                <span style={{ color: university.color }}>{university.name}</span>
              </div>
            ))}
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
