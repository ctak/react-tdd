import React, { useState } from "react";
import Average from "./components/Average";
import Counter from './components/Counter';
import CounterWithReducer from "./components/CounterUseReducer";
import Info from "./components/Info";
import InfoWithCustomHook from "./components/InfoWithCustomHook";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />
      {visible && <Info />}
      <hr />
      <Counter />
      <hr />
      <CounterWithReducer />
      <hr />
      <Average />
      <hr />
      <InfoWithCustomHook />
    </>
  );
}

export default App;
