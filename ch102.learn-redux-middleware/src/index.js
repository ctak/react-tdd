import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

import { composeWithDevTools } from 'redux-devtools-extension';
// import myLogger from './middlewares/myLogger';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

// 지금 상태에서는 applyMiddleware 와 devtools 를 결합할 수 없네.
// 이렇게 결합하는 군. middleware 는 계속해서 추가할 수 있겠고,
// devTools 도 사용할 수 있겠군.
const store = createStore(
  rootReducer, 
  // 여러개의 미들웨어를 적용 할 수 있습니다.
  // logger 를 사용하는 경우, logger 가 가장 마지막에 와야합니다.
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);
// const store = createStore(rootReducer, composeWithDevTools());

// const delay = () => (dispatch, getState) => {
//   setTimeout(() => dispatch(action), 1000);
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
