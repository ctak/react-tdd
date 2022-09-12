const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !== '1') {
    ctx.status = 401; // Unauthorized
    return;
  }

  // 1, 2, END 로 나오는 것을 보면 koa 의 미들웨어의 next() 는 다음 미들웨어가 끝난 후 then() 이 실행된다.
  // 미들웨어의 3을 추가해 보자. 그럼. [1, 2, END, 3] 일까? 다음 미들웨어라고 했으니. >> 땡, [1,2,3,END] 였음.
  // 이제 마지막 미들웨어를 더하면, [1,2,3,999, END3, END2, END1 ] 형식일까? >> 딩동댕.
  // next().then(() => {
  //   console.log('END 1');
  // })
  await next();
  console.log('END 1');
});

app.use((ctx, next) => {
  console.log(2);
  next().then(() => {
    console.log('END 2');
  })
});

// app.use((ctx, next) => {
//   console.log(3);
//   next().then(() => {
//     console.log('END 3');
//   })
// })

app.use(ctx => {
  console.log('999');
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
