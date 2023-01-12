import React from "react";
import styled from "styled-components";

const LottoBoardBlock = styled.div`
  overflow-y: auto;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;

    h1, h2 {
      color: #20DF6B;
      padding: 0;
      margin: 0;
      font-size: 3rem;
    }

    h1 {
      font-size: 3.5rem;
      padding-right: 2rem;
    }
  }
`;

const LankBlock = styled.div`
  color: white;
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;

  .rank-title {
    white-space: nowrap;
    width: 12rem;
    text-align: right;
    padding-right: 2rem;
    flex: 0;
  }
  .num {
    display: inline-block;
    font-family: monospace;
    font-size: 2.25rem;
    font-weight: 900;
    padding-right: 0.5rem;
  }
`;

const LottoBoard= ({ rank1, rank2, rank3, rank4 }) => {

  return (
    <LottoBoardBlock>
      <div className="header">
        <h1>2023</h1>
        <h2>노리시스템 신년회 경품 추천 결과</h2>
      </div>
      {rank1 && rank1.length > 0 && (
        <LankBlock>
          <div className="rank-title"><span className="num">1</span>등:</div>
          <div>{[...rank1].sort().join(', ')}</div>
        </LankBlock>
      )}
      {rank2 && rank2.length > 0 && (
        <LankBlock>
          <div className="rank-title"><span className="num">2</span>등:</div>
          <div>{[...rank2].sort().join(', ')}</div>
        </LankBlock>
      )}
      {rank3 && rank3.length > 0 && (
        <LankBlock>
          <div className="rank-title"><span className="num">3</span>등:</div>
          <div>{[...rank3].sort().join(', ')}</div>
        </LankBlock>
      )}
      {rank4 && rank4.length > 0 && (
        <LankBlock>
          <div className="rank-title"><span className="num">4</span>등:</div>
          <div>{[...rank4].sort().join(', ')}</div>
        </LankBlock>
      )}
    </LottoBoardBlock>
  );
};

export default LottoBoard;
