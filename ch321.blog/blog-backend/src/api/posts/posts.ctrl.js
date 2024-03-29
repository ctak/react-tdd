import Post from '../../models/post.js';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

// 참조: https://www.npmjs.com/package/sanitize-html
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
}

/* 포스트 작성
POST /api/posts
{
  title,
  body,
  tags: ['태그1', '태그2'], // request.body 에서 JSON 으로 array of string 이 온다는 거네.
} // 이건 request.body 가 이렇게 온다는 것이네.
*/
// 일단 mongoose 에서는 async 이군.
// 그렇다면 return 자체도 비동기네.
export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(), // 문자열로 이루어진 배열
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  // const result = Joi.validate(ctx.request.body, schema);
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e); // 에러를 이렇게 던지네.
  }
};

// html 을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
}

/* 포스트 목록 조회
GET /api/posts?username=&tag=&page=
*/
// common.js 에서 require 와 module.exports = {} 로 보통 하였는데,
// 여기서는 export const write, export const list, ... 등등으로 끝내네.
export const list = async ctx => {
  // let { page } = ctx.query;
  // page = page ? parseInt(page, 10) : 1;
  const page = parseInt(ctx.query.page || '1', 10);

  const size = 10;

  if (page < 1) {
    ctx.status = 400; // Bad Request
    return;
  }

  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음.
  const { username, tag } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      // .skip( (page - 1) * size )
      .limit(size)
      .skip( (page - 1) * size ) // 책에서는 skip 이 아래에 있네.
      .lean()
      .exec(); // find() 함수를 호출한 후에는 exec() 를 붙여 주어야 서버에 쿼리를 요청합니다.

    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / size));
    ctx.body = posts
      // .map(post => post.toJSON()) // .lean() 함수를 쓰면 처음부터 JSON 형태로 조회할 수 있습니다.
      .map(post => ({
        ...post,
        body:
          // post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
          removeHtmlAndShorten(post.body),
      }))
  } catch (e) {
    ctx.throw(500, e);
  }
}

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async ctx => {
  /*
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
  */
  ctx.body = ctx.state.post;
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec(); // 여기도 exec() 를 써줘야 하네. 지금 보니 모델(Post, 스키마가 아닌) 의 method 는 exec() 를 실행시켜야 하네.
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터가 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정(특정 필드 변경)
PATCH /api/posts/:id
{
  title: '수정',
  body: '수정 내용',
  tags: ['수정', '태그']
}
*/
// 결국 PUT 을 쓰지 않았던 것은 replace 가 아니였기 때문이다. 어떤 id 를 replace 한다는 것이 DB 의 update 문과 같은가. 아니다.
// patch 가 더 맞을 것 같네.
export const update = async ctx => {
  const { id } = ctx.params;
  // const { title, body, tags } = ctx.request.body; // 이거 자체를 쓰지 않고 바로 콜해버리네.

  // write() 와 달리 required() 가 없음.
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array()
      .items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  // const result = Joi.validate(ctx.request.body, schema);
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  // sanitizeHtml
  const nextData = { ...ctx.request.body }; // 객체를 복사하고
  // body 값이 주어졌으면 HTML 필터링
  if (nextData.body) {
    // TODO: sanitizeOption 을 쓰지 않았네. 수정 시 <script> 태그가 들어갈 수 있지 않나.
    nextData.body = sanitizeHtml(nextData.body);
  }

  try {
    // const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
    const post = await Post.findByIdAndUpdate(id, nextData, { // 왜 여기에 nextData: { body } 객체를 넣지?
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false 일 때는 업데이트 되기 전의 데이터를 반환합니다. (이럴 경우가 있을까?)
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
