import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../components/PostList';
import { getPosts } from '../modules/posts'; // 음, 액션생성함수 그러나 thunk(함수를 만들어내는 함수)

function PostListContainer() {
  // useSelector 로 redux store 에서 상태를 가져오겠지.
  // state.posts.posts 여기서 두번째 token 은 combineReducers() 에서 사용된 것.
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch(); // 일반적으로 액션생성함수를 실행하는데, 지금은 thunk 함수를 실행할 것임.

  // 컴포넌트 마운트 후 포스트 목록 요청
  // 그렇다면 loading 부터 시작하는 것임.
  // 왜 브라우저를 refresh 하면 두 번 호출되는 거야?
  // 수정한 다음 하면 한 번만 호출되고 말이야.
  // exit 하면서 한 번 호출되는 것일까?
  useEffect(() => {
    if (data) return;
    dispatch(getPosts());
  }, [data, dispatch]); // 여기서 왜 [dispatch] 가 의존성에 걸릴까, dispatch 가 바뀐다는 것은 store 가 바뀐다는 것 아닌가.

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

export default PostListContainer;
