/* 액션 타입 */
// Ducks 패턴을 따를 땐 액션의 이름에 접두사를 붙여주세요.
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* 액션 생성 함수 */
let nextId = 1;
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextId++,
    text
  }
});

// todo 에는 { id, text, } 에 { done, } 정도가 있어야 하지 않을까?
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
});


/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요 없습니다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없습니다. )
// const initialState = {
//   number: 0,
//   diff: 1
// };

const initialState = [
  /* 우리는 다음과 같이 구성된 객체를 이 배열 안에 넣을 것입니다.
  {
    id: 1,
    text: '예시',
    done: false,
  }
  */
];

/* 리듀서 */
// 리듀서가 default 이네.
// 모듈 이름과 동일하네. 어떻게 보면 상태네.
// 리듀서에서는 액션의 값을 사용하지, 현재까지는 만들지는 않는군.
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case TOGGLE_TODO:
      return state.map(todo => (
        todo.id === action.id
          ? { ...todo, done: !todo.done }
          : todo
      ));
    default:
      return state;
  }
}
