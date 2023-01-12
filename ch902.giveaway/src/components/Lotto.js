import { useEffect, useState, useCallback, useMemo } from 'react';
import styled from "styled-components";
import SlotMachine from './SlotMachine';
import { roster } from '../resources/data_roster';
import LottoTable from './LottoTable';
import LottoControl from './LottoControl';
import { nanoid } from 'nanoid';

const LottoBlock = styled.div`
  position: relative;
  height: 100vh;

  .board-block {
    position: absolute;
    height: 10vh;
    left: 0;
    right: 0;
    bottom: 0px;
    overflow: hidden;
    background: yellow;
    color: red;
  }
`;
const CasinoBlock = styled.div`
  display: flex;
  height: 90vh;
`;
const Lotto = () => {
  const [ranking, setRanking] = useState(4);
  const [lots, setLots] = useState([...Array(20).keys()]);

  const [cards0, setCards0] = useState([]);
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  const [isSpin, setSpin] = useState(false);
  const [lotto, setLotto] = useState(null);

  // const names = useMemo(() => ([...roster.split(',')]), []);
  const names = useMemo(() => {
    const list = [...roster.split(',')];
    console.log('!!!! roster.length => ' + list.length);
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
    const targetIdx = Math.floor(Math.random() * names.length);
    // console.log('targetIdx:', targetIdx);
    const targetName = names[targetIdx];
    console.log('targetName:', targetName);
    // target.push(...targetName.split(''));
    // if (target.length === 2) { target.push(''); }
    setLotto(targetName);
  }, [names]);

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
    // setTarget();
    setSpin(prev => {
      if (prev) {
        return false;
      } else {
        setTarget();
        return true;
      }
    });
  }, [setTarget]);

  const onRankingClick = useCallback((rank) => {
    setRanking(prev => rank);
    if (rank === 1) {
      setLots(prev => [...Array(1).keys()]);
    } else if (rank === 2) {
      setLots(prev => [...Array(5).keys()]);
    } else if (rank === 3) {
      setLots(prev => [...Array(10).keys()]);
    } else {
      setLots(prev => [...Array(20).keys()]);
    }
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
              key={nanoid(12)}
              cards0={cards0}
              cards1={cards1}
              cards2={cards2}
              isSpin={isSpin}
              lotto={lotto}
            />
          ))}
        </LottoTable>
        <LottoControl
          onRankingClick={onRankingClick}
          onPlayClick={onPlayClick}
        />
      </CasinoBlock>
      <div className="board-block">
        <div>border-block</div>
        <div>border-block</div>
        <div>border-block</div>
        <div>border-block</div>
        <div>border-block</div>
        <div>border-block</div>
      </div>
      {/* <SlotMachine
        cards0={cards0}
        cards1={cards1}
        cards2={cards2}
        isSpin={isSpin}
        lotto={lotto}
      />
      <button onClick={handleClick}>{isSpin ? 'Reset' : 'Play'}</button> */}
    </LottoBlock>
  );
};

export default Lotto;
