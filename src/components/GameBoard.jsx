import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

const GameBoard = () => {
  // Game data - professions and their matching tools
  const gameData = [
     {
    id: 1,
    profession: 'Electrician',
    tool: 'Multimeter',
    professionImage: "https://images.unsplash.com/photo-1689798889867-67c2b1794743",
    professionImageAlt: 'Electrician working with wires',
    toolImage: "https://images.unsplash.com/photo-1636434588571-2b8df139f504",
    toolImageAlt: 'Digital multimeter measuring voltage'
  },
  {
    id: 2,
    profession: 'Nurse',
    tool: 'Syringe',
    professionImage: "https://images.unsplash.com/photo-1592410811000-80b57d6f18ab",
    professionImageAlt: 'Nurse wearing scrubs and mask',
    toolImage: "https://images.unsplash.com/photo-1649947990222-c73e581b1780",
    toolImageAlt: 'Medical syringe close-up'
  },
  {
    id: 3,
    profession: 'Robotics Technician',
    tool: 'Robotic Arm',
    professionImage: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b",
    professionImageAlt: 'Technician working with industrial robot',
    toolImage: "https://images.unsplash.com/photo-1667178451274-c19c8eb0d61a",
    toolImageAlt: 'Industrial robotic arm'
  },
  {
    id: 4,
    profession: 'Doctor',
    tool: 'Stethoscope',
    professionImage: "/assets/images/doctor-1762779734822.jpg",
    professionImageAlt: '3D rendered cartoon doctor character with brown hair, glasses, wearing white lab coat over light blue shirt and pants, with stethoscope around neck, standing in medical office setting with turquoise walls and medical equipment in background',
    toolImage: "https://images.unsplash.com/photo-1729842624774-315566ecab45",
    toolImageAlt: 'Medical stethoscope on white background'
  },
  {
    id: 5,
    profession: 'Renewable Energy Worker',
    tool: 'Solar Panel',
    professionImage: "https://images.unsplash.com/photo-1660330589246-f9c3016c204c",
    professionImageAlt: 'Worker installing solar panels',
    toolImage: "https://images.unsplash.com/photo-1617742483369-0b6f6035a29e",
    toolImageAlt: 'Solar panels under sunlight'
  }
  ];

  // Create cards array with both professions and tools
  const createCards = () => {
    const cards = [];
    gameData?.forEach(item => {
      cards?.push({
        id: `profession-${item?.id}`,
        type: 'profession',
        content: item?.profession,
        image: item?.professionImage,
        matchId: item?.id
      });
      cards?.push({
        id: `tool-${item?.id}`,
        type: 'tool',
        content: item?.tool,
        image: item?.toolImage,
        matchId: item?.id
      });
    });
    return shuffleArray(cards);
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray?.[j], newArray?.[i]];
    }
    return newArray;
  };

  // Game state
  const [cards, setCards] = useState(createCards);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Handle card click
  const handleCardClick = (cardId) => {
    if (isChecking || flippedCards?.includes(cardId) || matchedPairs?.some(pair => pair?.includes(cardId))) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Check for match when two cards are flipped
    if (newFlippedCards?.length === 2) {
      setIsChecking(true);
      
      setTimeout(() => {
        const [firstCardId, secondCardId] = newFlippedCards;
        const firstCard = cards?.find(card => card?.id === firstCardId);
        const secondCard = cards?.find(card => card?.id === secondCardId);

        // Check if cards match (same matchId but different types)
        if (firstCard?.matchId === secondCard?.matchId && firstCard?.type !== secondCard?.type) {
          // Match found
          const newMatchedPairs = [...matchedPairs, [firstCardId, secondCardId]];
          setMatchedPairs(newMatchedPairs);
          
          // Check if game is complete
          if (newMatchedPairs?.length === gameData?.length) {
            setGameComplete(true);
          }
        }

        // Reset flipped cards
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  // Reset game
  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setIsChecking(false);
    setGameComplete(false);
  };

  // Check if card is flipped
  const isCardFlipped = (cardId) => {
    return flippedCards?.includes(cardId) || matchedPairs?.some(pair => pair?.includes(cardId));
  };

  // Check if card is matched
  const isCardMatched = (cardId) => {
    return matchedPairs?.some(pair => pair?.includes(cardId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-header-height pb-game-margin px-game-margin">
      {/* Game Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-game-gap max-w-4xl w-full">
        {cards?.map((card) => (
          <GameCard
            key={card?.id}
            card={card}
            isFlipped={isCardFlipped(card?.id)}
            isMatched={isCardMatched(card?.id)}
            onClick={() => handleCardClick(card?.id)}
            disabled={isChecking}
          />
        ))}
      </div>
      {/* Game Complete Message */}
      {gameComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-celebration">
          <div className="bg-card p-8 rounded-game text-center max-w-md mx-game-margin celebration-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="font-heading text-3xl text-success mb-4">
              Congratulations!
            </h2>
            <p className="font-body text-lg text-text-secondary mb-6">
              You matched all the professions with their tools!
            </p>
            <button
              onClick={resetGame}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-game font-body font-semibold text-game-button touch-target hover:bg-primary/90 transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;