import React from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  font-weight: 900;
  font-style: normal;
  text-shadow: 0px -1px 0px rgba(0,0,0,0.4);
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  display: inline-block;
  box-shadow: inset 0px 1px 0px rgba(255,255,255,1),0px 1px 3px rgba(0,0,0,0.3);
  outline: none;
  border: 1px solid #ba6;
  backface-visibility: hidden;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  border-color: #7c7c7c;
  background: linear-gradient(180deg,#e6e6e6 0%,rgba(0, 0, 0, 0.25) 49%, rgba(38, 38, 38, 0.6) 51%,rgba(0, 0, 0, 0.25) 100%);
  border-radius: 5px;

  &:active{
    -webkit-transform: translateY(2px);
    transform: translateY(2px);
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const ResetButton = props => {
  return props.to ? (
    // <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  )
};

export default ResetButton;
