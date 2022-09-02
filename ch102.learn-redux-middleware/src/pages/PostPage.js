import React from 'react';
import PostContainer from '../containers/PostContainer';
import { useParams, useNavigate } from 'react-router-dom';

function PostPage() {
  const params = useParams();
  const { id } = params; // URL 파라미터 조회하기

  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  }

  return <PostContainer postId={parseInt(id, 10)} goToHome={goToHome} />;
}

export default PostPage;
