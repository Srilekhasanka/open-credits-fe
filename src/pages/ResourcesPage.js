import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import '../App.css';
import './ResourcesPage.css';

const resourcesCardImage = '/images/resourcecenters.svg';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'What is Open Credits?',
    description:
      "Open Credits is a modern way to earn college credit without the cost, time, or rigidity of traditional college semesters. Instead of enrolling in full on-campus courses, students complete self-paced, accredited online courses that are designed to transfer into U.S. universities.",
    image: '/images/1.jpg'
  },
  {
    id: 'blog-2',
    title: 'Credit Transfer Hardships and How Students Can Overcome Them',
    description:
      "Millions of students transfer colleges every year. Yet credit transfer remains one of the biggest barriers to graduation. Students often face credits that do not transfer as expected, confusing advising, lost time, and unexpected tuition costs.",
    image: '/images/2.jpg'
  },
  {
    id: 'blog-3',
    title: 'College Credit 101: What Every Student Should Know Before Taking College Credits',
    description:
      "A college credit represents the amount of academic work completed in a course. Most degrees require between 120 and 130 credits to graduate. Understanding how credits work is essential before transferring schools.",
    image: '/images/3.jpg'
  },
  {
    id: 'blog-4',
    tag: 'Case Study',
    title: 'Open Credits Helps International Student Oman Tagale Save a Year and Secure $24,000 in Scholarships',
    description:
      "Open Credits announced a successful transfer outcome for international student Oman Tagale, who saved one full year of time, reduced education costs by over $23,000, and secured $24,000 in transfer scholarships after completing transferable credits through Open Credits.",
    image: '/images/case1.jpg'
  },
  {
    id: 'blog-5',
    tag: 'Case Study',
    title: 'Open Credits Helps Hult Business School Student Sahana Maheshwari Graduate a Semester Early and Save Over $10,000',
    description:
      "Open Credits announced a successful early graduation outcome for Sahana Maheshwari, a senior at Hult Business School, who graduated a semester ahead of schedule while saving more than $10,000 in tuition and living expenses.",
    image: '/images/case2.webp'
  },
  {
    id: 'blog-6',
    tag: 'Case Study',
    title: 'Open Credits Helps Pace University Student Arham Jain Complete His Degree Remotely and Save Nearly $40,000',
    description:
      "Open Credits announced a successful degree completion outcome for Arham Jain, a Business Administration student at Pace University, who completed his final graduation requirement remotely from India, saving nearly $40,000 in tuition, travel, and living expenses.",
    image: '/images/case3.jpg'
  }
];

const ResourcesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="resources-page">
      <SEO
        title="Blog & Resources"
        description="Read student success stories, college credit guides, and transfer tips on the Open Credits blog."
        canonicalPath="/resources"
      />
      <img className="resources-blob resources-blob--top-left" src="/images/left.svg" alt="" />
      <img className="resources-blob resources-blob--top-right" src="/images/right.svg" alt="" />
      <div className="resources-container">
        <div className="resources-header">
          <h1>Blogs</h1>
          <p>
            Stay updated with resources to Help You Earn Credits Faster and Everything you need to choose the right courses,
            <br />
            understand transfer, and build a smarter degree path, for less.
          </p>
        </div>

        <div className="resources-list">
          {blogPosts.map((item) => (
            <ScrollReveal key={item.id} variant="fade-up"><article className="resources-card">
              <div className="resources-card-image">
                <img src={item.image} alt="" />
              </div>
              <div className="resources-card-body">
                <h2>{item.tag && <span className="resources-card-tag">{item.tag} : </span>}{item.title}</h2>
                <p>{item.description}</p>
                <button type="button" onClick={() => navigate(`/blog/${item.id}`)}>Read More</button>
              </div>
            </article></ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
