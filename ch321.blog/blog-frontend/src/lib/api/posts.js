import qs from 'qs';
import client from './client';

// 글쓰기
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

// 포스트 읽기
export const readPost = id => client.get(`/api/posts/${id}`);

// 포스트 목록
export const listPosts = ({ page, username, tag }) => {
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });
  return client.get(`/api/posts?${queryString}`);
};

// 글 업데이트
export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, {
    title,
    body,
    tags,
  });

// 글 삭제
export const removePost = id => client.delete(`/api/posts/${id}`);
