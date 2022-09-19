import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl.js';
import checkLoggedIn from '../../lib/checkLoggedIn.js';

const posts = new Router();

// posts.METHOD(URL, fn);
// api.get('/test', (ctx) => {
//   ctx.body = 'test 성공';
// });

// const printInfo = ctx => {
//   // 지금까지는 ctx.body = 'hello' 처럼 string 을 넣었는데 이제 객체군.
//   ctx.body = {
//     method: ctx.method,
//     path: ctx.path,
//     params: ctx.params,
//   }
// };

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

/* 이렇게 코딩할 수 있겠고, 1st
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read); // 이렇게 미들웨어를 추가할 수 있구나!!
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);
*/

const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
