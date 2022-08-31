/* 
 * 컨테이너 컴포넌트란, 리덕스 스도어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미합니다.
 * 그리고, HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용합니다.
 * 왜 그렇게 해야 할까? 더 복잡해지는 것 같은데. 재사용을 위해서 인가? 그럼 Pages/ 가 아닐까?
 * 
 * useSelector 최적화는 redux 의 state 의 변화로 관련 없는 component 가 update 되는 것을 방지하는 것으로, useSelector 에서 const {a, b} = useSelector((state) => ({a, b})) 방식으로 하면 문제가 발생하는 것이다.
 */
import React from "react";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter'; // Provider 에서 만들 때는 rootReducer 를 사용하였지만, 각각의 사용이 필요한 Component 에서는 개별 subreducer 로 하는군.

function CounterContainer() {
  // useSelector 는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state 의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  // 음. store 객체를 만들 수 는 없고, 참조할 수도 없고, Provider 로 감싸져 있으니까,
  // 이렇게 useSelector 로 가져오는 것이 좋겠군.
  // 매번 새로운 객체 { counter, number } 를 return 하고 있었군.
  // const { number, diff } = useSelector(state => ({
  //   number: state.counter.number,
  //   diff: state.counter.diff,
  // }));
/*   // 1st. solution
  const number = useSelector(state => state.counter.number);
  const diff = useSelector(state => state.counter.diff);
 */  
  // 2nd. solution
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }), shallowEqual);


  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용할 수 있게 해주는 Hook 입니다.
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요.
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props 로 넣어줍니다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
