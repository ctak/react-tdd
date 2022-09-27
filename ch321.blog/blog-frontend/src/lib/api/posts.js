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
