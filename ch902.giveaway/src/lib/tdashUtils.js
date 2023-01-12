// https://developer-talk.tistory.com/248
export const debounceFunction = (callback, delay) => {
  let timer;
  return (...args) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer); // event 가 계속해서 발생할 때마다 계속 취소함.
    // delay 가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
