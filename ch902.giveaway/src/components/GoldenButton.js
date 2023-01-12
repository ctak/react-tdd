import React from "react";
import styled, { css } from 'styled-components';
import palette from "../lib/styles/palette";
import { Link } from 'react-router-dom';

const buttonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  font-family: inherit;
  font-size: 1em;
  font-weight: 600;
  box-sizing: border-box;
  border: none;
  border-radius: .3em;
  height: 2.75em;
  line-height: 2.5em;
  text-transform: uppercase;
  // padding: 0 1em;
  box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(110,80,20,.4),
              inset 0 -2px 5px 1px rgba(139,66,8,1),
              inset 0 -1px 1px 3px rgba(250,227,133,1);
  background-image: linear-gradient(160deg, #a54e07, #b47e11, #fef1a2, #bc881b, #a54e07);
  border: 1px solid #a55d07;
  color: rgb(120,50,5);
  text-shadow: 0 2px 2px rgba(250, 227, 133, 1);
  cursor: pointer;
  transition: all .2s ease-in-out;
  background-size: 100% 100%;
  background-position:center; 

  &:focus,
  &:hover {
    background-size: 150% 150%;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23),
                  inset 0 -2px 5px 1px #b17d10,
                  inset 0 -1px 1px 3px rgba(250,227,133,1);
    border: 1px solid rgba(165,93,7,.6);
    color: rgba(120,50,5,.8);
  }
  &:active {
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(110,80,20,.4),
                inset 0 -2px 5px 1px #b17d10,
                  inset 0 -1px 1px 3px rgba(250,227,133,1);
  }

  margin-bottom: 1rem;

  ${props =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${props =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

  &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const GoldenButton = props => {
  return props.to ? (
    // <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  )
};

export default GoldenButton;