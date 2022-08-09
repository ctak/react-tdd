import React from "react";
import Styled from 'styled-components';
import { useLocation, Link } from "react-router-dom";

const Container = Styled.div``;
const Title = Styled.div``;
// 추후 style 을 위해 styled-components 를 적용해 놓는다.
const GoBack = Styled(Link)``;

export const PageHeader = () => {
  const { pathname } = useLocation();

  let title = '에러';

  if (pathname === '/') {
    title = '할 일 목록';
  } else if (pathname === '/add') {
    title = '할 일 추가';
  } else if (pathname.startsWith('/detail')) {
    title = '할 일 상세';
  }

  return (
    <Container>
      <Title>{ title }</Title>
      {pathname !== '/' && <GoBack to="/">돌아가기</GoBack>}
    </Container>
  );
};
