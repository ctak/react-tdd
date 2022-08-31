// action.type
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// action creator
// 왜 export 인가, container 에서 dispatch 하기 위해서이다.
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// initial state
const initialState = 0;

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
