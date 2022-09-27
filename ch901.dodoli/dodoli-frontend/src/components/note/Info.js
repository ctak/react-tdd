import React from 'react';
import styled from 'styled-components';

const InfoBlock = styled.div``;

const Info = ({currentTime}) => (
  <InfoBlock>
    {currentTime}
  </InfoBlock>
);

export default Info;
