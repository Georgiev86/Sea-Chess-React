import React from "react";
import GameState from "./GameState";

function ResetButton({ gameState, onReset }) {
  if (gameState === GameState.inProgress) {
    return null;
  }
  return (
    <button onClick={onReset} className="reset-button">
      Играй отново
    </button>
  );
}

export default ResetButton;
