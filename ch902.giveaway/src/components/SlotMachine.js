import React, { useEffect, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';

/**
 * Styled React Functional Component
 */

// 🧧 🥉 🥉 🥉
const SlotMachineBlock = styled.div`
  background: #1a2b45;
  padding: 3rem;

  .doors {
    display: inline-flex;
    border: 1px solid red;
  }

  .door {
    background: #fafafa;
    width: 100px;
    height: 110px;
    // overflow: hidden;
    border-radius: 5px;
    margin: 5px;
  }

  .boxes {
    transition: transform 1s ease-in-out;
  }

  .box {
    border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
  }
`;

const SlotMachine = ({ cards0, cards1, cards2, isSpin, lotto }) => {

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
      pools[idx] = ['❓'];

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
    init(false, 1, 2);

    for (const door of doors) {
      const boxes = door.querySelector('.boxes');
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = 'translateY(0)';
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }, [init]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {

    if (isSpin) {
      spin();
    } else {
      init();
    }
  }, [isSpin, spin]);

  return (
    <SlotMachineBlock>
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
    </SlotMachineBlock>
  );
};

export default SlotMachine;
