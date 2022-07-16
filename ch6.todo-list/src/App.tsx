import React, { useState } from 'react';
import Styled from 'styled-components';

import { Button, Input, ToDoItem } from 'Components';

const Container = Styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = Styled.div`
  display: flex;
  background-color: #fff;
  flex-direction: column;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const InputContainer = Styled.div`
  display: flex;
`;

const ToDoListContainer = Styled.div`
  min-height: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
  margin-bottom: 20px;
`;

function App() {
  const [toDo, setToDo] = useState(''); // toDo 는 string. 즉 state 값이군.
  const [toDoList, setToDoList] = useState<string[]>([]);

  const addToDo = () => {
    if (toDo) {
      setToDoList([...toDoList, toDo]);
      setToDo('');
    }
  }

  const deleteToDo = (index: number): void => {
    let list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
  }
  
  return (
    <Container>
      <Contents>
        <ToDoListContainer data-testid="toDoList">
          {toDoList.map((item, index) =>
            <ToDoItem key={item} label={item} onDelete={() => deleteToDo(index)} />
          )}
        </ToDoListContainer>

        <InputContainer>
          <Input 
            placeholder="할 일을 입력해 주세요" 
            value={toDo}
            onChange={(text) => setToDo(text)}
          />
          <Button 
            label="추가"
            onClick={addToDo}
          />
        </InputContainer>
      </Contents>
    </Container>
  );
}

export default App;
