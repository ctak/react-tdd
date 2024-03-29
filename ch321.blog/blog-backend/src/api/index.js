import Router from 'koa-router';
import posts from './posts/index.js';
import auth from './auth/index.js';

const api = new Router();

// api.get('/test', ctx => {
//   ctx.body = 'test 성공';
// });

api.use('/posts', posts.routes());
api.use('/auth', auth.routes()); // auth 가 뒤에 있어도 되네.

// 라우터를 내보냅니다.
// node.js 의 export
// module.exports = api; api 라는 객체를 exports 하네.
// 그렇다면 exports 복수라는 거 아냐. 이건 단수인데.
export default api;
