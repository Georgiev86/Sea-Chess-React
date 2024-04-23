import React, { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import ScoreBoard from "./ScoreBoard";

const Играч_X = "X";
const Играч_O = "O";

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === Играч_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function SeaChess() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Играч_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);
  const [gameOver, setGameOver] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === Играч_X) {
      setPlayerTurn(Играч_O);
    } else {
      setPlayerTurn(Играч_X);
    }
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(Играч_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (gameState === GameState.playerXWins) {
      setXScore((prevScore) => prevScore + 1);
    } else if (gameState === GameState.playerOWins) {
      setOScore((prevScore) => prevScore + 1);
    }
  }, [gameState]);

  return (
    <div>
      <h1>Морски Шах</h1>
      <ScoreBoard xScore={xScore} oScore={oScore} />
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default SeaChess;
