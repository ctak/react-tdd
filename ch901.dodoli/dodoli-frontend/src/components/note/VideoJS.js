import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import 'videojs-youtube/dist/Youtube.min.js';

export const VideoJS = (props) => {
  // console.log('VIDEOJS!!!!');
  // const [currentTime, setCurrentTime] = useState(null);

  const placeholderRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {
    options,
    onReady,
    phrases,
    cursor,
    isPlay,
  } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const placeholderEl = placeholderRef.current;
      const videoElement = placeholderEl.appendChild(
        document.createElement("video-js")
      );

      const player = (playerRef.current = videojs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
        // player.play();

        // player.on("timeupdate", () => {
        //   setCurrentTime(player.currentTime());
        // });

        // player.on("loadedmetadata", () => {
        //   player.log('duration: ' + player.duration());
        // });

        // player.on("pause", () => {
        //   player.currentTime(60);
        // })

        // setTimeout(() => {
        //   player.muted(false); // 이게 되네.
        // }, 1000);

      }));

      // You can update player in the `else` block here, for example:
    } else {
      console.log('player.current is NOT NULL');
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, playerRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  React.useEffect(() => {
    console.log('////////////////////////////////////////////////////////////////');
  }, [phrases, cursor, isPlay]);

  return (
    <>
      <div ref={placeholderRef}></div>
    </>
  );
};

export default VideoJS;