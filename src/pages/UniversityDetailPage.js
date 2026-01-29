import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UniversityDetailPage.css';
import WorkProcess from '../components/WorkProcess';
import SavingsCalculator from '../components/SavingsCalculator';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { universities, defaultBadges } from '../data/universities';

const UniversityDetailPage = () => {
  const { slug } = useParams();
  const university = universities.find((item) => item.slug === slug);
  const isPace = university?.slug === 'pace-university';
  const isIndianaTech = university?.slug === 'indiana-tech';
  const isNjcu = university?.slug === 'njcu';
  const isNjit = university?.slug === 'njit';
  const isOhioState = university?.slug === 'the-ohio-state-university';
  const isSuny = university?.slug === 'suny';
  const isSdsu = university?.slug === 'san-diego-state-university';
  const isMvnu = university?.slug === 'mvnu';
  const isFranklin = university?.slug === 'franklin-university';
  const isCmu = university?.slug === 'central-michigan-university';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  if (!university) {
    return (
      <div className="university-page">
        <div className="university-card">
          <h1>University not found</h1>
          <p>Please go back and choose a university from the list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="university-page">
      <div className={`university-card ${isIndianaTech ? 'indiana-tech' : ''} ${isNjcu ? 'njcu' : ''} ${isNjit ? 'njit' : ''} ${isOhioState ? 'ohio' : ''} ${isSuny ? 'suny' : ''} ${isSdsu ? 'sdsu' : ''} ${isMvnu ? 'mvnu' : ''} ${isFranklin ? 'franklin' : ''} ${isCmu ? 'cmu' : ''}`}>
        <div className="university-header">
          <div className="university-title">
            <span>Open Credits</span>
            <span className="university-divider">&times;</span>
            <strong className={`university-name ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''}`}>
              {isNjcu
                ? 'New Jersey City University'
                : isNjit
                  ? 'New Jersey Institute of Technology'
                  : isOhioState
                    ? 'Ohio State University'
                    : isSuny
                      ? 'State University of New York'
                      : isSdsu
                        ? 'San Diego State University'
                        : isMvnu
                          ? 'Mount Vernon Nazarene University'
                          : isFranklin
                            ? 'Franklin University'
                            : isCmu
                              ? 'Central Michigan University'
                              : university.name}
            </strong>
          </div>
          {(university.headerLogo || university.logo) && (
            <div className="university-logo">
              <img src={university.headerLogo || university.logo} alt={university.name} />
            </div>
          )}
        </div>
        <div className="university-chip">
          <span className="university-chip-dot" aria-hidden="true" />
          Official Transfer Credit Pathway
        </div>
        <div className="university-body">
          <div className="university-copy">
            <p>
              {isPace
                ? (
                <>
                  Pace University is known for career-focused programs with
                  <br />
                  strong industry connections in business, technology,
                  <br />
                  healthcare, and the arts.
                  <br />
                    Open Credits offers a faster way to complete transferable
                  <br />
                  college credits online. Choose from CMU-aligned courses
                  <br />
                  mapped to general education and electives, complete them
                  <br />
                  at your own pace, and submit your transcript for Pace's
                  <br />
                  credit review to move closer to graduation with confidence.
                </>
              )
                : isIndianaTech
                  ? 'Indiana Tech is known for flexible, career-focused programs and Open Credits is a faster way to complete transferable college credits online. Choose from nearly 70 Indiana Tech-aligned courses built for general education and electives, complete them at your pace, and submit your transcript for Indiana Techâ€™s credit review so you can move closer to graduation with confidence.'
                  : isNjcu
                    ? 'NJCU is known for career-focused programs and Open Credits is a faster way to complete transferable college credits online. Choose from nearly 70 NJCU-aligned courses built for general education and electives, complete them at your pace, and submit your transcript for NJCUâ€™s credit review so you can move closer to graduation with confidence.'
                    : `${university.name} offers career-focused programs and Open Credits is a faster way to complete transferable college credits online. Choose from flexible courses built for general education and electives, complete them at your pace, and submit your transcript for credit review so you can move closer to graduation with confidence.`}
            </p>
            <div className="university-badges">
              {defaultBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
            <button type="button" className="university-cta">
              Register Today and Transfer
            </button>
          </div>
          <div className="university-hero">
            {university.heroImage ? (
              <img src={university.heroImage} alt={`${university.name} campus`} />
            ) : (
              <div className="university-hero-placeholder">
                <span>{university.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="university-work">
        <WorkProcess />
      </div>
      {(isPace || isIndianaTech || isNjcu || isNjit || isOhioState || isSuny || isSdsu || isMvnu || isFranklin || isCmu) && (
        <section className={`university-why ${isIndianaTech ? 'is-indiana-tech' : ''} ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''}`}>
          <div className="university-why-inner">
            <div className="university-why-copy">
              <h2>
                {isIndianaTech ? 'Why Join Indiana Tech?' : isNjcu ? 'Why Join NJCU?' : isNjit ? 'Why Join NJIT?' : isOhioState ? 'Why Join OSU?' : isSuny ? 'Why Join SUNY?' : isSdsu ? 'Why Join SDSU Universities?' : isMvnu ? 'Why Join MVNU Universities?' : isFranklin ? 'Why Join Franklin University?' : isCmu ? 'Why Join Central Michigan University?' : 'Why Join Pace University?'}
              </h2>
              <p>
                {isIndianaTech
                  ? 'Indiana Tech is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                  : isNjcu
                    ? 'NJCU is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                    : isNjit
                      ? 'NJIT is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                      : isOhioState
                        ? 'Ohio State University is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                        : isSuny
                          ? 'SUNY is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                          : isSdsu
                            ? 'SDSU is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                            : isMvnu
                              ? 'MVNU is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                              : isFranklin
                                ? 'Franklin University is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                                : isCmu
                                  ? 'CMU is accredited by the Distance Education Accrediting Commission. All programs are offered 100% online.'
                                  : (
                                    <>
                                      Pace University offers career-focused education rooted in
                                      <br />
                                      real-world experience, with strong access to internships,
                                      employer partnerships, and industry networks in New York
                                      <br/> City.
                                      Its programs are designed for flexibility and career mobility,
                                      making Pace an ideal choice for transfer students, working
                                      professionals, and those seeking strong outcomes 
                                      <br/>in business,
                                      healthcare, law, and technology.
                                    </>
                                  )}
              </p>
              {!isPace && (
                <p>
                  {isIndianaTech
                    ? 'Indiana Tech is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                    : isNjcu
                      ? 'NJCU is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                      : isNjit
                        ? 'NJIT is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                        : isOhioState
                          ? 'Ohio State University is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                          : isSuny
                            ? 'SUNY is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                            : isSdsu
                              ? 'SDSU is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                              : isMvnu
                                ? 'MVNU is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                                : isFranklin
                                  ? 'Franklin University is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                                  : isCmu
                                    ? 'CMU is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'
                                    : 'Pace University is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'}
                </p>
              )}
            </div>
            <div className="university-why-logo">
              <img
                src={university.whyLogo || university.headerLogo || university.logo}
                alt={university.name}
              />
            </div>
          </div>
        </section>
      )}
      <div className="university-savings">
        <SavingsCalculator />
      </div>
      <section className={`university-courses ${isIndianaTech ? 'is-indiana-tech' : ''} ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''}`}>
        <div className="university-courses-inner">
          <h2>
            Find your <span>Courses</span>
          </h2>
          <p>
            Match Open Credits courses to {isNjcu ? 'NJCU' : university.name} equivalents. Select courses to estimate total transferable credits.
          </p>
          <div className="university-courses-search">
            <input type="text" placeholder="Search your courses" />
            <span className="university-courses-search-icon" aria-hidden="true" />
          </div>
          <div className="university-courses-card">
            <div className="university-courses-card-head">
              <div>
                <h3>{isNjcu ? 'NJCU' : university.name} Course Equivalency &amp; Transfer Guide</h3>
                <p>Type: Search by "Open Credits", "{isNjcu ? 'NJCU' : university.name}", course number (e.g., MAT 131), or keywords (e.g., "Python").</p>
              </div>
                <div className="university-courses-totals">
                  <div className="total-university">
                    <span>With University</span>
                    <strong>$0</strong>
                  </div>
                  <div className="total-open">
                    <span>With Open Credits</span>
                    <strong>$0</strong>
                  </div>
                </div>
            </div>
            <div className="university-courses-table">
              <div className="university-courses-row is-header">
                <span />
                <span>Open Credits Course</span>
                <span>Credits</span>
                <span>Open Credits Course</span>
                <span>Credits</span>
                <span>Add to Cart</span>
              </div>
              {Array.from({ length: 7 }).map((_, idx) => (
                <div key={idx} className="university-courses-row">
                  <input type="checkbox" />
                  <span>Course Title Course Title Course Title</span>
                  <span>3</span>
                  <span>Course Title Course Title Course Title</span>
                  <span>3</span>
                  <span className="cart-icon">ðŸ›’</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <FAQ />
    </div>
  );
};

export default UniversityDetailPage;

