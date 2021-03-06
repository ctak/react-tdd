import React from 'react';
import Styled from 'styled-components';

import { InputContainer, ToDoList } from 'Components';
import { ToDoListProvider } from 'Contexts';

import { Routes, Route } from 'react-router-dom';
import { List, Add, Detail, NotFound } from 'Pages';

import { PageHeader } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


function App() {
  return (
    <ToDoListProvider>
      <Container>
        <PageHeader />
        <Routes>
          <Route path="*" element={ <NotFound /> } />
          <Route path="/" element={
            <List />
          } />
          <Route path="/add" element={ <Add /> } />
          <Route path="/detail/:id" element={ <Detail /> } />
        </Routes>
      </Container>
    </ToDoListProvider>

  );
}

export default App;
