import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

// action.type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

// action creator
// 왜 export 인가, container 에서 dispatch 하기 위해서이다.
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// initial state
const initialState = 0;

function* increaseSaga() {
  yield delay(1000); // 1초를 기다린다음, 바로 실행되는 것인가? 멈추는 것인가?
  yield put(increase()); // put 은 특정 액션을 디스패치 해줍니다.
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// couterSaga 를 어디선가 사용하겠군. 이건 export. increaseSaga 와 decreaseSaga 는 private 이네.
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리. 그런데 핸들거가 없는데,
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
