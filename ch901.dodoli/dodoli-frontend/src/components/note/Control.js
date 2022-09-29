import React from "react";
import styled from 'styled-components';
import Button from "../common/Button";

const ControlBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MarkButton = styled(Button)`
  padding: 1rem 2rem;
`

const Control = ({onMark}) => {
  return (
    <ControlBlock>
      <MarkButton
        onClick={() => onMark()}
      >
        MARK
      </MarkButton>
    </ControlBlock>
  );
}

export default Control;
