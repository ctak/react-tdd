import * as dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from './api/index.js';

dotenv.config();

const { PORT, MONGO_URI } = process.env; // 
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
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

// 라우터 적용 전에 bodyParser 를 적용해야 함.
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT 가 지정되어 있지 않다면 4000 을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
