import React from 'react';

const ScoreBoard = ({ xScore, oScore, xPlaying }) => {
  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {xScore}</span>
      <span className={`score o-score ${xPlaying && "inactive"}`}>O - {oScore}</span>
    </div>
  );
}

export default ScoreBoard;
