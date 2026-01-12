import React, { useState } from 'react';
import doYouHaveQuestions from '../assets/doyouhavequestions.png';
import whatsappIcon from '../assets/whatsapp.png';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How much Does the Course Cost?',
      answer: 'Our courses are priced at $180 per credit hour. We offer flexible payment plans and financial aid options to make education more accessible for everyone.'
    },
    {
      question: 'Are there additional Fees? Like book and material?',
      answer: 'No additional fees are required. All course materials, books, and resources are included in the course price. You get complete access to everything you need.'
    },
    {
      question: 'Is there a time commitment?',
      answer: 'Our courses are self-paced, allowing you to complete them according to your own schedule. Most students complete a course in 4-6 weeks, but you can take longer if needed.'
    },
    {
      question: 'Are there any monthly course fees?',
      answer: 'No monthly fees! You pay once for each course and have access until you complete it. No recurring charges or hidden subscription fees.'
    },
    {
      question: 'What is your 30 day money guarantee?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied with your course for any reason within the first 30 days, we\'ll provide a full refund.'
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
                  <span className="faq-icon">{activeIndex === index ? 'ƒ^\'' : '+'}</span>
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
