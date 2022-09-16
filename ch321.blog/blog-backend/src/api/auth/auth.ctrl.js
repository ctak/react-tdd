import Joi from "joi";
import User from "../../models/user.js";

/*
  POST /api/auth/register
  {
    username: 'velopert',
    password: 'mypass123'
  }

  // 회원가입
*/
export const register = async ctx => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // username 이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); // hashedPassword 설정
    await user.save();

    // 응답할 데이터에서 hashedPassword 필드 제거
    // post.body 의 글자를 줄일 때도, db 에서 줄여서 가져오지 않고,
    // JSON 으로 바꾼 다음에 했는데 이것도 그러네.
    // const data = user.toJSON();
    // delete data.hashedPassword;
    // ctx.body = data;
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * POST /api/auth/login
 * {
 *  username: 'velopert',
 *  password: 'mypass123'
 * }
 * 
 * // 로그인
 * 
 * @param {} ctx // middleware 이니까.
 */
export const login = async ctx => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username); // Static (class) 메서드
    if (!user) {
      ctx.status = 401; // 굳이 에러 메시지를 추가하지 않아도 된다.
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();

    // body 후에 token 을 설정해도 되는군. 아직 return 이 없으니. 
    // 계속해서 만들어 나갈 수 있겠군.
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/auth/check
*/
// 로그인 상태 확인
export const check = async ctx => {
  const { user } = ctx.state; // state 안에서 가져오는군!
  if (!user) {
    // 로그인 중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

/*
  POST /api/auth/logout
  // 로그아웃  
*/
export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
