import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for the Tic Tac Toe game.
 * Renders a centered, responsive UI for two-player gameplay, including
 * header, game board, status, and restart controls.
 */
function App() {
  // Board state: 9 squares, null | "X" | "O"
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Calculate status according to board state
  const getStatus = () => {
    if (winner) {
      return winner === "draw"
        ? "It's a draw! 🤝"
        : `Winner: ${winner === "X" ? "❌" : "⭕"}`;
    } else {
      return `Next: ${isXNext ? "❌ X" : "⭕ O"}`;
    }
  };

  // PUBLIC_INTERFACE
  // Handle click on a square
  const handleSquareClick = (idx) => {
    if (squares[idx] || gameOver) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = isXNext ? "X" : "O";
    setSquares(nextSquares);

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinner(result);
      setGameOver(true);
    } else if (!nextSquares.includes(null)) {
      setWinner("draw");
      setGameOver(true);
    } else {
      setIsXNext((prev) => !prev);
    }
  };

  // PUBLIC_INTERFACE
  // Restart/resets the game
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  // PUBLIC_INTERFACE
  // Returns "X" | "O" | null, or "draw"
  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div className="ttt-app-bg">
      <main className="ttt-container">
        <header className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
        </header>
        <section className="ttt-board-section">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            gameOver={gameOver}
            winner={winner}
          />
        </section>
        <section className="ttt-status-controls">
          <div className="ttt-status" data-testid="game-status">{getStatus()}</div>
          <button className="ttt-restart-btn" onClick={restartGame}>
            Restart Game
          </button>
        </section>
      </main>
      <footer className="ttt-footer">
        <span>
          <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            Built with React
          </a>
        </span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board component renders a 3x3 tic-tac-toe grid.
 */
function Board({ squares, onSquareClick, winner, gameOver }) {
  // Helper to render a square
  function renderSquare(idx) {
    return (
      <button
        className="ttt-square"
        data-testid={`square-${idx}`}
        onClick={() => onSquareClick(idx)}
        disabled={Boolean(squares[idx]) || gameOver}
        style={{
          color:
            squares[idx] === "X"
              ? "var(--ttt-primary)"
              : squares[idx] === "O"
              ? "var(--ttt-accent)"
              : "inherit",
        }}
      >
        {squares[idx] === "X"
          ? "❌"
          : squares[idx] === "O"
          ? "⭕"
          : ""}
      </button>
    );
  }
  // Render 3x3 grid
  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-board-row" key={row}>
          {[
            renderSquare(row * 3 + 0),
            renderSquare(row * 3 + 1),
            renderSquare(row * 3 + 2),
          ]}
        </div>
      ))}
    </div>
  );
}

export default App;
