import React, { useMemo, useState } from 'react';
import '../App.css';
import './ResourcesPage.css';

const resourcesHeroImage = '/images/resourcescenter.png';
const resourcesCardImage = '/images/resourcecenters.svg';

const ResourcesPage = () => {
  const tabs = ['Seminars', 'Blog', 'Case Studies', 'Events', 'Free Resources'];
  const [activeTab, setActiveTab] = useState('Blog');

  const items = useMemo(
    () => ({
      Seminars: [
        {
          id: 'sem-1',
          title: 'Seminar Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'sem-2',
          title: 'Seminar Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'sem-3',
          title: 'Seminar Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        }
      ],
      Blog: [
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
      ],
      'Case Studies': [
        {
          id: 'case-1',
          title: 'Case Study Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'case-2',
          title: 'Case Study Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'case-3',
          title: 'Case Study Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        }
      ],
      Events: [
        {
          id: 'event-1',
          title: 'Event Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'event-2',
          title: 'Event Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'event-3',
          title: 'Event Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        }
      ],
      'Free Resources': [
        {
          id: 'free-1',
          title: 'Resource Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'free-2',
          title: 'Resource Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        },
        {
          id: 'free-3',
          title: 'Resource Title',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
          image: resourcesCardImage
        }
      ]
    }),
    []
  );

  return (
    <div className="resources-page">
      <div className="resources-container">
        <div className="resources-header">
          <h1>Resource Center</h1>
          <p>
            Resources to Help You Earn Credits Faster and Everything you need to choose the right
            courses, understand transfer, and build a smarter degree path, for less.
          </p>
        </div>

        <div className="resources-gallery">
          <img src={resourcesHeroImage} alt="Resource center overview" />
        </div>

        <div className="resources-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={tab === activeTab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="resources-list">
          {(items[activeTab] || []).map((item) => (
            <article key={item.id} className="resources-card">
              <div className="resources-card-image">
                <img src={item.image || resourcesCardImage} alt="" />
              </div>
              <div className="resources-card-body">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button type="button">Read More</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
