const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
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
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.update);

module.exports = posts;
