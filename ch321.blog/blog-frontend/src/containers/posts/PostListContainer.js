import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts'; // LIST_POSTS 의 액션생성함수
import { useLocation, useParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const params = useParams();

  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
  }));
  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const { username } = params;
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search, params]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
