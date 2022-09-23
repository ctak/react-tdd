import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loading";

// Promise에 기반한 Thunk를 만들어주는 함수입니다.
/*
export const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: GET_POSTS }); // 요청이 시작됨
  try {
    const posts = await postsAPI.getPosts(); // API 호출
    dispatch({ type: GET_POSTS_SUCCESS, posts }); // 성공
  } catch (e) {
    dispatch({ thpe: GET_POSTS_ERROR, error: e }); // 실패
  }
};
*/
/**
 *
 * @param {*} type GET_POSTS
 * @param {*} promiseCreator postsAPI.getPosts
 */
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  // 이 함수는 promiseCreator 가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
  // 만약 여러 종류의 파라미터를 전달해야 하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
  // 예: writeComment({ postId: 1, text: '댓글 내용' });
  return param => async dispatch => {
    // 요청 시작
    dispatch({ type, param });
    try {
      // 결과물의 이름을 payload 라는 이름으로 통일 시킵니다.
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload }); // 성공
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true }); // 실패
    }
  }
};

// 리듀서에서 사용할 수 있는 여러 유틸 함수들 입니다.
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 기본적으로 null 이지만
  // 바꿀 수 도 있습니다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  // 로딩중 상태. prevState 의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값을 유지시킬 수 있습니다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  // 성공 상태
  success: payload => ({
    loading: false,
    data: payload,
    error: null,
  }),
  // 실패 상태
  error: error => ({
    loading: false,
    data: null,
    error: error,
  }),
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어 줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post) 입니다.
/*
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };

    // 이 부분이

    case GET_POSTS_SUCCESS:
      return handleAsyncActions(GET_POSTS, 'posts')(state, action);

    // 약간 더 표현하자면,
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      return postReducer(state, action);
*/

export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state; // 이 부분은 음... action.type 이 알 수 없을 때인데...
    }
  };
};

/*
function* getPostsSaga() {
  try {
    // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환될 때까지 기다려줄 수 있습니다.
    const posts = yield call(postsAPI.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: e
    }); // 실패 액션 디스패치
  }
}
*/

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      // 재사용성을 위하여 promiseCreator 의 파라미터엔 action.payload 값을 넣도록 설정합니다.
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  };
};

/*
// 액션이 지니고 있는 값을 조회하고 싶다면 action 을 파라미터로 받아와서 사용할 수 있습니다.
function* getPostSaga(action) {
  // const param = action.payload;
  // const id = action.meta;
  const { payload: param, meta: id } = action;
  try {
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 됩니다.
    const post = yield call(postsAPI.getPostById, param);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id
    })
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: e,
      meta: id,
    });
  }
}
*/
// 특정 id의 데이터를 조회하는 용도로 사용하는 사가
// API 를 호출 할 때 파라미터는 action.payload 를 넣고,
// id 값을 action.meta 로 설정합니다.
// >> 그런데, 상태에서 id 별로 다루지 않을 때는 (즉 내가 패스한 부분) 위의 것과 동일한 함수가 된다.
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch (e) {
      yield put({ type: ERROR, error: e, meta: id });
    }
  }
}

/*
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
*/
export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];  
}

export default function createRequestSaga(type, request) {
  const [SUCCESS, FAILURE] = [`${type}_SUCCESS`, `${type}_FAILURE`];

  return function* (action) {
    yield put(startLoading(type)); 
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
