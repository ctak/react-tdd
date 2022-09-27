/*
  // <React.StrictMode>
    <App />
  // </React.StrictMode>

  React.StrictMode 를 지우면 잘 작동함.
*/
import React, { useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube/dist/Youtube.min.js';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null); // Element
  const playerRef = React.useRef(null); // player instance
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      console.log('ELSE...')
      // const player = playerRef.current;

      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [playerRef, options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoJS;
