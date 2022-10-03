import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import VideoJS from './VideoJS';
import Info from './Info';
import Control from './Control';
import { floor } from '../../lib/mathUtils';
import { nanoid } from 'nanoid';
import PhraseList from './PhraseList';

const NoteBlock = styled.div``;

const NotePlayer = ({ note }) => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [paused, setPaused] = useState(true);
  const [seekedTime, setSeekedTime] = useState(null);
  // const [isPlay, togglePlay] = useState(false);
  // const cursor = useRef(0);
  // const isPlay = useRef(false);
  const looped = useRef(0); // 각각의 control 에서 설정해야 함.
  const toTime = useRef(null); // playPhrase() 에서 설정.
  const fromTime = useRef(null);

  const timeoutID = useRef(undefined); // 각각의 control 에서 Clear 해야 함.

  const videoJsOptions = useMemo(() => ({
    // autoplay: "muted",
    autoplay: false,
    controls: true,
    inactivityTimeout: 0,
    responsive: true,
    fluid: true, // 이게 뭐야?
    // sources: [{
    //   // src: 'https://www.youtube.com/watch?v=AZGcmvrTX9M',
    //   src: 'https://www.youtube.com/watch?v=yLlgy7Vnelo', // 내 사람이여
    //   // src: 'https://www.youtube.com/watch?v=UF8uR6Z6KLc', // 스티브 잡스
    //   type: 'video/youtube',
    //   // src: 'http://localhost:3000/file_example_MP4_480_1_5MG.mp4',
    //   // type: 'video/mp4',
    // }],
    sources: [ note.source ],
  }), [note]);

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

    player.on('pause', () => {
      player.log('player is paused');
    })

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
      player.log('name: ', player.name());
    });

    player.on("seeked", (e) => {
      player.log('player is seeked.');
      setSeekedTime(player.currentTime());
    });

    player.on("seeking", (e) => {
      player.log('player is seeking.');
    })
  }, [playerRef]);


  // const onTimeUpdate = useCallback((time) = {
  //   setCurrentTime(time);
  // }, [setCurrentTime]);


  const playPhrase = useCallback(async (plus = true) => {
    console.log('!!!!!!!! [playPhrase] start...');
    console.log('phrases: ', phrases);
    const player = playerRef.current;
    // if (!player.dodoli) {
    //   player.dodoli = true;
    // }

    const { from, to, loop } = phrases[cursor];
    // console.log('typeof(to):', typeof(to)); // number
    console.log('loop: ', loop, ' vs. looped: ', looped.current);
    if (loop <= looped.current) {
      // next();
      setPaused(paused => true);
      return;
    }

    if (plus) {
      looped.current += 1;
    }
    if (looped.current === 1) {
      setPaused(paused => false);
    }

    fromTime.current = from;
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
  }, [playerRef, phrases, cursor]);

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




  useEffect(() => {
    console.log(nanoid(12));
    return () => {
      _clear();
    }
  }, [note]);

  /*
    playPhrase 는 [cursor] state 를 가지고 있어서, 다시 생성될 것이고,
    아래 effect 는 [playPhrase] 의존성 때문에 바로 실행되는 구나.
   */
  useEffect(() => {
      console.log('#3 phrases: ', phrases);
      const player = playerRef.current;
      if (!player || phrases.length === 0) return;

      // looped.current = 0;
      console.log('#3.1 playPhrase() before');
      playPhrase();
      console.log('#3.2 playPhrase() after');

    // const phrase = phrases[cursor.current];
    // player.currentTime(phrase.from);
    // player.play();
  // }, [phrases, ]); // 이 방식은 playPhrase 를 따로 실행해야 할 때.
  }, [phrases, playPhrase]);

  useEffect(() => {
    console.log('currentTime: ', currentTime && currentTime.toFixed(2), ', toTime: ', toTime.current);
    const player = playerRef.current;
    if (player && player.dodoli) {
      // player.dodoli = false;
      // console.log('paused(): ', player.paused());
      // console.log('loopd: ', looped.current);
      // console.log('phrases: ', phrases);

      if (currentTime >= toTime.current) {
        if (player.seeking()) return;
        console.log('여기서 seek 계산을 해야 하나. userActive():', player.userActive());
        player.dodoli = false; // 이게 핵심이었군!!!!
        player.pause();
        timeoutID.current = setTimeout(() => {
          playPhrase();
        }, 0);
      }
    }
  }, [currentTime, playPhrase]);

  useEffect(() => {
    console.log('#### seekedTime:', seekedTime, ', fromTime:', fromTime.current, ', toTime:', toTime.current);
    const player = playerRef.current;
    if (player && typeof fromTime.current === 'number') {
    // 위의 currentTime 과 혼선은 있지만 _clear() 할 수 있으니까.
      if (seekedTime < fromTime.current || seekedTime > toTime.current) {
        console.log('SEEKED!!!!')
        console.log('SEEKED!!!!')
        console.log('SEEKED!!!!')
        // player.pause();
        // _clear();

        const idx = phrases.findIndex(phrase => {
          return (
            phrase.from <= seekedTime &&
            seekedTime <= phrase.to
          );
        });

        // setCursor(cursor => idx);

        // setSeekedTime(null);
      }

    }

  }, [seekedTime, phrases]);

  /****************************************************************/
  // Handlers
  /****************************************************************/

  const _clear = () => {
    const id = timeoutID.current;
    if (typeof id === 'number') {
      clearTimeout(id);
    }
    timeoutID.current = undefined;
    looped.current = 0;
    const player = playerRef.current;
    player && (player.dodoli = false);
  }

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
    } else {
      const {from, to} = ps[cursor];
      ps.splice(cursor, 1,
        {
          id: nanoid(12),
          from,
          to: curTime,
          loop: 3,
        },
        {
          id: nanoid(12),
          from: curTime,
          to,
          loop: 3,
        }
      );
    }

    setPhrases(ps); // 현재 @20221003 에서는 Mark 를 누를 때마다 새로 phrases 가 만들어지고 있군.
    console.log('[mark] end.')
    // cursor 는 항상
    // playPhrase(); // mark 에서는 playPhrase() 가 여기 있으면 안됨.
  }

  const next = () => {
    console.log('[next] start...');
    setCursor(cursor => cursor + 1);
    console.log('[next] end.');
  }

  const prev = () => {
    console.log('[prev] start...');
    setCursor(cursor => cursor - 1);
    console.log('[prev] end.');
  }

  const onMark = () => {
    console.log('>>>> ON MARK');
    const player = playerRef.current;
    player.pause();
    _clear();
    mark();
  };

  const onNext = () => {
    console.log('>>>> ON NEXT');
    const player = playerRef.current;
    player.pause();
    _clear();
    next();
  }

  const onPrev = () => {
    console.log('<<<< ON PREV');
    const player = playerRef.current;
    player.pause();
    _clear();
    prev();
  }

  const onPlay = useCallback(() => {
    // console.group('ON PLAY paused: ', paused);
    const player = playerRef.current;
    if (! player) return;

    if (phrases.length > 0) {
      const { loop } = phrases[cursor];
      // 현재 도도리 상태가 아닌데 해당 프레이즈를 다시 실행시키는 것임.
      if (paused) {
        if (loop <= looped.current) {
          _clear();
          playPhrase();
        } else {
          playPhrase(false);
        }
        setPaused((paused) => false);
      } else {
        player.pause();
        setPaused((paused) => true);
      }
    } else {
      if (paused) {
        player.play();
        setPaused((paused) => false);
      } else {
        player.pause();
        setPaused((paused) => true);
      }

    }
  }, [paused, playPhrase, phrases, cursor]);

  // const onSeeked = useCallback(() => {
  // // const onSeeked = () => {
  //   console.log('@@@@ ON SEEKED');
  //   console.log('phrases.length:', phrases.length);
  //   if (phrases.length === 0) return;
  //   const player = playerRef.current;
  //   player.pause();
  //   _clear();

  //   const playerCurrentTime = player.currentTime();
  //   console.log('onSeeked.currentTime: ', playerCurrentTime);

  //   const idx = phrases.findIndex(phrase => {
  //     return (
  //       phrase.from <= playerCurrentTime &&
  //       phrase.to <= playerCurrentTime
  //     );
  //   });

  //   setCursor(cursor => idx);
  // }, [phrases]);
  // }

  return (
    <NoteBlock>
      <VideoJS
        options={videoJsOptions}
        onReady={onReady}
      />
      <Info
        currentTime={currentTime}
        duration={duration}
      />
      <Control
        onMark={onMark}
        onNext={onNext}
        onPrev={onPrev}
        paused={paused}
        onPlay={onPlay}
      />
      <PhraseList
        phrases={phrases}
        cursor={cursor}
      />
    </NoteBlock>
  );
}

export default NotePlayer;
