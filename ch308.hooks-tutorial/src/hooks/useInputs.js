import { useReducer } from 'react';

// 이렇게 외부에 있다는 게, 정말 큰 의미인가?
// 만약 내부에 있다면 useCallback 을 써야 했네. 쓸 수 나 있을까?
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = e => {
    dispatch(e.target);
  }
  return [state, onChange]; // 커스텀 hooks 에서 리턴값이 상당히 중요하군. react 의 useState 처럼 말야.
}
