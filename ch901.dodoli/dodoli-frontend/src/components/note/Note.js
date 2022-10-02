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
  // const [cursor, setCursor] = useState(0);
  // const [isPlay, togglePlay] = useState(false);
  const cursor = useRef(0);
  const isPlay = useRef(false);
  const looped = useRef(0);
  const toTime = useRef(null);

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
  }), []);

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
      const curTime = player.currentTime();
      setCurrentTime(curTime);
      // console.log(curTime, ' vs ', currentTime, ' vs ', toTime.current);
      // if (player.dodoli && curTime >= toTime.current) {
      //   console.log('#0');
      //   player.pause();
      //   onSetCurrentTime();
      // }
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
          loop: 3,
        },
        {
          id: nanoid(12),
          from: curTime,
          to: duration,
          loop: 3,
        }
      );
    }

    setPhrases(ps);
    console.log('[mark] end.')
    // cursor 는 항상
  }

  const playPhrase = useCallback(async () => {
    console.log('!!!!!!!! [playPhrase] start...');
    console.log('phrases: ', phrases);
    const player = playerRef.current;
    // if (!player.dodoli) {
    //   player.dodoli = true;
    // }

    const { from, to, loop } = phrases[cursor.current];
    // console.log('typeof(to):', typeof(to)); // number
    console.log('loop: ', loop, ' vs. looped: ', looped.current);
    if (loop <= looped.current) {
      // next();
      return;
    }

    looped.current += 1;

    toTime.current = to;

    // player.on("timeupdate", () => {
    //   console.log('timeupdate');
    //   if (player.currentTime() > to) {
    //     player.pause();
    //   }
    // });

    // setCurrentTime(from);
    // player.pause();
    console.log('before paused', player.paused());

    player.currentTime(from);
    setCurrentTime(from);
    // player.play().then(() => {
    //   console.log('paused', player.paused());
    //   player.dodoli = true;
    // })

    // player.dodoli = false;
    await player.play();
    console.log('after paused', player.paused());
    player.dodoli = true;

    console.log(`LOOPING: ${loop} > ${looped.current}`);

    // if (loop > looped.current) {
    //   setTimeout(() => {
    //     playPhrase(); // 이렇게 해버리면 계속 콜이 되어 버리네.
    //   }, 1000);
    // }
  }, [playerRef, phrases]);

  // const onSetCurrentTime = useCallback(() => {
  //   console.log(phrases);
  //   console.log(cursor.current);
  //   if (phrases.length === 0) return;
  //   const { loop } = phrases[cursor.current];
  //   if (loop < looped.current) {
  //     setTimeout(() => {
  //       playPhrase();
  //     }, 1000);
  //   }

  // }, [phrases, playPhrase]);


  const onMark = () => {
    const player = playerRef.current
    console.log('#1');
    player.pause();
    mark();
  };

  useEffect(() => {
    console.log(nanoid(12));
  }, []);

  useEffect(() => {
      console.log('#3 phrases: ', phrases);
      const player = playerRef.current;
      if (!player || phrases.length === 0) return;

      looped.current = 0;
      console.log('hello world #1');
      playPhrase();
      console.log('hello world #2');



    // const phrase = phrases[cursor.current];
    // player.currentTime(phrase.from);
    // player.play();
  }, [phrases, playPhrase]);

  useEffect(() => {
    console.log('currentTime: ', currentTime, ', toTime: ', toTime.current);
    const player = playerRef.current;
    if (player && player.dodoli) {
      // player.dodoli = false;
      // console.log('paused(): ', player.paused());
      console.log('loopd: ', looped.current);
      // console.log('phrases: ', phrases);

      if (currentTime >= toTime.current) {
        player.dodoli = false; // 이게 핵심이었군!!!!
        player.pause();
        setTimeout(() => {
          playPhrase();
        }, 0);
      }
    }
  }, [currentTime, looped, playPhrase]);

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
