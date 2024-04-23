import GameState from "./GameState";

function GameOver({ gameState }) {
  let message = "";
  let gameOverClass = "";

  switch (gameState) {
    case GameState.playerXWins:
      message = "Печели играч Х!";
      break;
    case GameState.playerOWins:
      message = "Печели играч О!";
      break;
    case GameState.draw:
      message = "Равни!";
      gameOverClass = "draw";
      break;
    default:
      message = "";
  }
 
  return <div className={`game-over ${gameState === GameState.playerXWins ? 'player-x-wins' : 'player-o-wins'} ${gameOverClass}` }>{message}</div>;
}
//   switch (gameState) {
//     case GameState.inProgress:
//       return <></>;
//     case GameState.playerOWins:
//       return <div className="game-over">Печели играч О</div>;
//     case GameState.playerXWins:
//       return <div className="game-over">Печели играч Х</div>;
//     case GameState.draw:
//       return <div className="game-over">Равни</div>;
//     default:
//       return <></>;
//   }
// }

export default GameOver;