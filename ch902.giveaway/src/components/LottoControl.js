import React from "react";
import styled from "styled-components";
import GoldenButton from "./GoldenButton";
import PlayButton from "./PlayButton";
import ResetButton from "./ResetButton";

const LottoControlBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: #72202A;
`;

const RankingButtons = styled.div`
  flex: 1;
  padding: 1.5rem 1rem 1rem;

  & > div + & > div {
    margin-top: 2rem;
  }

  span {
    font-size: 2.1rem;
    transform: translateY(-0.475rem);
  }
`;

const PlayerButtons = styled.div`
  // border: 2px solid purple;
  z-index: 10;

  .play-block {
    display: flex;
    padding: 2rem;
    justify-content: center;
    align-items: center;
  }
  .reset-block {
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

// 🧧 🥉 🥉 🥉

const LottoControl= ({ onRankingClick, onPlayClick, onResetClick }) => {
  return (
    <LottoControlBlock>
      <RankingButtons>
        <GoldenButton fullWidth
          onClick={e => onRankingClick(1)}
        ><span>🥇</span> 1등 추천</GoldenButton>

        <GoldenButton fullWidth
          onClick={e => onRankingClick(2)}
        ><span>🥈</span> 2등 추천</GoldenButton>

        <GoldenButton fullWidth
          onClick={e => onRankingClick(3)}
        ><span>🥉</span> 3등 추천</GoldenButton>

        <GoldenButton fullWidth
          onClick={e => onRankingClick(4)}
        ><span>🏅</span> 4등 추천</GoldenButton>
      </RankingButtons>
      <PlayerButtons>
        <div className="play-block">
          <PlayButton
            onClick={e => onPlayClick()}
          >
            Play
          </PlayButton>
        </div>
        <div className="reset-block">
          <ResetButton
            onClick={e => onResetClick()}
          >
            Reset
          </ResetButton>
        </div>
      </PlayerButtons>
    </LottoControlBlock>
  );
};

export default LottoControl;
