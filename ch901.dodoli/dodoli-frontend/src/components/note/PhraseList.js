import React from 'react';
import styled, { css } from 'styled-components';
import palette from "../../lib/styles/palette";

const PhraseListBlock = styled.div`
  height: 100px;
  border: 1px solid black;
`;

const PhraseBlock = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  // background: ${props => (props.cursor ? `${palette.cyan[2]}` : 'white')};

  ${props =>
    props.cursor &&
    css`
      background: ${palette.cyan[2]};
    `}

`;

const Phrase = ({ phrase: {id, from, to}, cursor }) => {
  return (
    <PhraseBlock cursor={cursor}>
      {/* <span>{id} </span> */}
      <span>{from}</span>
      <span> ~ </span>
      <span>{to}</span>
    </PhraseBlock>
  );
}

const PhraseList = ({ phrases, cursor }) => {
  return (
    <PhraseListBlock>
      {phrases.map((phrase, index) => (
        <Phrase
          key={phrase.id}
          phrase={phrase}
          cursor={index === cursor ? 1 : 0}
        />
      ))}
    </PhraseListBlock>
  )
};

export default PhraseList;
