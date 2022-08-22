import React from "react";
import Styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ToDoList } from 'Components';

const Container = Styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
  position: relative;
  align-items: center;
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
  box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
  text-decoration: none;
  &:hover {
    background-color: #1e40ff;
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0,0,0,0.2);
  }
`;

export const List = () => {
  return (
    <Container>
      <ToDoList />
      <AddButton to="/add">+</AddButton>
    </Container>
  )
}