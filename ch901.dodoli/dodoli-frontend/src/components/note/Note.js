import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import VideoJS from './VideoJS';
import Info from './Info';
import Control from './Control';
import { floor } from '../../lib/mathUtils';
import { nanoid } from 'nanoid';
import PhraseList from './PhraseList';

const NoteBlock = styled.div``;

const Note = () => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [isPlay, togglePlay] = useState(false);

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
      setDuration(player.duration());
    });
  }, [playerRef]);

  // const onTimeUpdate = useCallback((time) = {
  //   setCurrentTime(time);
  // }, [setCurrentTime]);

  const mark = () => {
    console.log('[mark] start...');
    // const player = playerRef.current;
    const ps = [...phrases];
    const curTime = floor(currentTime, 2);

    if (ps.length === 0) {
      ps.push(
        {
          id: nanoid(12),
          from: 0,
          to: curTime,
        },
        {
          id: nanoid(12),
          from: curTime,
          to: duration,
        }
      );
    }

    setPhrases(ps);
    console.log('[mark] end.')
    // cursor 는 항상 
  }

  const playPhrase = () => {
    console.log('[playPhrase] start...');
    const player = playerRef.current;
    const phrase = phrases[cursor];
  }

  const onMark = () => {
    const player = playerRef.current
    player.pause();
    mark();
    playPhrase();
  };

  useEffect(() => {
    console.log(nanoid(12));
  }, []);

  return (
    <NoteBlock>
      <VideoJS 
        options={videoJsOptions} 
        onReady={onReady} 
        phrases={phrases}
        cursor={cursor}
        isPlay={isPlay}
      />
      <Info 
        currentTime={currentTime} 
        duration={duration}
      />
      <Control 
        onMark={onMark}
      />
      <PhraseList phrases={phrases} />
    </NoteBlock>
  );
}

export default Note;
