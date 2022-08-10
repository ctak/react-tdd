import React from 'react';
import Styled from 'styled-components';
import { PageHeader } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Container>
      <PageHeader />
    </Container>
  );
}

export default App;
