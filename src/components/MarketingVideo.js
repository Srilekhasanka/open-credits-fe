import React from 'react';
import './MarketingVideo.css';

const MarketingVideo = () => {
  return (
    <section className="marketing-video">
      <div className="marketing-video-container">
        <div className="marketing-video-frame">
          <iframe
            className="marketing-video-embed"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Marketing video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default MarketingVideo;
