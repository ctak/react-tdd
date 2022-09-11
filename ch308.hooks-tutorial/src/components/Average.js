import React, { useState, useMemo, useCallback, useRef } from 'react';

function getAverage(numbers) {
  console.log('getAverage()...');
  // let total = 0;
  // numbers.forEach(num => total += num);
  // let n = total / numbers.length;
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  console.log('sum => ' + sum);
  return sum / numbers.length;
}

const Average = () => {
  console.log('rendering');
  const [num, setNum] = useState(''); // 문자로 가져가는 게 맞겠군.
  const [arr, setArr] = useState([]);

  const inputRef = useRef(null); // null 이므로 나중에 설정해 준다. 이정도로 이해.

  // 이럴 때 생성은 된다는 것이지.
  const onAdd = useCallback(e => {
    console.log('onAdd()...');
    setArr([...arr, parseInt(num, 10)])
    setNum('');
    inputRef.current.focus(); // current 하는 순간 DOM 이라는 것이지.
  }, [num, arr]); // arr 도 읽고, num 도 읽는군.

  const onChange = useCallback(e => {
    console.log('onChange()...');
    setNum(e.target.value);
  }, []);

  // useEffect(() => {
  //   console.log(`useEffect::avg => ${avg}`);
  //   setAvg(average());
  // }, [arr]);

  const avg = useMemo(() => {
    return getAverage(arr);
  }, [arr]);

  // const avg = getAverage(arr);

  return (
    <div>
      <div>
        <input value={num} onChange={onChange} ref={inputRef}></input>
        <button onClick={onAdd}>등록</button>
      </div>
      <ul>
        {arr.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
      <div>
        {/* <b>평균값:</b> {arr.length ? avg : ''} */}
        {/* <b>평균값:</b> {getAverage(arr)} */}
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
