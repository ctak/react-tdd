import React from 'react';
import styled from 'styled-components';

const InfoBlock = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  aligin-items: center;
`;
const CurrentTime = styled.div`
  padding: 0.25rem 1rem;
`;
const Duration = styled.div`
  padding: 0.25rem 1rem;
`;

const Info = ({currentTime, duration}) => (
  <InfoBlock>
    <CurrentTime>{currentTime && currentTime.toFixed(2)}</CurrentTime>
    <Duration>{duration}</Duration>
  </InfoBlock>
);

export default Info;
