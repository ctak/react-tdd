import { useEffect, useState, useCallback, useMemo } from 'react';
import SlotMachine from './components/SlotMachine';

function App() {
  const [cards0, setCards0] = useState([]);
  const [cards1, setCards1] = useState([]);
  const [cards2, setCards2] = useState([]);

  const [isSpin, setSpin] = useState(false);
  const [lotto, setLotto] = useState(null);

  const names = useMemo(() => ([
    '탁창범',
    '김효석',
    '김기현',
    '홍지희',
    '홍채림',
    '정다은',
    '정지혜',
    '정준',
  ]), []);

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

  const handleClick = useCallback(() => {
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

  useEffect(() => {
    console.log('start...');
    set();
  }, [set]);

  return (
    <div className="App">
      <SlotMachine
        cards0={cards0}
        cards1={cards1}
        cards2={cards2}
        isSpin={isSpin}
        lotto={lotto}
      />
      <button onClick={handleClick}>{isSpin ? 'Reset' : 'Play'}</button>
    </div>
  );
}

export default App;
