import React, { useState } from 'react';
import handshakeImage from '../assets/handshake.png';
import '../App.css';
import './HowItWorksPage.css';

const partnershipCards = [
  {
    title: 'Corporate Partnerships',
    subtitle: 'Upskill your workforce with flexible learning.',
    description:
      'Open Credits helps employers offer affordable, transferable college credits that support career growth, internal mobility, and employee engagement. Our self-paced courses are easy to deploy at scale, making education accessible from day one, without the cost or complexity of traditional tuition programs.'
  },
  {
    title: 'Higher Education Partnerships',
    subtitle: 'Increase access and improve student outcomes.',
    description:
      'Partner with Open Credits to expand degree pathways through flexible, self-paced courses designed for transfer. Our model supports institutions with a scalable, cost-effective solution that helps students stay on track, complete prerequisites faster, and persist through key academic milestones.'
  },
  {
    title: 'K-12 Education Services',
    subtitle: 'Give students a head start on college.',
    description:
      'Open Credits enables schools and districts to offer college-level learning opportunities that are self-paced, affordable, and accessible to all learners. Unlike high-cost test-based programs, our open-access approach supports equity while helping students build momentum toward college success.'
  },
  {
    title: 'Community Partnerships',
    subtitle: 'Create long-term impact locally.',
    description:
      'Open Credits partners with nonprofits, workforce boards, and community organizations to deliver affordable pathways into higher education. Together, we help learners earn transferable college credit, reduce cost barriers, and progress toward degrees and career goals.'
  }
];

const HowItWorksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const partnerColleges = [
    { name: 'Bottega University', color: '#0f1a2f' },
    { name: 'Charter Oak State College', color: '#2e5a3c' },
    { name: 'Columbia Southern University', color: '#1e3a5f' },
    { name: 'Crestpoint University', color: '#4a4a4a' },
    { name: 'Dunlap-Stone University', color: '#1e4d6b' },
    { name: 'EC-Council University', color: '#c41e3a' },
    { name: 'Gracelyn University', color: '#3b2f6f' },
    { name: 'PACE University', color: '#003366' },
    { name: 'NJCU', color: '#0f5aa5' },
    { name: 'Indiana Tech', color: '#b43c2e' },
    { name: 'NJIT', color: '#d32f2f' },
    { name: 'The Ohio State University', color: '#bb0000' },
    { name: 'Penn State', color: '#1e407c' },
    { name: 'San Diego State University', color: '#a6192e' }
  ];

  const filteredColleges = partnerColleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="partnership-page">
      <div className="partnership-container">
        <div className="partnership-hero">
          <div className="partnership-hero-copy">
            <h1>Partnerships</h1>
            <p>
              Create access. Build outcomes. Scale impact. Open Credits partners with organizations
              to make affordable, transferable college credits available to more learners, helping
              people progress faster toward degrees, career advancement, and long-term mobility. Our
              courses are self-paced, online, and designed to fit into real lives.
            </p>
          </div>
          <div className="partnership-hero-image">
            <img src={handshakeImage} alt="Handshake partnership" />
          </div>
        </div>

        <div className="partnership-grid">
          {partnershipCards.map((card) => (
            <article key={card.title} className="partnership-card">
              <h2>{card.title}</h2>
              <h3>{card.subtitle}</h3>
              <p>{card.description}</p>
              <button type="button" className="partnership-link">
                Learn more →
              </button>
            </article>
          ))}
        </div>

        <div className="partner-colleges">
          <div className="partner-colleges-header">
            <h2>Our Partner Colleges</h2>
            <p>
              Open Credits has sent transcripts to over 1,500 colleges and universities. If your
              university is with the American Council on Education (ACE) or National College Credit
              Recommendation Service (NCCRS), or accepts transcripts from a four-year university for
              credit review.
            </p>
          </div>

          <div className="partner-colleges-panel">
            <div className="partner-colleges-search">
              <input
                type="text"
                placeholder="Search your college"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span className="partner-colleges-icon" aria-hidden="true">🔍</span>
            </div>

            <p className="partner-colleges-note">
              Want to become a Partner University?{' '}
              <a href="mailto:Connect@opencredits.org">Contact Us</a>
            </p>

            <div className="partner-colleges-grid">
              {filteredColleges.map((college) => (
                <div key={college.name} className="partner-college-card">
                  <span style={{ color: college.color }}>{college.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
