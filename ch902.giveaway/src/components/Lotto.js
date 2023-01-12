import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styled, { css } from "styled-components";
import SlotMachine from './SlotMachine';
import { roster } from '../resources/data_roster';
import LottoTable from './LottoTable';
import LottoControl from './LottoControl';
import { nanoid } from 'nanoid';
import { shuffle } from '../lib/tdashUtils';
import LottoBoard from './LottoBoard';

const LottoBlock = styled.div`
  position: relative;
  height: 100vh;
`;
const CasinoBlock = styled.div`
  display: flex;
  height: 90vh;
`;

const BoardBlock = styled.div`
  z-index: 20;
  position: absolute;
  height: 10vh;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow: hidden;
  background: #130326;
  transition: height 0.3s;
  transition-timing-function: ease-in;
  border-top-left-radius: 2rem;
  // border-top-right-radius: 1rem;
  padding: 3rem 2rem 1rem;

    ${props =>
      props.isVisible &&
      css`
        height: 90vh;
      `}

`;

const Lotto = () => {
  const [ranking, setRanking] = useState(4);
  const [lots, setLots] = useState([...Array(20).keys()]);

  const [cards0, setCards0] = useState([]);
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  const [isSpin, setSpin] = useState(false);
  // const [lotto, setLotto] = useState(null);

  const [rank4, setRank4] = useState([]);
  const [rank3, setRank3] = useState([]);
  const [rank2, setRank2] = useState([]);
  const [rank1, setRank1] = useState([]);

  const [isVisible, setVisible] = useState(false); // 아래 결과 Board.

  const rosterRef = useRef(null);

  // const names = useMemo(() => ([...roster.split(',')]), []);
  const names = useMemo(() => {
    const list = [...roster.split(',')];
    console.log('!!!! roster.length => ' + list.length);
    rosterRef.current = list;
    return list;
  }, []);

  const fillCard = (size, cards) => {
    const nextCards = [];
    for (let i = 0; i < 100; i++) {
      nextCards.push(...cards);
      if (nextCards.length > size) {
        return nextCards.slice(0, size);
      }
    }
    //return nextCards;
  };

  // const target = [];

  const setTarget = useCallback(() => {
    console.log('!!!! setTarget');
    // target.length = 0;
    // const targetIdx = Math.floor(Math.random() * names.length);
    // // console.log('targetIdx:', targetIdx);
    // const targetName = names[targetIdx];
    // console.log('targetName:', targetName);
    // // target.push(...targetName.split(''));
    // // if (target.length === 2) { target.push(''); }
    // setLotto(targetName);
    const roster = rosterRef.current;
    console.log('roster.length:', roster.length);
    console.log('roster: ', roster.join(','));
    const roster2 = shuffle(shuffle(roster));
    console.log('roster2: ', roster2.join(','));

    let lottos;
    if (ranking === 4) {
      const len = 20;
      lottos = roster2.splice(0, len);
      console.log('4.lottos: ', lottos.join(','));
      if (lottos.length < len) {
        alert('ERROR #4');
        return;
      }
      setRank4(prev => lottos);
      setLots(prev => lottos);
    } else if (ranking === 3) {
      const len = 10;
      lottos = roster2.splice(0, len);
      console.log('3.lottos: ', lottos.join(','));
      if (lottos.length < len) {
        alert('ERROR #3');
        return;
      }
      setRank3(prev => lottos);
      setLots(prev => lottos);
    } else if (ranking === 2) {
      const len = 5;
      lottos = roster2.splice(0, len);
      console.log('2.lottos: ', lottos.join(','));
      if (lottos.length < len) {
        alert('ERROR #2');
        return;
      }
      setRank2(prev => lottos);
      setLots(prev => lottos);
    } else if (ranking === 1) {
      const len = 1;
      lottos = roster2.splice(0, len);
      console.log('1.lottos: ', lottos.join(','));
      if (lottos.length < len) {
        alert('ERROR #1');
        return;
      }
      setRank1(prev => lottos);
      setLots(prev => lottos);
    }
    rosterRef.current = roster2;
  }, [ranking]);

  const set = useCallback(() => {
    console.log('play test start...');

    // setTarget();

    const chars0 = [];
    const chars1 = [];
    const chars2 = [];

    names.forEach(n => {
      const characters = n.split('');
      chars0.push(characters[0]);
      chars1.push(characters[1]);
      characters[2] && chars2.push(characters[2]);
    });
    // console.log('chars0:', chars0);
    // console.log('chars1:', chars1);
    // console.log('chars2:', chars2);

    const max = [chars0.length, chars1.length, chars2.length].reduce((a, c) => c > a ? c : a, 0);
    // console.log(max);
    // cards[0].push(...fillCard(max * 3, chars0));
    // cards[1].push(...fillCard(max * 3, chars1));
    // cards[2].push(...fillCard(max * 3, chars2));
    // console.log('card2:', cards[2]);
    const salt = 3;
    setCards0(prev => fillCard(max * salt, chars0));
    setCards1(prev => fillCard(max * salt, chars1));
    setCards2(prev => fillCard(max * salt, chars2));
  }, [names]);

  const onPlayClick = useCallback(() => {
    if (!isSpin) {
      setTarget();
      setSpin(true);      
    }
    // setSpin(prev => {
    //   if (prev) {
    //     return false;
    //   } else {
    //     setTarget();
    //     return true;
    //   }
    // });
  }, [setTarget, isSpin]);

  const onRankingClick = useCallback((rank) => {
    if (ranking === rank) {
      alert('동일');
      return;
    } else {
      if (rank === 4 && rank4.length > 0) {
        alert('4등은 이미 뽑았습니다! 뽑힌 화면을 보여주어야 해.');
        return;
      }
      if (rank === 3 && rank3.length > 0) {
        alert('3등은 이미 뽑았습니다!');
        return;
      }
      if (rank === 2 && rank2.length > 0) {
        alert('2등은 이미 뽑았습니다!');
        return;
      }
      if (rank === 1 && rank1.length > 0) {
        alert('모두 뽑았습니다!');
        return;
      }
      setSpin(false);
    }
    //
    setRanking(rank);
    if (rank === 1) {
      setLots(prev => [...Array(1).keys()]);
    } else if (rank === 2) {
      setLots(prev => [...Array(5).keys()]);
    } else if (rank === 3) {
      setLots(prev => [...Array(10).keys()]);
    } else {
      setLots(prev => [...Array(20).keys()]);
    }
  }, [ranking, rank4, rank3, rank2, rank1]);

  const onResetClick = useCallback(() => {
    // 일단 roster 를 갱신해야 함.
    rosterRef.current = names;
    console.log(`reset. roster length => ${rosterRef.current.length}`);
    //
    setSpin(false);
    //
    setRank4([]);
    setRank3([]);
    setRank2([]);
    setRank1([]);
    //
    // setRanking(4);
  }, [names]);

  const onToggleBoard = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(prev => !prev);
  }, []);

  useEffect(() => {
    console.log('start...');
    set();
  }, [set]);


  return (
    <LottoBlock>
      <CasinoBlock>
        <LottoTable ranking={ranking}>
          {lots.map((lot, index) => (
            <SlotMachine
              key={lot + index}
              cards0={cards0}
              cards1={cards1}
              cards2={cards2}
              isSpin={isSpin}
              lotto={lot}
              delay={index}
            />
          ))}
        </LottoTable>
        <LottoControl
          onRankingClick={onRankingClick}
          onPlayClick={onPlayClick}
          onResetClick={onResetClick}
        />
      </CasinoBlock>
      <BoardBlock
        isVisible={isVisible}
        onClick={e => onToggleBoard(e)}
      >
        <LottoBoard 
          rank1={rank1}
          rank2={rank2}
          rank3={rank3}
          rank4={rank4}
        />
      </BoardBlock>
    </LottoBlock>
  );
};

export default Lotto;
