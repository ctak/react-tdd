const myLogger = store => next => action => {
  console.log(action);
  const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
  // next 를 호출하지 않게 된다면 액션이 무시처리 된다.
  // 업데이트 이후의 상태를 조회합니다.
  // 그렇다면 sync 작업이네.
  console.log('\t', store.getState());
  return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefind
  // return 을 해야 하는 이유는 뭐지? 그리고 뭘 리턴한다는 것일까?
}

export default myLogger;