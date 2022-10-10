import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api/index.js';
import createFakeData from './createFakeData.js';
import jwtMiddleware from './lib/jwtMiddleware.js';

dotenv.config();

const { PORT, MONGO_URI } = process.env; //
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // createFakeData(); // 한 번 만 실행하고 잘 막아내야 하겠다.
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

/*
// 라우터 설정
router.get('/', ctx => {
  ctx.body = '홈';
});

router.get('/about/:name?', ctx => {
  const { name } = ctx.params;
  ctx.body = name ? `${name}의 소개` : '소개';
});

// http://localhost:4000/posts?id=1 이렇게 볼 때는 /posts 목록에서 들어갈 때로 하고.
// http://localhost:4000/posts/1 이렇게 볼 때는 /url 로 하면 되겠군.
// 좀 더 능동적으로 해야 하나. 이렇게 해도 웹로봇이 읽기 힘들 것 같은데 말야.
router.get('/posts', ctx => {
  const { id } = ctx.query;
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
})

app.use(router.routes()).use(router.allowedMethods());
*/


// 라우터 설정
// localhost:4000/api/test 가 되는군.
router.use('/api', api.routes()); // /api 라우트 적용

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// 라우터 적용 전에 bodyParser 를 적용해야 함.
app.use(bodyParser());
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// koa-static 적용
// 20221010 koa-static 으로 여러개의 frontend 를 serve 하는 것은 찾지 못했음.
// TODO: koa-mount 로 여러개의 koa 를 사용할 수는 있음.
// koa-static 을 다시 생각해 보면,
// 1. 현재 폴더에 있지 않는 디렉토리를 serve 하는 것이고,
// 2. web-base-url 에서 refresh 가 될 때, 아래의 ctx 가 필요할 것이고,
// 3. index.html 에서 다른 url 을 불러오게 되면, 해당 file 을 또 찾을 수 없게 되어
// 4. 또 index.html 을 불러야 하고 등등이네..
// 5. 지금 url 을 맘대로 적을 때 404 가 타지 못하는 부분이 발생한 것이네
const __dirname = path.resolve();
const buildDirectory = path.resolve(__dirname, '../blog-frontend/build/');
console.log(buildDirectory);
app.use(serve(buildDirectory));
app.use(async ctx => {
  // Not Found 이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    console.log('HEREHEREHRE')
  // if (ctx.status === 404 && ctx.path.indexOf('/blog/') === 0) { // 이렇게는 의미 없고.
    // index.html 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory }); // 이 문장은 웹브라우저가 Refresh 되었을 때 의미가 있다.
  }
});

// PORT 가 지정되어 있지 않다면 4000 을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
