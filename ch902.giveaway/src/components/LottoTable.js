import React from "react";
import styled, {css} from "styled-components";

const LottoTableBlock = styled.div`
  // border: 2px solid red;
  flex: 1;
  // background: #35654d;
  // background: #002244;
  background: #F5F6F7;
`;

const Contents = styled.div`
  height: 100%;
  padding: 1.5rem 1rem 1rem;
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(1, 1fr); // #1
  
  ${props =>
    props.ranking === 4 &&
    css`
      grid-template-columns: repeat(5, 1fr); // #4
    `}
  ${props =>
    props.ranking === 3 &&
    css`
      grid-template-columns: repeat(4, 1fr); // #3
    `}
  ${props =>
    props.ranking === 2 &&
    css`
      grid-template-columns: repeat(3, 1fr); // #2      
    `}
  ${props =>
    props.ranking === 1 &&
    css`
      grid-template-columns: repeat(1, 1fr); // #1
    `}    

  & > div {
    // border: 2px solid red;
  }
`;


const LottoTable= ({ ranking, children }) => {
  return (
    <LottoTableBlock>
      <Contents ranking={ranking}>
        {children}
      </Contents>
    </LottoTableBlock>
  );
};

export default LottoTable;
