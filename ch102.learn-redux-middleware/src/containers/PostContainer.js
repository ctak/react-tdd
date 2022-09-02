import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, goToHome } from '../modules/posts'; // PromiseThunk 즉 redux-thunk 에서 처리하겠지.
import Post from '../components/Post';

function PostContainer({ postId, goToHome }) {
  const { data, loading, error } = useSelector(state => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return <div>데이터 없음.</div>

  return (
    <>
      <button onClick={goToHome}>홈으로 이동</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer;
