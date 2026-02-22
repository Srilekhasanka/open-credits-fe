import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './ResourcesPage.css';

const resourcesCardImage = '/images/resourcecenters.svg';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Blog Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
    image: resourcesCardImage
  },
  {
    id: 'blog-2',
    title: 'Blog Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
    image: resourcesCardImage
  },
  {
    id: 'blog-3',
    title: 'Blog Title',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
    image: resourcesCardImage
  }
];

const ResourcesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="resources-page">
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
            <article key={item.id} className="resources-card">
              <div className="resources-card-image">
                <img src={item.image} alt="" />
              </div>
              <div className="resources-card-body">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button type="button" onClick={() => navigate(`/blog/${item.id}`)}>Read More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
