import React, { Component } from 'react';
import Styled from 'styled-components';

interface ContainerProps {
    readonly backgroundColor: string;
    readonly hoverColor: string;
}

const Container = Styled.div<ContainerProps>`
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = Styled.div`
  color: #fff;
  font-size: 16px;
`;

interface Props {
    readonly label: string;
    readonly backgroundColor?: string;
    readonly hoverColor?: string;
    readonly onClick?: () => void; // 반환값이 없는 void 타입의 함수이며 넘겨줄 필요가 없는 Props 임을 알 수 있다.
}

/*
// 여기서 return 이 function 이고, jsx 에서 <Button /> 이렇게 한다는 것이
// 아주 새롭군.
export const Button = ({ 
    label,
    backgroundColor = '#304ffe',
    hoverColor = '#1e40ff',
    onClick,
}: Props) => {
    return (
        <Container 
            backgroundColor={backgroundColor} 
            hoverColor={hoverColor}
            onClick={onClick}
        >
            <Label>{label}</Label>
        </Container>
    )
};
*/
export class Button extends Component<Props> {
  render() {
    const {
      label,
      backgroundColor = '#304ffe',
      hoverColor = '#1e40ff',
      onClick,
    } = this.props; // 여기서 [this] 가 나오는 군.

    return (
      <Container 
          backgroundColor={backgroundColor} 
          hoverColor={hoverColor}
          onClick={onClick}
      >
          <Label>{label}</Label>
      </Container>
    );
  }
}