const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

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
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
