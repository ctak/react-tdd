import React from "react";
import Styled from 'styled-components';

interface ContainerProps {
  readonly backgroundColor: string;
  readonly hoverColor: string;
}

const Container = Styled.div<ContainerProps>`
  background-color: ${(props) => props.backgroundColor};
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;
const Label = Styled.div``;

interface Props {
  readonly label: string;
  readonly backgroundColor?: string;
  readonly hoverColor?: string;
}

export const Button = ({ label, backgroundColor = '#304ffe', hoverColor = '#1e40ff' }: Props) => {
  return (
    <Container backgroundColor={backgroundColor} hoverColor={hoverColor}>
      <Label>{label}</Label>
    </Container>
  );
};
