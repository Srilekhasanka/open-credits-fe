import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetailPage.css';

const blogPosts = {
  'blog-1': {
    title: 'What is Open Credits?',
    subtitle: 'A Smarter Way to Earn College Credit',
    author: 'Open Credits',
    date: 'Feb 22, 2026',
    readTime: '5 min read',
    image: '/images/1.jpg',
    content: [
      { type: 'heading', text: 'What is Open Credits?' },
      "Open Credits is a modern way to earn college credit without the cost, time, or rigidity of traditional college semesters. Instead of enrolling in full on-campus courses, students complete self-paced, accredited online courses that are designed to transfer into U.S. universities.",
      "These credits can be used to satisfy general education and lower-division requirements, helping students move faster toward graduation while saving thousands in tuition.",
      { type: 'heading', text: 'How Open Credits Work' },
      "Open Credits courses are:",
      { type: 'list', items: ['Fully online and self-paced', 'Nationally accredited', 'Designed to align with university transfer requirements', 'Completed in weeks, not months'] },
      "Students choose the courses they need, complete them on their own schedule, and submit the transcript to universities for credit evaluation.",
      "For many students, this means avoiding an extra semester just to complete one or two missing classes.",
      { type: 'heading', text: 'Who is Open Credits For?' },
      "Open Credits supports:",
      { type: 'list', items: ['Transfer students filling credit gaps', 'International students earning U.S. credits remotely', 'Students returning to college after dropping out', 'Learners with prior knowledge who want faster progress'] },
      "Whether you are transferring between schools or restarting your degree, Open Credits helps you move forward without repeating coursework.",
      { type: 'heading', text: 'Why Open Credits Matter' },
      "Traditional college is expensive and slow. Many students repeat material they already know and pay full tuition for it.",
      "Open Credits changes that by offering:",
      { type: 'list', items: ['Lower-cost alternatives to university courses', 'Faster degree completion', 'Flexible learning schedules', 'Clear transfer pathways'] },
      "This approach helps students graduate sooner and with less debt.",
      { type: 'heading', text: 'The Bottom Line' },
      "Open Credits is not a shortcut. It is a smarter system.",
      "By completing transferable credits early and affordably, students stay in control of their education and reach graduation faster."
    ]
  },
  'blog-2': {
    title: 'Credit Transfer Hardships and How Students Can Overcome Them',
    subtitle: 'The Reality of Credit Transfer in the U.S.',
    author: 'Open Credits',
    date: 'Feb 20, 2026',
    readTime: '5 min read',
    image: '/images/2.jpg',
    content: [
      { type: 'heading', text: 'The Reality of Credit Transfer in the U.S.' },
      "Millions of students transfer colleges every year. Yet credit transfer remains one of the biggest barriers to graduation.",
      "Students often face:",
      { type: 'list', items: ['Credits that do not transfer as expected', 'Confusing or outdated advising', 'Lost time and repeated coursework', 'Unexpected tuition costs'] },
      "These issues disproportionately affect community college students, international students, and first-generation learners.",
      { type: 'heading', text: 'Why Credit Transfer Is So Difficult' },
      "Most colleges use different course numbering systems, degree maps, and internal policies. A class that counts at one institution may be considered an elective or rejected entirely at another.",
      "Advising systems are often overloaded. Students wait weeks for appointments and still receive unclear answers.",
      "The result is wasted credits and delayed graduation.",
      { type: 'heading', text: 'Financial and Emotional Hardships' },
      "Credit transfer problems are not just academic. They create real hardships.",
      "Students may:",
      { type: 'list', items: ['Pay for extra semesters they cannot afford', 'Lose financial aid eligibility', 'Delay career plans by a year or more', 'Drop out entirely due to frustration'] },
      "Many students leave college not because they failed, but because the system failed them.",
      { type: 'heading', text: 'How Open Credits Help Reduce These Risks' },
      "Open Credits are built with transfer in mind.",
      "Courses are:",
      { type: 'list', items: ['Aligned with common general education requirements', 'Clearly documented for evaluation', 'Designed to prevent duplicate coursework'] },
      "By completing credits strategically before transfer, students reduce uncertainty and protect their time and money.",
      { type: 'heading', text: 'A Better Path Forward' },
      "Credit transfer does not have to be a gamble.",
      "With the right planning and transferable coursework, students can move between institutions with confidence and finish their degrees on schedule."
    ]
  },
  'blog-3': {
    title: 'College Credit 101: What Every Student Should Know Before Taking College Credits',
    subtitle: 'Understanding how credits work before you transfer.',
    author: 'Open Credits',
    date: 'Feb 18, 2026',
    readTime: '5 min read',
    image: '/images/3.jpg',
    content: [
      { type: 'heading', text: 'What Is a College Credit?' },
      "A college credit represents the amount of academic work completed in a course. Most degrees require between 120 and 130 credits to graduate.",
      "Credits fall into categories such as:",
      { type: 'list', items: ['General education', 'Lower-division major requirements', 'Upper-division major courses', 'Electives'] },
      "Understanding these categories is essential before transferring schools.",
      { type: 'heading', text: 'Why General Education Credits Matter Most' },
      "General education credits are the most transferable credits across institutions. These include subjects like math, writing, social sciences, and natural sciences.",
      "Completing these early allows students to:",
      { type: 'list', items: ['Transfer as a junior or senior', 'Focus on major coursework after transfer', 'Avoid repeating basic classes'] },
      "This is where Open Credits provide the most value.",
      { type: 'heading', text: 'Lower-Division vs Upper-Division Credits' },
      "Lower-division credits are typically taken in the first two years of college. These are more widely accepted during transfer.",
      "Upper-division credits are major-specific and often require enrollment at the destination university.",
      "Completing lower-division requirements early gives students flexibility and leverage during transfer.",
      { type: 'heading', text: 'How Credit Planning Saves Time and Money' },
      "Students who plan credits strategically:",
      { type: 'list', items: ['Graduate faster', 'Pay fewer semesters of tuition', 'Avoid unnecessary electives', 'Reduce stress during transfer'] },
      "A single missing credit can delay graduation by months. Proper planning prevents that risk.",
      { type: 'heading', text: 'Final Takeaway' },
      "College credits are not just numbers. They are time, money, and momentum.",
      "Understanding how credits work and completing transferable courses early can make the difference between dropping out and graduating on time.",
      "Open Credits exist to make that path clearer and more accessible."
    ]
  },
  'blog-4': {
    title: 'Open Credits Helps International Student Oman Tagale Save a Year, Secure $24,000 in Scholarships, and Transfer Successfully as a Junior',
    subtitle: 'A successful transfer outcome through strategic credit planning.',
    author: 'Open Credits',
    date: 'Feb 16, 2026',
    readTime: '7 min read',
    image: '/images/case1.jpg',
    content: [
      "Cupertino, CA — Open Credits, a platform helping students accelerate degree completion through transferable online college credits, announced a successful transfer outcome for international student Oman Tagale, who saved one full year of time, reduced education costs by over $23,000, and secured $24,000 in transfer scholarships after completing a full year of transferable credits through Open Credits.",
      "Oman began his academic journey in the United States at De Anza College, a community college in Cupertino, California, with the goal of transferring to a four-year university and pursuing quantitative finance. While academically strong in high school, Oman faced challenges adjusting to a new academic system, culture, and pace as an international student.",
      "During his early semesters at De Anza, these challenges led to academic setbacks, including flunking and repeating several courses. This delayed his progress toward transfer and placed him at risk of spending an additional year at community college.",
      "An extra year at De Anza would have resulted in:",
      { type: 'list', items: ['Approximately $15,000 in tuition and fees', 'An additional $12,000 to $15,000 in living expenses', 'A full year lost in time toward graduation'] },
      "Seeking a more efficient path forward, Oman connected with the Open Credits team for personalized academic advising.",
      { type: 'heading', text: 'A Strategic Credit Plan' },
      "After a detailed review of his transcript, academic goals, and long-term interests, Open Credits identified SUNY Buffalo as a strong academic and strategic fit for Oman's interest in quantitative finance, with favorable credit transfer policies.",
      "Rather than recommending another year at community college, Open Credits designed a customized academic plan that allowed Oman to complete one full year of transferable, college-level credits online. These courses were mapped to SUNY Buffalo's lower-division requirements and completed in approximately one month, enabling Oman to recover lost time and regain academic momentum.",
      { type: 'heading', text: 'The Results' },
      "As a result, Oman was able to:",
      { type: 'list', items: ['Transfer to SUNY Buffalo as a junior', 'Save one full year toward graduation', 'Reduce tuition and living expenses by over $23,000 net', 'Qualify for $24,000 in merit-based transfer scholarships covering his remaining two years of study', 'Return to a clear and confident academic path after early setbacks'] },
      "The strong academic performance demonstrated through Open Credits coursework played a key role in strengthening Oman's transfer profile and scholarship eligibility as a transfer student.",
      { type: 'heading', text: 'A Defining Turning Point' },
      "\"Oman's journey shows that early academic challenges do not have to define a student's future,\" said the Open Credits team. \"With the right credit strategy and guidance, students can regain control of their timeline, finances, and opportunities.\"",
      "Open Credits continues to support international and community college students nationwide by offering transfer-ready online college credits, personalized advising, and accelerated pathways to degree completion.",
      "For Oman, what began as a difficult start became a defining turning point.",
      "His story reflects the impact of strategic credit planning and the power of giving students the flexibility they need to succeed."
    ]
  },
  'blog-5': {
    title: 'Open Credits Helps Hult Business School Student Sahana Maheshwari Graduate a Semester Early and Save Over $10,000',
    subtitle: 'A strategic decision in her senior year translated into an earlier graduation.',
    author: 'Open Credits',
    date: 'Feb 14, 2026',
    readTime: '5 min read',
    image: '/images/case2.webp',
    content: [
      "Boston, MA — Open Credits, a platform helping students accelerate degree completion through transferable online college credits, announced a successful early graduation outcome for Sahana Maheshwari, a senior at Hult Business School, who graduated a semester ahead of schedule while saving more than $10,000 in tuition and living expenses.",
      "Sahana was in her final year at Hult Business School in Boston when she identified an opportunity to complete her remaining degree requirements ahead of time. As a private university student, an additional semester would have meant significant tuition costs and delayed entry into the workforce.",
      "Looking for a more efficient path, Sahana enrolled in two transferable, college-level courses through Open Credits during her senior year. These courses were strategically selected to align with Hult's academic and transfer requirements.",
      "The experience was seamless. Sahana completed both courses smoothly, and the credits transferred successfully to Hult Business School without complications. By fulfilling her remaining requirements through Open Credits, she was able to graduate one full semester early.",
      { type: 'heading', text: 'The Results' },
      "As a result, Sahana was able to:",
      { type: 'list', items: ['Graduate a semester ahead of schedule', 'Save over $10,000 in tuition and related expenses', 'Avoid an additional semester of enrollment at a high-cost institution', 'Complete her degree with a smooth and stress-free credit transfer process'] },
      "\"Sahana's story highlights how even students close to graduation can benefit from flexible, transfer-ready credits,\" said the Open Credits team. \"With the right planning, students can save both time and money without compromising academic quality.\"",
      "Open Credits continues to support students at private and public universities by offering online college credits that help accelerate graduation timelines and reduce the overall cost of higher education.",
      "For Sahana, a strategic decision in her senior year translated into an earlier graduation and a strong financial win."
    ]
  },
  'blog-6': {
    title: 'Open Credits Helps Pace University Student Arham Jain Complete His Degree Remotely and Save Nearly $40,000',
    subtitle: 'A simple, fast, and affordable path to graduation from abroad.',
    author: 'Open Credits',
    date: 'Feb 12, 2026',
    readTime: '5 min read',
    image: '/images/case3.jpg',
    content: [
      "New York, NY — Open Credits announced a successful degree completion outcome for Arham Jain, a Business Administration student at Pace University, who completed his final graduation requirement remotely from India, saving nearly $40,000 in tuition, travel, and living expenses.",
      "Arham had completed almost all of his coursework for a bachelor's degree in Business Administration at Pace University and had returned to India after finishing his major requirements. While preparing to formally graduate, he realized that he was missing one remaining general education requirement in psychology.",
      "Under traditional circumstances, this would have required Arham to return to the United States, re-enroll as an international student, and register for at least 12 credits to maintain visa compliance. This would have meant paying for a full semester of tuition, international flight tickets, and the cost of living in New York, all to complete a single course.",
      "Instead, Arham connected with Open Credits for a more efficient solution.",
      { type: 'heading', text: 'A Simple Solution' },
      "The Open Credits team identified a transfer-ready psychology course that Arham could complete fully online while remaining in India. He completed the course in under two weeks, and the credit transferred successfully to Pace University, satisfying his final degree requirement.",
      { type: 'heading', text: 'The Results' },
      "As a result, Arham was able to:",
      { type: 'list', items: ['Complete his bachelor\'s degree without returning to the U.S.', 'Avoid enrolling in an unnecessary full semester', 'Save nearly $40,000 in tuition, flights, and living expenses', 'Graduate on time with minimal disruption'] },
      "\"Arham's experience shows how last-mile degree requirements can create unnecessary financial and logistical barriers for international students,\" said the Open Credits team. \"Flexible, transfer-ready credits can eliminate those barriers entirely.\"",
      "Open Credits supports students worldwide by offering online college credits designed to help students finish degrees faster, reduce costs, and avoid delays caused by rigid academic systems.",
      "For Arham, what could have been a costly return trip and an extra semester became a simple, fast, and affordable path to graduation."
    ]
  }
};

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="blog-detail">
        <div className="blog-detail__container">
          <h1>Blog post not found</h1>
          <button type="button" onClick={() => navigate('/resources')}>Back to Blogs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <div className="blog-detail__container">
        <h1 className="blog-detail__title">{post.title}</h1>
        <p className="blog-detail__subtitle">{post.subtitle}</p>
        <div className="blog-detail__meta">
          <div className="blog-detail__author-info">
            <div className="blog-detail__avatar"><img src="/images/company-logo.svg" alt="Open Credits" /></div>
            <div>
              <span className="blog-detail__author">{post.author}</span>
              <span className="blog-detail__date">{post.readTime} &middot; {post.date}</span>
            </div>
          </div>
        </div>
        <ScrollReveal variant="fade-up">
          <div className="blog-detail__hero">
            <img src={post.image} alt={post.title} />
          </div>
        </ScrollReveal>
        <ScrollReveal variant="fade-up">
          <div className="blog-detail__content">
            {post.content.map((block, idx) => {
              if (typeof block === 'string') return <p key={idx}>{block}</p>;
              if (block.type === 'heading') return <h2 key={idx}>{block.text}</h2>;
              if (block.type === 'list') return (
                <ul key={idx}>
                  {block.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              );
              return null;
            })}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default BlogDetailPage;
