// src/components/MemoryGame.jsx

import React, { useState, useEffect } from 'react';
import './MemoryGame.css'; // Import custom styles

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // Initialize the game board with shuffled cards
  useEffect(() => {
    const initialCards = [
      { id: 1, value: '🍎' },
      { id: 2, value: '🍌' },
      { id: 3, value: '🍇' },
      { id: 4, value: '🍒' },
      { id: 5, value: '🍎' },
      { id: 6, value: '🍌' },
      { id: 7, value: '🍇' },
      { id: 8, value: '🍒' },
    ];
    setCards(shuffle(initialCards));
  }, []);

  // Shuffle cards
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle card click
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || matchedCards.includes(index) || flippedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  // Reset the game
  const resetGame = () => {
    setCards(shuffle(cards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    <div className="memory-game">
      <h2>Memory Card Matching Game</h2>
      <p>Moves: {moves}</p>
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
};

export default MemoryGame;
