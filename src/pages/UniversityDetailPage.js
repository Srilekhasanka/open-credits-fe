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
  const isStonyBrook = university?.slug === 'stony-brook-university';
  const isNjcu = university?.slug === 'njcu';
  const isNjit = university?.slug === 'njit';
  const isOhioState = university?.slug === 'the-ohio-state-university';
  const isSuny = university?.slug === 'suny';
  const isSdsu = university?.slug === 'san-diego-state-university';
  const isMvnu = university?.slug === 'mvnu';
  const isFranklin = university?.slug === 'franklin-university';
  const isCmu = university?.slug === 'central-michigan-university';
  const isPennState = university?.slug === 'penn-state';

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
      <div className={`university-card ${isPace ? 'pace' : ''} ${isIndianaTech ? 'indiana-tech' : ''} ${isStonyBrook ? 'stony' : ''} ${isNjcu ? 'njcu' : ''} ${isNjit ? 'njit' : ''} ${isOhioState ? 'ohio' : ''} ${isSuny ? 'suny' : ''} ${isSdsu ? 'sdsu' : ''} ${isMvnu ? 'mvnu' : ''} ${isFranklin ? 'franklin' : ''} ${isCmu ? 'cmu' : ''} ${isPennState ? 'penn' : ''}`}>
        <div className="university-header">
          <div className="university-title">
            <span>Open Credits</span>
            <span className="university-divider">&times;</span>
            <strong className={`university-name ${isStonyBrook ? 'is-stony' : ''} ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''} ${isPennState ? 'is-penn' : ''}`}>
              {isNjcu
                ? 'New Jersey City University'
                : isStonyBrook
                  ? 'Stony Brook University'
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
                              : isPennState
                                ? 'Penn State'
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
                  Pace University is known for career-focused programs with strong industry connections in business, technology, healthcare, and the arts.
                  <br />
                  Open Credits offers a faster way to complete transferable college credits online. Choose from CMU-aligned courses mapped to general education and electives, complete them at your own pace, and submit your transcript for Pace's credit review to move closer to graduation with confidence.
                </>
              )
                : isIndianaTech
                  ? (
                  <>
                    Indiana Tech is known for applied, workforce-aligned programs in technology, business, and engineering.
                    <br />
                    <br />
                    Open Credits helps students earn transferable college credits faster through flexible, online coursework aligned with general education and electives, reviewed for Indiana Tech transfer credit.
                  </>
                  )
                  : isStonyBrook
                    ? (
                    <>
                      Stony Brook University is known for top-tier research, STEM excellence, and health sciences.
                      <br />
                      <br />
                      Open Credits supports students in completing transferable general education and elective credits online to stay on track for timely graduation.
                    </>
                  )
                  : isPennState
                    ? (
                    <>
                      Penn State is known for academic rigor, scale, and one of the strongest alumni networks in the world.
                      <br />
                      <br />
                      Open Credits helps students complete transferable credits online, supporting flexible degree planning across Penn State pathways.
                    </>
                  )
                  : isOhioState
                    ? (
                    <>
                      Ohio State University is known for academic breadth, research excellence, and strong employer recognition.
                      <br />
                      <br />
                      Open Credits helps students complete transferable general education and elective credits efficiently before or during their OSU pathway.
                    </>
                  )
                  : isMvnu
                    ? (
                    <>
                      Mount Vernon Nazarene University is known for values-driven education and student-centered learning.
                      <br />
                      <br />
                      Open Credits provides a flexible way to earn transferable general education and elective credits online for credit evaluation.
                    </>
                  )
                  : isFranklin
                    ? (
                    <>
                      Franklin University is known for serving adult learners<br />and transfer students with flexible degree pathways.
                      <br />
                      <br />
                      Open Credits allows students to complete transferable credits online and reduce time and cost to graduation.
                    </>
                  )
                  : isNjcu
                    ? (
                    <>
                      NJCU is known for access-focused education and strong pathways for transfer and first-generation students.
                      <br />
                      <br />
                      Open credits provides a faster way to complete transferable general education and elective credits online, helping NJCU students stay on track toward graduation.
                    </>
                  )
                  : isNjit
                    ? (
                    <>
                      NJIT is known for rigorous STEM, engineering, and technology programs.
                      <br />
                      <br />
                      Open Credits allows students to complete approved general education and elective credits online and submit transcripts for NJIT's transfer review.
                    </>
                  )
                  : isSuny
                    ? (
                    <>
                      SUNY institutions are known for affordability, transfer mobility, and statewide access to higher education.
                      <br />
                      <br />
                      Open Credits enables students to complete transferable credits online that align with SUNY general education and elective requirements.
                    </>
                  )
                  : isSdsu
                    ? (
                    <>
                      SDSU is known for strong programs in business, engineering, public health, and applied research.
                      <br />
                      <br />
                      Open Credits supports students in completing transferable lower-division and elective credits online to accelerate degree progress.
                    </>
                  )
                  : isCmu
                    ? (
                    <>
                      Central Michigan University is known for career-focused programs that help students move quickly toward graduation.
                      <br />
                      Open Credits offers a faster way to earn transferable college credits online. Choose from nearly 70 CMU-aligned courses for general education and electives, complete them at your pace, and submit transcripts for CMU's credit review.
                    </>
                  )
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
      {(isPace || isIndianaTech || isNjcu || isNjit || isOhioState || isSuny || isSdsu || isMvnu || isFranklin || isCmu || isPennState || isStonyBrook) && (
        <section className={`university-why ${isPace ? 'is-pace' : ''} ${isIndianaTech ? 'is-indiana-tech' : ''} ${isStonyBrook ? 'is-stony' : ''} ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''} ${isPennState ? 'is-penn' : ''}`}>
          <div className="university-why-inner">
            <div className="university-why-copy">
              <h2>
                {isIndianaTech ? 'Why Join Indiana Tech?' : isStonyBrook ? 'Why Join Stony Brook University?' : isNjcu ? 'Why Join NJCU?' : isNjit ? 'Why Join NJIT?' : isOhioState ? 'Why Join OSU?' : isSuny ? 'Why Join SUNY?' : isSdsu ? 'Why Join SDSU Universities?' : isMvnu ? 'Why Join MVNU Universities?' : isFranklin ? 'Why Join Franklin University?' : isCmu ? 'Why Join Central Michigan University?' : isPennState ? 'Why Join Penn State University?' : 'Why Join Pace University?'}
              </h2>
              <p>
                {isIndianaTech
                  ? ''
                  : isStonyBrook
                    ? (
                    <>
                      Stony Brook University offers top-tier academics backed by major research activity and strong STEM and health science programs. As a public research university, it <span className="nowrap">delivers exceptional academic value, rigorous education,</span> and global recognition at an accessible cost.
                    </>
                  )
                  : isNjcu
                    ? (
                    <>
                      <span className="nowrap">NJCU is built around access, equity, and student success,</span> particularly for transfer and first-generation students. Its urban locaiton, supportive academic environment, and career-connected programs make it a strong option for <span className="nowrap">students seeking flexibility, affordability, and proximity to</span> New York City opportunities.
                    </>
                  )
                    : isNjit
                      ? 'NJIT delivers rigorous, high-value education in engineering, computing, and applied sciences. Known for strong research output and industry alignment, NJIT prepares students for competitive STEM careers while offering excellent return on investment through public tuition rates.'
                      : isOhioState
                        ? 'Ohio State University combines academic breadth, research excellence, and national recognition. Students benefit from extensive academic resources, strong employer credibility, and one of the largest alumni networks in the world, creating long-term value beyond graduation.'
                        : isSuny
                          ? 'The SUNY system provides high-quality, affordable education with strong transfer mobility across New York State. Designed to serve diverse student populations, SUNY institutions offer clear pathways to degree completion, broad program options, and consistent credit transfer opportunities.'
                          : isSdsu
                            ? 'SDSU is known for career-oriented programs, strong employer connections, and applied research excellence. With high graduation rates and strong placement outcomes, SDSU is especially attractive to transfer students seeking efficient pathways into business, engineering, public health, and professional careers.'
                            : isMvnu
                              ? (
                                <>
                                  <span className="nowrap">Mount Vernon Nazarene University offers a personalized,</span> values-driven education focused on both academic growth and character development. Small class sizes, supportive faculty, and a transfer-friendly environment help students progress with confidence toward meaningful careers.
                                </>
                              )
                              : isFranklin
                                ? 'Franklin University is designed specifically for adult learners and transfer students, offering flexible scheduling and generous credit acceptance. Its career-aligned programs allow students to reduce time to graduation while balancing work, family, and education.'
                                : isCmu
                                  ? (
                                    <>
                                      Central Michigan University focuses on career readiness through practical learning, strong mentorship, and accessible education. With flexible formats, affordable tuition, and scholarship opportunities, CMU supports <span className="nowrap">students who want to complete their degrees efficiently</span> and enter the workforce with confidence.
                                    </>
                                  )
                                  : isPennState
                                    ? 'Penn State is known for academic rigor, scale, and lifelong value through one of the strongest alumni networks globally. Students gain access to respected programs, extensive research opportunities, and flexible transfer pathways that support both academic and professional success.'
                                  : (
                                    <>
                                      Pace University offers career-focused education rooted&nbsp;in
                                      <br />
                                      real-world experience, with strong access to internships,
                                      <br />
                                      employer partnerships, and industry networks in New
                                      <br />
                                      York City. Its programs are designed for flexibility and
                                      <br />
                                      career mobility, making Pace an ideal choice for transfer
                                      <br />
                                      students, working professionals, and those seeking
                                      <br />
                                      strong outcomes in business, healthcare, law, and
                                      <br />
                                      technology.
                                    </>
                                  )}
              </p>
              {!isPace && !isPennState && !isStonyBrook && (
                <p>
                  {isIndianaTech
                    ? 'Indiana Tech emphasizes practical, skills-driven learning aligned with today\'s workforce needs. With a strong focus on techbology, cybersecurity, engieering, and business, the university provides flexible and affordable programs designed to help students advance quickly into high-demand careers.'
                    : isNjcu
                      ? ''
                      : isNjit
                        ? ''
                        : isOhioState
                          ? ''
                          : isSuny
                            ? ''
                            : isSdsu
                              ? ''
                              : isMvnu
                                ? ''
                                : isFranklin
                                  ? ''
                                  : isCmu
                                    ? ''
                                    : 'Pace University is designed to give students a jumpstart to a better job by putting quality education within their reach. Lean business practices make it possible for us to offer remarkably low tuition. Scholarships are available.'}
                </p>
              )}
            </div>
            <div className="university-why-logo">
              <img
                src={isStonyBrook ? '/images/whystony.svg' : (university.whyLogo || university.headerLogo || university.logo)}
                alt={university.name}
              />
            </div>
          </div>
        </section>
      )}
      <div className="university-savings">
        <SavingsCalculator />
      </div>
      <section className={`university-courses ${isIndianaTech ? 'is-indiana-tech' : ''} ${isStonyBrook ? 'is-stony' : ''} ${isNjcu ? 'is-njcu' : ''} ${isNjit ? 'is-njit' : ''} ${isOhioState ? 'is-ohio' : ''} ${isSuny ? 'is-suny' : ''} ${isSdsu ? 'is-sdsu' : ''} ${isMvnu ? 'is-mvnu' : ''} ${isFranklin ? 'is-franklin' : ''} ${isCmu ? 'is-cmu' : ''}`}>
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
                <h3>{isNjcu ? 'NJCU' : isStonyBrook ? 'Stony Brook' : university.name} Course Equivalency &amp; Transfer Guide</h3>
                <p>Type: Search by "Open Credits", "{isNjcu ? 'NJCU' : isStonyBrook ? 'Stony Brook' : university.name}", course number (e.g., MAT 131), or keywords (e.g., "Python").</p>
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
                  <img className="cart-icon" src="/images/add_shopping_cart.svg" alt="Add to cart" />
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

