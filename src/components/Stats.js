import React from 'react';
import './Stats.css';
import { FaDollarSign, FaUsers, FaBook, FaGraduationCap, FaTrophy, FaAward } from 'react-icons/fa';

const Stats = () => {
  const stats = [
    { icon: <FaDollarSign />, label: '$100+', sublabel: 'SAVED' },
    { icon: <FaUsers />, label: '$1000+', sublabel: 'STUDENTS' },
    { icon: <FaBook />, label: '$200+', sublabel: 'COURSES' },
    { icon: <FaGraduationCap />, label: '$250+', sublabel: 'COLLEGES' },
    { icon: <FaTrophy />, label: 'NCCRS', sublabel: 'COURSES' },
    { icon: <FaAward />, label: 'ACE', sublabel: 'ACCREDITED' }
  ];

  return (
    <section className="stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-sublabel">{stat.sublabel}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
