import React from "react";
import styled from "styled-components";

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */

// 여기서 Block 을 붙였는데
// <AuthFormWrapper />
// <StyledAuthForm />
// 이런 식으로 할 수 있다는데, 
// 각 컴포넌트의 최상위 컴포넌트 말이지.
const AuthFormBlock = styled.div``;

const AuthForm = () => {
  return (
    <AuthFormBlock>
      AuthForm
    </AuthFormBlock>
  );
};

export default AuthForm;
