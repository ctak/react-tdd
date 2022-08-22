import React, { useState, useEffect } from "react";
import Styled from 'styled-components';

import { Button } from "Components";

import { Link } from 'react-router-dom';

const Container = Styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  align-items: center;
`;
const ToDoItem = Styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  aligin-items: center;
  margin: 10px;
  padding: 10px;
`;
const Label = Styled(Link)`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
`;
const ToDoList = Styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;
const AddButton = Styled(Link)`
  font-size: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  background-color: #304ffe;
  text-decoration: none;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #1e40ff;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const List = () => {
  /*
  // [||] vs [??] ==> 앞의 것은 false 값이 일 때 이고, 뒤의 것은 'undefined 또는 null 일 때임.
  const toDoList: Array<string> = JSON.parse(localStorage.getItem('ToDoList') ?? '[]');
  */
  const [toDoList, setToDoList] = useState<Array<string>>([]);

  const onDelete = (index: number) => {
    let list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
    localStorage.setItem('ToDoList', JSON.stringify(list));
  };

  useEffect(() => {
    const list = localStorage.getItem('ToDoList');
    if (list) {
      setToDoList(JSON.parse(list));
    }
  }, []);

  return (
    <Container>
      <ToDoList>
        {toDoList.map((todo, index) => (
          <ToDoItem key={todo}>
            <Label to={`/detail/${index}`}>{todo}</Label>
            <Button 
              label="삭제" 
              backgroundColor="#ff1744" 
              hoverColor="#f01440" 
              onClick={() => onDelete(index)}
            />
          </ToDoItem>
        ))}
      </ToDoList>
      <AddButton to="/add">+</AddButton>
    </Container>
  );
}