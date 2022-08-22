import React, { useState } from 'react';
import Styled from 'styled-components';
import { Button } from 'Components';

const Container = Styled.div``;
const Input = Styled.input``;

export const Add = () => {
  const [toDo, setToDo] = useState('');

  const addToDo = (): void => {
    const list = JSON.parse(localStorage.getItem('ToDoList') ?? '[]');
    localStorage.setItem('ToDoList', JSON.stringify([...list, toDo]));
  };

  return (
    <Container>
      <Input 
        placeholder='할 일을 입력해 주세요' 
        onChange={(e) => setToDo(e.target.value)}
      />;
      <Button 
        label={'추가'}
        onClick={addToDo}
       />
    </Container>
  );  
};
