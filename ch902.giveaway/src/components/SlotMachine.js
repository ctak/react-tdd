import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

/**
 * Styled React Functional Component
 */

const SlotMachineBlock = styled.div`
  background: #35654d;
  // background: #c9272c;
  // background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
  //             radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
  border-radius: 5px;
  padding: 1rem;
  // overflow: hidden;
  witdh: 100%;
  aspect-ratio: 16 / 9;
  
  .doors {
    // display: flex;
    width: 100%;
    // border: 1px solid blue;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.2rem;
    // gap: 1rem;
    flex: 1;
    
  }

  .door {
    background: #fafafa;
    width: 100%;
    // height: 100%;
    aspect-ratio: 9 / 12;
    // height: 110px;
    overflow: hidden;
    border-radius: 5px;
    // margin: 5px;
    // border: 2px solid red;
  }

  .boxes {
    transition: transform 2s ease-in-out;
    // transition: transform 1s ease-out;
    // transition: transform 1s cubic-bezier(.2,.12,0,.99)
  }

  .box {
    // border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
`;

const SlotMachine = ({ cards0, cards1, cards2, isSpin, lotto, delay }) => {

  const elRef = useRef(null);

  const shuffle = useCallback((_arr, index) => {
    console.log('shuffle...');
    const arr = [..._arr];
    // console.log(`shuffle(${index})::[${target[index]}]::arr:`, arr.join('-'));
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }

    if (lotto) {
      console.log(`lotto:<${lotto}>...`)
      const target = lotto.split('');
      if (target.length === 2) { target.push(''); }
      //
      const idx = arr.findIndex(c => c === target[index]);
      if (idx < 0) {
        console.log('외자이름.');
      }
      arr.splice(idx, 1);
      arr.push(target[index]);
    }

    return arr;
  }, [lotto]);

  const init = useCallback((firstInit = true, duration = 2) => {
    console.log(`init(${firstInit})...`);
    const doors = elRef.current.querySelectorAll('.door');

    const pools = [
      [],
      [],
      [],
    ];
    let idx = -1;
    for (const door of doors) {
      idx += 1;
      if (firstInit) {
        door.dataset.spinned = '0';
      } else if (door.dataset.spinned === '1') {
        return;
      }

      const cards = idx === 0 ? [...cards0]
        : idx === 1 ? [...cards1]
        : [...cards2];

      const boxes = door.querySelector('.boxes');
      const boxesClone = boxes.cloneNode(false);
      //const pool = ['❓'];
      // pools[idx] = ['❓'];
      pools[idx] = ['🧧'];

      if (!firstInit) {
         // console.log('firstInit is false');
        // const arr = [];
        // for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        //   arr.push(...items);
        // }
        pools[idx].push(...shuffle(cards, idx));
        // console.log(`pools[${idx}]: ${pools[idx]}`);

        boxesClone.addEventListener(
          'transitionstart',
          function () {
            door.dataset.spinned = '1';
            this.querySelectorAll('.box').forEach((box) => {
              box.style.filter = 'blur(1px)';
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          'transitionend',
          function () {
            this.querySelectorAll('.box').forEach((box, index) => {
              box.style.filter = 'blur(0)';
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pools[idx].length - 1; i >= 0; i--) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = door.clientWidth + 'px';
        box.style.height = door.clientHeight + 'px';
        // console.log(`[${pools[idx][i]}]`);
        box.textContent = pools[idx][i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pools[idx].length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }, [cards0, cards1, cards2, shuffle]);

  const spin = useCallback(async () => {
    console.log('spin...');
    const doors = elRef.current.querySelectorAll('.door');
    // setTarget();
    // init(false, 1, 2);
    init(false);

    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }, [init]);

  useEffect(() => {
    console.log('useEffect() #1');
    init();
  }, [init]);

  useEffect(() => {
    console.log('useEffect() #2');
    if (isSpin) {
      setTimeout(() => {
        spin();
      }, delay * Math.floor(Math.random() * 3) * 100);
      // spin();
    } else {
      init();
    }
  }, [isSpin, spin, init]);

  return (
    <SlotMachineBlock>
      {/* <div className="device-block"> */}
        <div className="doors" ref={elRef}>
          <div className="door">
            <div className="boxes">
              {/* <div className="box">🥉</div> */}
            </div>
          </div>
          <div className="door">
            <div className="boxes">
              {/* <div className="box">탁</div> */}
            </div>
          </div>
          <div className="door">
            <div className="boxes">
              {/* <div className="box">🥉</div> */}
            </div>
          </div>
        </div>
      {/* </div> */}
    </SlotMachineBlock>
  );
};

export default React.memo(SlotMachine);
