import React from 'react';
import './Testimonials.css';
import shagunPhoto from '../assets/Shagun.png';
import meisiPhoto from '../assets/Meisi.png';
import aditiPhoto from '../assets/Aditi.png';
import isabellaPhoto from '../assets/Isabella.png';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Shagun',
      school: 'SUNY Buffalo',
      text: 'I got admitted to SUNY Buffalo, TMU, and Yorkville with 60 transferable credits, saving two years of tuition and living costs. Open Credits was reliable and guided me every step. I graduated faster and opened doors I never imagined.',
      color: 'cream',
      photo: shagunPhoto
    },
    {
      id: 2,
      name: 'Meisi L',
      school: 'University of Wisconsin',
      text: 'Studying journalism abroad seemed impossible due to high fees. Open Credits affordable courses gave me 1.5 years worth of credits, plus a small scholarship, helping me finish my U.S. degree for under $50K. Open Credits made it possible.',
      color: 'mint',
      photo: meisiPhoto
    },
    {
      id: 3,
      name: 'Aditi Joshi',
      school: 'National University of Singapore',
      text: 'I started Open Credits to save costs and unexpectedly earned credits that were recognized by NUS. Thanks to Open Credits, I joined with a year\'s worth of credits proving they are reliable and truly open opportunities.',
      color: 'lavender',
      photo: aditiPhoto
    },
    {
      id: 4,
      name: 'Isabella Silva',
      school: 'California State University',
      text: 'Working full-time, I earned Open Credits credits and transferred them to California State University. I finished my Data Science degree in 1.5 years instead of 4. Open Credits helped me graduate faster and advance my career.',
      color: 'rose',
      photo: isabellaPhoto
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
                  <img className="testimonial-avatar" src={item.photo} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.school}</p>
                  </div>
                </div>
                <p className="testimonial-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
