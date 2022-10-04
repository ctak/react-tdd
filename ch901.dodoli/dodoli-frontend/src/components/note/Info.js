import React from 'react';
import styled from 'styled-components';
import Counter from './Counter';

const InfoBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  aligin-items: center;
`;
const CurrentTime = styled.div`
  padding: 0.25rem 1rem;
  width: 120px;
  text-align: left;
`;
const Duration = styled.div`
  padding: 0.25rem 1rem;
  width: 120px;
  text-align: right;
`;

const Info = ({currentTime, duration, total, count}) => (
  <InfoBlock>
    <CurrentTime>{currentTime && currentTime.toFixed(2)}</CurrentTime>
      <Counter total={total} count={count} />
    <Duration>{duration}</Duration>
  </InfoBlock>
);

export default Info;
