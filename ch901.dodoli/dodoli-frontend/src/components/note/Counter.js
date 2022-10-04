import React from 'react';
import styled from 'styled-components';

const CounterBlock = styled.div`

`;

const Counter = ({ total, count }) => {
  return (
    <CounterBlock>
      {total && 
        <div>{count}/{total}</div>
      }
    </CounterBlock>
  )
};

export default Counter;
