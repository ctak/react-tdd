import React from "react";
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const buttonStyle = css`
  color: white;
  position: relative;
  cursor: pointer;
  width: 120px;
  height: 120px;
  font-size: 30px;
  -moz-border-radius: 60px;
  -webkit-border-radius: 60px;
  border-radius: 60px;
  padding: 20px;
  border: #fc2c71 1px solid;
  background-color: #fc2c71;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjQwcHgiIGN5PSI0MHB4IiByPSI2NSUiPjxzdG9wIG9mZnNldD0iMjMuMDc2OTIlIiBzdG9wLWNvbG9yPSIjZmMyYzcxIi8+PHN0b3Agb2Zmc2V0PSI0Ni4xNTM4NSUiIHN0b3AtY29sb3I9IiNmYzRhODUiLz48c3RvcCBvZmZzZXQ9IjYxLjUzODQ2JSIgc3RvcC1jb2xvcj0iI2ZjNGE4NSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZjMjc2ZSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
  background-size: 100%;
  background-image: -moz-radial-gradient(40px 40px, circle contain, #fc2c71 15px, #fc4a85 30px, #fc4a85 40px, #fc276e 65px);
  background-image: -webkit-radial-gradient(40px 40px, circle contain, #fc2c71 15px, #fc4a85 30px, #fc4a85 40px, #fc276e 65px);
  background-image: radial-gradient(circle contain at 40px 40px, #fc2c71 15px, #fc4a85 30px, #fc4a85 40px, #fc276e 65px);
  background-position: center center;
  background-repeat: no-repeat;
  -moz-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.7) 0 3px 3px inset, #5b011f 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
  -webkit-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.7) 0 3px 3px inset, #5b011f 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
  box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.7) 0 3px 3px inset, #5b011f 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;

  &:hover {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjQwcHgiIGN5PSI0MHB4IiByPSI2NSUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmYzQ1ODIiLz48c3RvcCBvZmZzZXQ9IjQ2LjE1Mzg1JSIgc3RvcC1jb2xvcj0iI2ZkNWU5MyIvPjxzdG9wIG9mZnNldD0iNjEuNTM4NDYlIiBzdG9wLWNvbG9yPSIjZmQ1ZTkzIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmM0NTgyIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
    background-size: 100%;
    background-image: -moz-radial-gradient(40px 40px, circle contain, #fc4582, #fd5e93 30px, #fd5e93 40px, #fc4582 65px);
    background-image: -webkit-radial-gradient(40px 40px, circle contain, #fc4582, #fd5e93 30px, #fd5e93 40px, #fc4582 65px);
    background-image: radial-gradient(circle contain at 40px 40px, #fc4582, #fd5e93 30px, #fd5e93 40px, #fc4582 65px);
    -moz-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.9) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
    -webkit-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.9) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(255, 255, 255, 0.9) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.5) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
  }
  &:active {
    border-color: black;
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjQwcHgiIGN5PSI0MHB4IiByPSI2NSUiPjxzdG9wIG9mZnNldD0iMjMuMDc2OTIlIiBzdG9wLWNvbG9yPSIjZmMyYzcxIi8+PHN0b3Agb2Zmc2V0PSI0Ni4xNTM4NSUiIHN0b3AtY29sb3I9IiNkODAzNGEiLz48c3RvcCBvZmZzZXQ9IjYxLjUzODQ2JSIgc3RvcC1jb2xvcj0iI2Q4MDM0YSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2E2MDIzOSIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiIC8+PC9zdmc+IA==');
    background-size: 100%;
    background-image: -moz-radial-gradient(40px 40px, circle contain, #fc2c71 15px, #d8034a 30px, #d8034a 40px, #a60239 65px);
    background-image: -webkit-radial-gradient(40px 40px, circle contain, #fc2c71 15px, #d8034a 30px, #d8034a 40px, #a60239 65px);
    background-image: radial-gradient(circle contain at 40px 40px, #fc2c71 15px, #d8034a 30px, #d8034a 40px, #a60239 65px);
    -moz-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(0, 0, 0, 0.8) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.3) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
    -webkit-box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(0, 0, 0, 0.8) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.3) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
    box-shadow: rgba(0, 0, 0, 0.8) 0 0 10px 5px, rgba(0, 0, 0, 0.8) 0 3px 3px inset, #8d0230 0 8px 10px inset, rgba(0, 0, 0, 0.3) 0 20px 10px inset, rgba(255, 255, 255, 0.3) 0 -2px 3px inset, #8d0230 0 -7px 20px inset;
  }
  &::before {
    display: block;
    content: "";
    position: absolute;
    z-index: -2;
    top: -20px;
    left: -21px;
    margin: 0;
    padding: 20px;
    background: #f20352;
    width: 120px;
    height: 120px;
    -moz-border-radius: 80px;
    -webkit-border-radius: 80px;
    border-radius: 80px;
    -moz-box-shadow: #bf0341 0 4px 5px inset, rgba(255, 255, 255, 0.5) 0 12px 5px inset, #8d0230 0 -12px 5px inset, rgba(0, 0, 0, 0.8) 0 4px 8px;
    -webkit-box-shadow: #bf0341 0 4px 5px inset, rgba(255, 255, 255, 0.5) 0 12px 5px inset, #8d0230 0 -12px 5px inset, rgba(0, 0, 0, 0.8) 0 4px 8px;
    box-shadow: #bf0341 0 4px 5px inset, rgba(255, 255, 255, 0.5) 0 12px 5px inset, #8d0230 0 -12px 5px inset, rgba(0, 0, 0, 0.8) 0 4px 8px;
  }  
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const PlayButton = props => {
  return props.to ? (
    // <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  )
};

export default PlayButton;
