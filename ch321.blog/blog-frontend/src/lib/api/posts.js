import client from './client';

// 글쓰기
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

// 포스트 읽기
export const readPost = id => client.get(`/api/posts/${id}`);
