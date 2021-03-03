import React, { useState, useEffect } from "react";
import Board from "./Board";
import checkWinner from "./helper";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [nextPlayer, setNextPlayer] = useState("X");
  const winner = checkWinner(history[stepNumber]);

  useEffect(() => {
    setNextPlayer(stepNumber % 2 === 0 ? "X" : "O");
  }, [stepNumber]);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = nextPlayer;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>React Tic Tac Toe - With Hooks</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <h3>{winner ? "Winner: " + winner : "Next Player: " + nextPlayer}</h3>
      </div>
    </>
  );
};

export default Game;
