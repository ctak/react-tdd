import React from 'react';
import Styled from 'styled-components';

import { Button } from 'Components/Button';
// import { Button } from 'Components'; // 이래도 가능한데. 무한반복 참조가 일어나지 않음.

// ToDoItem Component 에서 Link 를 만들고 있음.
// 결국 React 에서는  Event위임 은 없는 것인가?
import { Link } from 'react-router-dom';

const Container = Styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = Styled(Link)`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
  text-decoration: none;
`;

interface Props {
  readonly id: number;  
  readonly label: string;
  readonly onDelete?: () => void;
}

export const ToDoItem = ({ id, label, onDelete }: Props) => {
    return (
        <Container>
          <Label to={`/detail/${id}`}>{label}</Label>
          <Button
            label="삭제"
            backgroundColor='#ff1744'
            hoverColor='#f01440'
            onClick={onDelete}
          />
        </Container>
    );
}