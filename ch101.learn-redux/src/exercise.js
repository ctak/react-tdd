import { createStore } from 'redux';

// 리덕스에서 관리할 상태는 결국 reducer 와 함께 정의해야 하는 것일까? 
// 아님 Actions 에 정의해야 하는 것일까?
const initialState = {
  counter: 0,
  text: '',
  list: []
};

/* 액션 type 정의 */
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성 함수 정의 */
// 여기에 param 들이 처음 보이겠네. state 의 단편들 말이지.
function increase() {
  return {
    type: INCREASE,
  };
}

const decrease = () => ({
  type: DECREASE
});

const changeText = text => ({
  type: CHANGE_TEXT,
  text, // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = item => ({
  type: ADD_TO_LIST,
  item
});

/* 리듀서 만들기 */
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다.
// 결로는 reducer(state, action) 인데 reducer(state = initialState, action) 이 되는 것이네.
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState());

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);

store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요!'));
store.dispatch(addToList({ id: 1, text: '와우' }));
