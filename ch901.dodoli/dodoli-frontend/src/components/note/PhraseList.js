import React from 'react';
import styled, { css } from 'styled-components';
import palette from "../../lib/styles/palette";

const PhraseListBlock = styled.div`
  min-height: 100px;
  border: 1px solid ${palette.gray[5]};
`;

const PhraseBlock = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;

  border-top: 1px solid ${palette.gray[3]};
  &:first-child {
    border-top: none;
  }

  &:hover {
    background: ${palette.gray[1]};
  }

  // background: ${props => (props.cursor ? `${palette.cyan[2]}` : 'white')};
  ${props =>
    props.cursor &&
    css`
      background: ${palette.cyan[2]} !important;
    `}

`;

const Phrase = ({ phrase: {id, from, to}, cursor, onClickPhrase }) => {
  return (
    <PhraseBlock
      cursor={cursor}
      onClick={e => (cursor ? onClickPhrase(null) : onClickPhrase(id))}
    >
      {/* <span>{id} </span> */}
      <span>{from}</span>
      <span> ~ </span>
      <span>{to}</span>
    </PhraseBlock>
  );
}

const PhraseList = ({ phrases, cursor, onClickPhrase }) => {
  return (
    <PhraseListBlock>
      {phrases.map((phrase, index) => (
        <Phrase
          key={phrase.id}
          phrase={phrase}
          cursor={index === cursor ? 1 : 0}
          onClickPhrase={onClickPhrase}
        />
      ))}
    </PhraseListBlock>
  )
};

export default PhraseList;
