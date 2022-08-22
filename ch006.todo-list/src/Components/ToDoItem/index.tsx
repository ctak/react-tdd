import React from 'react';
import Styled from 'styled-components';

import { Button } from 'Components/Button';
// import { Button } from 'Components'; // 이래도 가능한데. 무한반복 참조가 일어나지 않음.

const Container = Styled.div`
  display: flex;
  border-bottom: 1px solid #bdbdbd;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const Label = Styled.div`
  flex: 1;
  font-size: 16px;
  margin-right: 20px;
`;

interface Props {
    readonly label: string;
    readonly onDelete?: () => void;
}

export const ToDoItem = ({ label, onDelete }: Props) => {
    return (
        <Container>
          <Label>{label}</Label>
          <Button
            label="삭제"
            backgroundColor='#ff1744'
            hoverColor='#f01440'
            onClick={onDelete}
          />
        </Container>
    );
}