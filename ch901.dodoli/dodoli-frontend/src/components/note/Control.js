import React from "react";
import styled from 'styled-components';
import Button from "../common/Button";

const ControlBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  padding: 1rem 2rem;

  & + & {
    margin-left: 0.5rem;
  }
`

const LeftButtons = styled.div``;

const RightButtons = styled.div``;

const Control = ({ onMark, onNext, onPrev, paused, onPlay }) => {
  return (
    <ControlBlock>
      <LeftButtons>
        <StyledButton
          onClick={() => onPrev()}
        >
          PREV
        </StyledButton>
        <StyledButton
          onClick={() => onPlay()}
        >
          { paused ? 'PLAY' : 'PAUSE' }
        </StyledButton>
        <StyledButton
          onClick={() => onNext()}
        >
          NEXT
        </StyledButton>
      </LeftButtons>
      <RightButtons>
        <StyledButton
          onClick={() => onMark()}
        >
          MARK
        </StyledButton>
      </RightButtons>
    </ControlBlock>
  );
}

export default Control;
