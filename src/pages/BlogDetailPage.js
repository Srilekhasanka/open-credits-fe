import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetailPage.css';

const blogPosts = {
  'blog-1': {
    title: 'Blog Title',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Open Credits',
    date: 'Feb 22, 2026',
    readTime: '5 min read',
    image: '/images/resourcecenters.svg',
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."
    ]
  },
  'blog-2': {
    title: 'Blog Title',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Open Credits',
    date: 'Feb 20, 2026',
    readTime: '5 min read',
    image: '/images/resourcecenters.svg',
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."
    ]
  },
  'blog-3': {
    title: 'Blog Title',
    subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Open Credits',
    date: 'Feb 18, 2026',
    readTime: '5 min read',
    image: '/images/resourcecenters.svg',
    content: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text."
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
            <div className="blog-detail__avatar">OC</div>
            <div>
              <span className="blog-detail__author">{post.author}</span>
              <span className="blog-detail__date">{post.readTime} &middot; {post.date}</span>
            </div>
          </div>
        </div>
        <div className="blog-detail__hero">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="blog-detail__content">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
