import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import corporateImage from '../assets/corporate.svg';
import k12Image from '../assets/K-12.svg';
import higherEdImage from '../assets/higher.svg';
import communityImage from '../assets/community.svg';
import '../App.css';
import './HowItWorksPage.css';
import { universities as universityData } from '../data/universities';

const partnershipFeatureCards = [
  {
    title: 'Corporate Partnerships',
    subtitle: 'Upskill your workforce with flexible learning.',
    description: (
      <>
        Open Credits helps employers offer affordable,
        <br />
        transferable college credits that support career growth,
        <br />
        internal mobility, and employee engagement. Our self-
        <br />
        paced courses are easy to deploy at scale, making
        <br />
        education accessible from day one, without the cost or
        <br />
        complexity of traditional tuition programs.
      </>
    ),
    image: corporateImage,
    imageAlt: 'Corporate partnerships meeting',
    href: '/partnerships/corporate'
  },
  {
    title: 'K-12 Education Services',
    subtitle: 'Give students a head start on college.',
    description: (
      <>
        Open Credits enables schools and districts to offer,
        <br />
        college-level learning opportunities that are self-paced,
        <br />
        affordable, and accessible to all learners. Unlike high-
        <br />
        cost test-based programs, our open-access approach
        <br />
        supports equity while helping students build momentum
        <br />
        toward college success.
      </>
    ),
    image: k12Image,
    imageAlt: 'K-12 classroom learning',
    href: '/partnerships/k-12'
  },
  {
    title: 'Higher Education Partnerships',
    subtitle: 'Increase access and improve student outcomes.',
    description: (
      <>
        Partner with Open Credits to expand degree pathways
        <br />
        through flexible, self-paced courses designed for
        <br />
        transfer. Our model supports institutions with a scalable,
        <br />
        cost-effective solution that helps students stay on track,
        <br />
        complete prerequisites faster, and persist through key
        <br />
        academic milestones.
      </>
    ),
    image: higherEdImage,
    imageAlt: 'Higher education classroom',
    href: '/partnerships/higher-education'
  },
  {
    title: 'Community Partnerships',
    subtitle: 'Create long-term impact locally.',
    description: (
      <>
        Open Credits partners with nonprofits, workforce 
        <br />
        boards, and community organizations to deliver 
        <br />
        affordable pathways into higher education. Together, we
        <br />
        help learners earn transferable college credit, reduce
        <br />
        cost barriers, and progress toward degrees and career
        <br />
        goals.
      </>
    ),
    image: communityImage,
    imageAlt: 'Community partnership',
    href: '/partnerships/community'
  }
];

const HowItWorksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColleges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return universityData;
    }

    return universityData.filter((college) => college.name.toLowerCase().includes(query));
  }, [searchQuery]);

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
            <p className="partner-banner__nowrap">
              Open Credits partners with organizations to make affordable, transferable college
              credits available to more learners, helping people progress<br/> &nbsp; faster toward degrees,
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
              <span className="partner-colleges-nowrap">
                Open Credits has sent transcripts to over 1,500 colleges and universities. If your
                university is with the nationally accredited
              </span>{' '}
              bodies, or accepts transcripts from a four-year university for credit review.
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
              <FaSearch className="partner-colleges-icon" aria-hidden="true" />
            </div>

            <div className="partner-colleges-grid">
              {filteredColleges.map((college) => {
                const content = college.logo ? (
                  <img src={college.logo} alt={college.name} />
                ) : (
                  <span style={{ color: college.color }}>{college.name}</span>
                );

                return (
                  <Link
                    key={college.slug}
                    className="partner-college-card"
                    to={`/universities/${college.slug}`}
                    aria-label={`View ${college.name}`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
