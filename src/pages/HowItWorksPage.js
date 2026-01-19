import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import corporateImage from '../assets/corporate.png';
import k12Image from '../assets/K-12.png';
import higherEdImage from '../assets/higher.png';
import communityImage from '../assets/community.png';
import paceLogo from '../assets/pace.png';
import sdsuLogo from '../assets/sdsu.png';
import stonyLogo from '../assets/stony.png';
import ubLogo from '../assets/ub.png';
import '../App.css';
import './HowItWorksPage.css';

const partnershipFeatureCards = [
  {
    title: 'Corporate Partnerships',
    subtitle: 'Upskill your workforce with flexible learning.',
    description:
      'Open Credits helps employers offer affordable, transferable college credits that support career growth, internal mobility, and employee engagement. Our self-paced courses are easy to deploy at scale, making education accessible from day one, without the cost or complexity of traditional tuition programs.',
    image: corporateImage,
    imageAlt: 'Corporate partnerships meeting',
    href: '/partnerships/corporate'
  },
  {
    title: 'K-12 Education Services',
    subtitle: 'Give students a head start on college.',
    description:
      'Open Credits enables schools and districts to offer college-level learning opportunities that are self-paced, affordable, and accessible to all learners. Unlike high-cost test-based programs, our open-access approach supports equity while helping students build momentum toward college success.',
    image: k12Image,
    imageAlt: 'K-12 classroom learning'
  },
  {
    title: 'Higher Education Partnerships',
    subtitle: 'Increase access and improve student outcomes.',
    description:
      'Partner with Open Credits to expand degree pathways through flexible, self-paced courses designed for transfer. Our model supports institutions with a scalable, cost-effective solution that helps students stay on track, complete prerequisites faster, and persist through key academic milestones.',
    image: higherEdImage,
    imageAlt: 'Higher education classroom'
  },
  {
    title: 'Community Partnerships',
    subtitle: 'Create long-term impact locally.',
    description:
      'Open Credits partners with nonprofits, workforce boards, and community organizations to deliver affordable pathways into higher education. Together, we help learners earn transferable college credit, reduce cost barriers, and progress toward degrees and career goals.',
    image: communityImage,
    imageAlt: 'Community partnership'
  }
];

const HowItWorksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const partnerColleges = [
    { name: 'PACE University', logo: paceLogo, color: '#003366' },
    { name: 'University at Buffalo', logo: ubLogo, color: '#0047bb' },
    { name: 'Stony Brook University', logo: stonyLogo, color: '#7a1f2b' },
    { name: 'NJCU', color: '#0f5aa5' },
    { name: 'NJIT', color: '#d32f2f' },
    { name: 'San Diego State University', logo: sdsuLogo, color: '#a6192e' },
    { name: 'SUNY', color: '#0b3d91' },
    { name: 'The Ohio State University', color: '#bb0000' },
    { name: 'MVNU', color: '#006f4c' },
    { name: 'Franklin University', color: '#0f1a2f' },
    { name: 'Central Michigan University', color: '#6a0030' },
    { name: 'Penn State', color: '#1e407c' },
    { name: 'Crestpoint University', color: '#4a4a4a' },
    { name: 'Indiana Tech', color: '#b43c2e' },
    { name: 'EC-Council University', color: '#c41e3a' },
    { name: 'Gracelyn University', color: '#3b2f6f' }
  ];

  const filteredColleges = partnerColleges.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="partnership-page">
      <div className="partnership-container">
        <section className="partner-banner">
          <div className="partner-banner__background">
            <span className="partner-banner__shape partner-banner__shape--left" aria-hidden="true" />
            <span className="partner-banner__shape partner-banner__shape--right" aria-hidden="true" />
          </div>
          <div className="partner-banner__content">
            <h1>
              Partner with <span>Open Credits</span>
            </h1>
            <p>Create access. Build outcomes. Scale impact.</p>
            <p>
              Open Credits partners with organizations to make affordable, transferable college
              credits available to more learners, helping people progress faster toward degrees,
              career advancement, and long-term mobility. Our courses are self-paced, online, and
              designed to fit into real lives.
            </p>
          </div>
        </section>

        <div className="partnership-feature-list">
          {partnershipFeatureCards.map((card) => (
            <article key={card.title} className="partnership-feature-card">
              <div className="partnership-feature-copy">
                <h2>{card.title}</h2>
                <h3>{card.subtitle}</h3>
                <p>{card.description}</p>
                {card.href ? (
                  <Link to={card.href} className="partnership-link">
                    Learn more →
                  </Link>
                ) : (
                  <button type="button" className="partnership-link">
                    Learn more →
                  </button>
                )}
              </div>
              <div className="partnership-feature-image">
                <img src={card.image} alt={card.imageAlt} />
              </div>
            </article>
          ))}
        </div>

        <div className="partner-colleges">
          <div className="partner-colleges-header">
            <h2>Our Partner Colleges</h2>
            <p>
              Open Credits has sent transcripts to over 1,500 colleges and universities. If your
              university is with the nationally accredited bodies, or accepts transcripts from a
              four-year university for credit review.
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

            <div className="partner-colleges-grid">
              {filteredColleges.map((college) => (
                <div key={college.name} className="partner-college-card">
                  {college.logo ? (
                    <img src={college.logo} alt={college.name} />
                  ) : (
                    <span style={{ color: college.color }}>{college.name}</span>
                  )}
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
