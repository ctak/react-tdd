import React from 'react';
import styled from 'styled-components';

const PhraseListBlock = styled.div`
  height: 100px;
  border: 1px solid black;
`;

const PhraseBlock = styled.div`
`;

const Phrase = ({ phrase: {id, from, to} }) => {
  return (
    <PhraseBlock>
      <span>{id} </span>
      <span>{from}</span>
      <span> ~ </span>
      <span>{to}</span>
    </PhraseBlock>
  );
}

const PhraseList = ({phrases}) => {
  return (
    <PhraseListBlock>
      {phrases.map(phrase => (
        <Phrase key={phrase.id} phrase={phrase} />
      ))}
    </PhraseListBlock>
  )
};

export default PhraseList;
