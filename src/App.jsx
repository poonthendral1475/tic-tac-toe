import { useState } from "react";
import Player from "./component/player";
import GameBoard from "./component/GameBoard";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./component/WINNING_COMBINATIONS";
import GameOver from "./component/GameOver";
let initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedActivePlayer(gamesTurn) {
  let currentPlayer = "X";

  if (gamesTurn.length > 0 && gamesTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [player,setPlayer]=useState({
    X:'player 1',
    O:'player 2'
  })
  const [gamesTurn, setGamesTurn] = useState([]);
  const activePlayer = derivedActivePlayer(gamesTurn);
  let gameBoard=[...initialGameBoard.map(array=> [...array])];
  for(const t of gamesTurn)
  {
    const{square,player}=t;
    const{row,col}=square;
    gameBoard[row][col]=player;
  }
  let winner;
  for(const comb of WINNING_COMBINATIONS)
  {
    const frstSquareSymbol=gameBoard[comb[0].row][comb[0].column]
    const secSquareSymbol=gameBoard[comb[1].row][comb[1].column]
    const thrdSquareSymbol=gameBoard[comb[2].row][comb[2].column]
    if(frstSquareSymbol && frstSquareSymbol===secSquareSymbol && frstSquareSymbol===thrdSquareSymbol)
    {
     winner=player[frstSquareSymbol];
    }
  }
  const hasDraw=gamesTurn.length ===9 && !winner;
  // const [activePlayer,setActivePlaye]=useState('X')
  function handleSelectSqure(rowIndex, colIndex) {
    // setActivePlaye(curActivePlayer =>curActivePlayer==='X' ? 'O' : 'X')
    setGamesTurn((preTurn) => {
      const currentPlayer = derivedActivePlayer(preTurn);

      const updateTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurn,
      ];
      return updateTurn;
    });
  }
  function handleRestart()
  {
    setGamesTurn([]);
  }
  function handleChangeName(symbol,newName)
  {
    setPlayer(preName =>{
      return{
        ...preName,
        [symbol]:newName
      }

    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleChangeName}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleChangeName}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSqure} board={gameBoard} />
      </div>
      <Log turns={gamesTurn} />
    </main>
  );
}

export default App;
