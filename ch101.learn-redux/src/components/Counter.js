import React from 'react';

// @20220831 사실 이렇게 Presentational Component 를 만들어야 하는가? 
// 즉 Props 로 가져오는 이유는 무엇인가?
// Counter 에서 Data 를 가져와서 보여주면 되는 거 아닌가?
function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = e => {
    onSetDiff(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h1>{number}</h1>
      <div>
        {/* 여기서 min 값은 브라우저 상에서만 보여주는 값이군. */}
        <input type="number" value={"" + diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
}

export default Counter;
