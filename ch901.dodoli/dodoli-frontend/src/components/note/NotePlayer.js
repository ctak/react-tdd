import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import VideoJS from './VideoJS';
import Info from './Info';
import Control from './Control';
import { floor } from '../../lib/mathUtils';
import { nanoid } from 'nanoid';
import PhraseList from './PhraseList';

const NoteBlock = styled.div``;

function totalLoopOfPhrase (phrases, cursor) {
  console.log('totalLoopOfPhrase!!!');
  if (phrases.length === 0) return;
  return phrases[cursor].loop;
}

const NotePlayer = ({ note }) => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [duration, setDuration] = useState(null);
  const [phrases, setPhrases] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [paused, setPaused] = useState(true);

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
    console.log('onReady!!!!');
    playerRef.current = player;

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
    });

    player.on("loadedmetadata", () => {
      player.log('duration: ' + player.duration());
      setDuration(player.duration());
      // player.log('name: ', player.name()); // 아무것도 나오지 않음.
    });

    player.on("seeked", (e) => {
      player.log('player is seeked.');
    });

    player.on("seeking", (e) => {
      player.log('player is seeking.');
    })
  }, [playerRef]);

  const playPhrase = useCallback(async (plus = true) => {
    console.log('!!!!!!!! [playPhrase] start...');
    // console.log('phrases: ', phrases);
    const player = playerRef.current;

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

    player.currentTime(from);
    setCurrentTime(from);

    // player.play().then(() => {
    //   console.log('paused', player.paused());
    //   player.dodoli = true;
    // })
    // player.dodoli = false;

    await player.play();
    player.dodoli = true;

    console.log(`LOOPING: ${loop} > ${looped.current}`);

    // if (loop > looped.current) {
    //   setTimeout(() => {
    //     playPhrase(); // 이렇게 해버리면 계속 콜이 되어 버리네.
    //   }, 1000);
    // }
  }, [playerRef, phrases, cursor]);

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

  const onSeeked = useCallback((currentTime) => {
    console.log('ON SEEKED!!!!')

    const idx = phrases.findIndex(phrase => {
      return (
        phrase.from <= currentTime &&
        currentTime <= phrase.to
      );
    });

    setCursor(cursor => idx);
  }, [phrases]);

  useEffect(() => {
    // console.log('currentTime: ', currentTime && currentTime.toFixed(2), ', toTime: ', toTime.current);
    const player = playerRef.current;

    if (player && player.dodoli) {
      // seeked 체크
      if (currentTime < (fromTime.current - 1) || currentTime > (toTime.current + 1)) {
        console.log('SEEKED!!!!')
        console.log('seeking:', player.seeking());
        if (player.seeking()) return;

        setTimeout(() => {
          player.pause();
          _clear();
          onSeeked(currentTime);
        }, 0)

        return;
      }

      if (currentTime >= toTime.current) {
        // console.log('여기서 seek 계산을 해야 하나. userActive():', player.userActive());
        player.dodoli = false; // 이게 핵심이었군!!!!
        player.pause();
        timeoutID.current = setTimeout(() => {
          playPhrase();
        }, 0);
      }
    }
  }, [currentTime, playPhrase]);

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

  const mark = useCallback(() => {
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
  });

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

  const onClickPhrase = useCallback((phraseId) => {
    const player = playerRef.current;
    if (!phraseId) return;
    player.pause();
    _clear();
    const idx = phrases.findIndex(phrase => {
      return (
        phrase.id === phraseId
      );
    });
    setCursor(cursor => idx);
  }, [phrases]);

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

  // const totalLoop = totalLoopOfPhrase(phrases, cursor);
  const totalLoop = useMemo(() => totalLoopOfPhrase(phrases, cursor), [phrases, cursor]);

  return (
    <NoteBlock>
      <VideoJS
        options={videoJsOptions}
        onReady={onReady}
      />
      <Info
        currentTime={currentTime}
        duration={duration}
        count={looped.current}
        total={totalLoop}
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
        onClickPhrase={onClickPhrase}
      />
    </NoteBlock>
  );
}

export default NotePlayer;
