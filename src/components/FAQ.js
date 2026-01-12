import React, { useState } from 'react';
import doYouHaveQuestions from '../assets/doyouhavequestions.png';
import whatsappIcon from '../assets/whatsapp.png';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How much Does the Course Cost?',
      answer: 'Our courses are designed to be affordable and flexible, helping students save time and graduate faster. For U.S. students, each course costs $250, while international students pay $850 per course.'
    },
    {
      question: 'Why is Open Credits so affordable?',
      answer: 'Open Credits is fully online, so we don’t have the high costs of traditional colleges. That means you get high-quality courses at prices that fit your budget.'
    },
    {
      question: 'Will someone help me transfer my courses?',
      answer: 'Yes! Each student gets an academic advisor who guides you through the transfer process to make it smooth and stress-free.'
    },
    {
      question: 'How can I check if my university will accept these credits?',
      answer: 'You can either:\n1. See if your university is on our list of schools that accept our credits.\n2. Review your university’s transfer credit policy — if they accept credits from online courses, your credits usually qualify.'
    },
    {
      question: 'Are there exams? How is grading done?',
      answer: 'Yes, courses include online exams. Your final grade is based on participation, coursework, and exams, so you’re graded fairly while enjoying flexible online learning.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">
        <div className="faq-content">
          <h2>Frequently Asked <span className="highlight">Questions</span></h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="faq-support">
          <div className="support-card">
            <div className="support-image-wrap">
              <img
                className="support-image"
                src={doYouHaveQuestions}
                alt="Do you have questions"
              />
            </div>
            <h3 className="support-title">Do you have more questions?</h3>
            <p className="support-text">
              End-to-end payments and financial management in a single solution. Meet
              the right platform to help realize.
            </p>
            <div className="support-actions">
              <button className="btn-chat" type="button">
                Chat Now
                <img className="btn-chat-icon" src={whatsappIcon} alt="" aria-hidden="true" />
              </button>
              <button className="btn-advisor" type="button">Talk to an Advisor</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
