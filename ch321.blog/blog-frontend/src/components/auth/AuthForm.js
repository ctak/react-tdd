import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import palette from "../../lib/styles/palette";
import Button from '../common/Button';

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */

// 여기서 Block 을 붙였는데
// <AuthFormWrapper />
// <StyledAuthForm />
// 이런 식으로 할 수 있다는데, 
// 각 컴포넌트의 최상위 컴포넌트 말이지.
const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 * // 이걸 button 처럼 /components/common/ 에 넣지 않았네.
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여 줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

/* 이 방식을 사용하는 것이 좋습니다. 가독성이 더 좋기 때문이죠. */
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

/* 이 방법 좋네. 하나하나 변수를 선언하는 것보다는 말이지 */
const textMap = {
  login: '로그인',
  register: '회원가입',
}

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const text = textMap[type];
  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput 
          autoComplete="username" 
          name="username" 
          placeholder="아이디" 
          onChange={onChange}
          value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
        {/* <Button cyan fullWidth style={{ marginTop: '1rem' }}>로그인</Button>이 방법은 뭔가 변화가 어려울 것 같다 */}
        {/* <Button cyan={true} fullWidth={true}>같은 의미</Button> */}
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
        
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
