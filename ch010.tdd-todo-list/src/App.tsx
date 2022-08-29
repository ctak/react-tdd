import React from 'react';
import Styled from 'styled-components';
import { Button, PageHeader } from 'Components';

// import { List } from 'Pages';
// import { Add } from 'Pages';

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
