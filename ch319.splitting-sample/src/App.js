import logo from './logo.svg';
import './App.css';

/* // 함수를 spliting 하기
// import notify from './notify';
function App() {
  const onClick = () => {
    // notify();
    import('./notify').then(result => result.default());
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>Hello React!</p>
      </header>
    </div>
  );
}

*/

/* state 를 사용한 코드 스플리팅 */
/*
import { Component } from 'react';

class App extends Component {
  state = {
    SplitMe: null
  };
  handleClick = async () => {
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadedModule.default,
    });
  };
  render() {
    const { SplitMe } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p onClick={this.handleClick}>Hello React!</p>
          {SplitMe && <SplitMe />}
        </header>
      </div>
    );
  }
}
*/
/* React.lazy 와 Suspense 사용하기 */
/*
import React, { useState, Suspense } from 'react';
const SplitMe = React.lazy(() => import('./SplitMe'));

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>Hello React!</p>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
};
*/
/* Loadable Components 를 통한 코드 스플리팅 */
import { useState } from 'react';
import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>Hello React!</p>
        {visible && <SplitMe />}
      </header>
    </div>
  );  
};

export default App;
