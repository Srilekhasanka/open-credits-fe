import React from 'react';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import './AboutPage.css';

const aboutUsImage = '/images/aboutus.svg';

const AboutPage = () => {
  return (
    <section className="about-page">
      <div className="about-container">
        <div className="about-content">
          <h1>
            Making College More
            <br />
            Affordable. One Credit
            <br />
            at a Time.
          </h1>

          <p>
            For many students, earning a college degree isn't about starting over it's about finishing
            faster, paying less, and staying in control. Open Credits helps learners earn transferable
            college credits online through flexible, self-paced courses designed for real life.
          </p>

          <p>
            Our platform offers Nationally accredited recommended courses that are widely accepted by
            U.S. colleges and universities. By earning credits outside the traditional semester
            system, students can reduce tuition costs, accelerate graduation timelines, and avoid
            unnecessary debt without compromising academic quality. Whether you're returning to
            school, supplementing your current degree, or looking for a smarter alternative to
            high-cost tuition, Open Credits provides a clear, affordable pathway to college
            completion.
          </p>
        </div>

        <div className="about-image" aria-hidden="true">
          <img src={aboutUsImage} alt="Graduates walking on campus" />
        </div>
      </div>

      <Stats />
      <Testimonials />
      <FAQ />
    </section>
  );
};

export default AboutPage;
