// n 밀리세컨드 동안 기다리는 프로미스를 만들어주는 함수
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// 가짜 포스트 목록 데이터
// JSON 은 아니군.
const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어를 배워봅시다',
    body: '리덕스 미들웨어를 직접 만들어보면 이해하기 쉽죠.'
  },
  {
    id: 2,
    title: 'redux-thunk 를 사용해 봅시다',
    body: 'redux-thunk 를 사용해서 비동기 작업을 처리해 봅시다!'
  },
  {
    id: 3,
    title: 'redux-saga도 사용해 봅시다',
    body: '나중엔 redux-saga를 사용해서 비동기 작업을 처리하는 방법도 배워볼 거예요.'
  },
]

// 포스트 목록을 가져오는 비동기 함수
export const getPosts = async () => {
  await sleep(500);
  return posts;
};

// ID 로 포스트를 조회하는 비동기 함수
export const getPostById = async id => {
  await sleep(500);
  return posts.find(post => post.id === id);
}