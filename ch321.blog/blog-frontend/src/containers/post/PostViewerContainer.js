import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostViewer from '../../components/post/PostViewer';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer =  () => {
  const navigate = useNavigate();

  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(({post, loading, user}) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    user: user.user,
  }));

  useEffect(() => {
    dispatch( readPost(postId) );
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    navigate('/write');
  }

  const onRemove = async () => {
    try {
      await removePost(postId);
      navigate('/'); // 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={<PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
      ownPost={user && user.id === post && post.id}
    />
  );
}

export default PostViewerContainer;
