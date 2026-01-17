import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Shagun',
      school: 'SUNY Buffalo',
      text: 'I got admitted to SUNY Buffalo, TMU, and Yorkville with 60 transferable credits, saving two years of tuition and living costs. Open Credits was reliable and guided me every step. I graduated faster and opened doors I never imagined.',
      color: 'cream'
    },
    {
      id: 2,
      name: 'Meisi L',
      school: 'University of Wisconsin',
      text: 'Studying journalism abroad seemed impossible due to high fees. Open Credits affordable courses gave me 1.5 years worth of credits, plus a small scholarship, helping me finish my U.S. degree for under $50K. Open Credits made it possible.',
      color: 'mint'
    },
    {
      id: 3,
      name: 'Aditi Joshi',
      school: 'National University of Singapore',
      text: 'I started Open Credits to save costs and unexpectedly earned credits that were recognized by NUS. Thanks to Open Credits, I joined with a year\'s worth of credits proving they are reliable and truly open opportunities.',
      color: 'lavender'
    },
    {
      id: 4,
      name: 'Hina Khan',
      school: 'California Institute',
      text: 'Working with Open Credits helped me finish 1.5 years of credits quickly. The courses were clear and the support team kept me on track to advance my degree goals.',
      color: 'rose'
    }
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>
          Our <span className="highlight">Testimonials</span>
        </h2>
        <div className="testimonials-track" aria-label="Student testimonials">
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article key={item.id} className={`testimonial-card ${item.color}`}>
                <div className="testimonial-header">
                  <div className="testimonial-avatar" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.school}</p>
                  </div>
                </div>
                <p className="testimonial-text">"{item.text}"</p>
              </article>
            ))}
          </div>
          <div className="testimonials-grid" aria-hidden="true">
            {testimonials.map((item) => (
              <article key={`dup-${item.id}`} className={`testimonial-card ${item.color}`}>
                <div className="testimonial-header">
                  <div className="testimonial-avatar" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.school}</p>
                  </div>
                </div>
                <p className="testimonial-text">"{item.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
