import React, { useRef, useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import VideoJS from './VideoJS';
import Info from './Info';

const NoteBlock = styled.div``;

const Note = () => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(null);

  const videoJsOptions = useMemo(() => ({
    autoplay: "muted",
    // autoplay: false,
    controls: true,
    responsive: true,
    fluid: true, // 이게 뭐야?
    sources: [{
      // src: 'https://www.youtube.com/watch?v=AZGcmvrTX9M',
      src: 'https://www.youtube.com/watch?v=yLlgy7Vnelo', // 내 사람이여
      // src: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc', // 스티브 잡스
      type: 'video/youtube',
      // src: 'http://localhost:3000/file_example_MP4_480_1_5MG.mp4',
      // type: 'video/mp4',
    }]
  }));

  const onReady = useCallback((player) => {
    console.log('USECALLBACK!!!!');
    // console.log(player);
    playerRef.current = player;

    // setTimeout(() => player.muted(false), 1000 * 3);
    // player.muted(false);

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });

    player.on("timeupdate", () => {
      setCurrentTime(player.currentTime());
      // console.log('timeupdate');
    });

    player.on("loadedmetadata", () => {
      player.log('duration: ' + player.duration());
    });
  }, []);

  // const onTimeUpdate = useCallback((time) = {
  //   setCurrentTime(time);
  // }, [setCurrentTime]);

  return (
    <NoteBlock>
      <VideoJS options={videoJsOptions} onReady={onReady} />
      <Info currentTime={currentTime} />
    </NoteBlock>
  );
}

export default Note;
