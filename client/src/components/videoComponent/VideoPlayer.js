import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoUrl }) => {

  const [videoId, setVideoId] = useState(null);
  const [videoWidth] = useState('80%'); 
  const [videoHeight] = useState('515'); 


  const getVideoId = (url) => {
    if (!url) return null;

    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    setVideoId(getVideoId(videoUrl));
  }, [videoUrl]);

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <iframe
        title="YouTube Video Player"
        width={videoWidth}
        height={videoHeight}
        src={videoSrc}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
