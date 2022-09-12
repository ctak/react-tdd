let postId = 1; // id 의 초기값.

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용'
  },
];

/* 포스트 작성
POST /api/posts
{ title, body } // 이건 request.body 가 이렇게 온다는 것이네.
*/
exports.write = ctx => {
  // REST API 의 Request Body 는 ctx.request.body 에서 조회할 수 있습니다.
  // > /src/index.js 에서 bodyParser 적용함. app.use(bodyParser());
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post; // 그냥 js 객체를 돌려주었는데, JSON 으로 보내지는 것인가?
};

/* 포스트 목록 조회
GET /api/posts
*/
// common.js 에서 require 와 module.exports = {} 로 보통 하였는데,
// 여기서는 exports.write, exports.list, ... 등등으로 끝내네.
exports.list = ctx => {
  ctx.body = posts;
}

/* 특정 포스트 조회
GET /api/posts/:id
*/
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => '' + p.id === id);
  // 포스트가 없으면 오류를 반환합니다.
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
exports.remove = ctx => {
  const { id } = ctx.params;
  // 해당 id 를 가진 post 가 몇 번째인지 확인합니다.
  // > 물론 Mock 데이터 니까.
  const index = posts.findIndex(p => '' + p.id === id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // mock 데이터 제거
  posts.splice(index, 1);
  ctx.status = 204; // No Content
};

/* 포스트 수정(교체)
PUT /api/posts/:id
{ title, body }
*/
exports.replace = ctx => {
  // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용합니다.
  const { id } = ctx.params;
  // 해당 id 를 가진 post 가 몇 번째인지 확인합니다.
  // > 물론 Mock 데이터 니까.
  const index = posts.findIndex((p) => p.id.toString() === id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 전체 객체를 덮어 씌웁니다.
  // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듭니다.
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{ title, body }
*/
exports.update = ctx => {
  // PATCH 메서드는 주어진 필드만 교체합니다.
  const { id } = ctx.params;
  // 해당 id 를 가진 post 가 몇 번째인지 확인합니다.
  // > 물론 Mock 데이터 니까.
  const index = posts.findIndex((p) => '' + p.id === id);
  // 포스트가 없으면 오류를 반환합니다.
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트가 존재하지 않습니다.',
    };
    return;
  }
  // 기존 정보 값에 덮어 씌웁니다.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
