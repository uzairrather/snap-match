import React from 'react';
import Image from './AppImage';

const GameCard = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !isFlipped) {
      onClick();
    }
  };

  return (
    <div 
      className={`
        relative w-full aspect-square cursor-pointer touch-target forgiving-zone
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${!isFlipped && !disabled ? 'breathing-pulse' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`card-flip w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Card Back (Hidden/Default State) */}
        <div className={`
          card-face bg-primary rounded-game game-shadow-rest
          flex items-center justify-center
          transition-all duration-feedback
          ${!isFlipped ? 'hover:game-shadow-hover' : ''}
          ${!isFlipped && !disabled ? 'haptic-feedback' : ''}
        `}>
          <div className="text-primary-foreground">
            {/* Question Mark Pattern */}
            <svg 
              width="60" 
              height="60" 
              viewBox="0 0 60 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="3" fill="none" />
              <path 
                d="M23 22c0-4 3-7 7-7s7 3 7 7c0 2-1 3-3 4l-2 2v3m0 4h.01" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Card Front (Revealed State) */}
        <div className={`
          card-face card-back bg-game-surface rounded-game
          flex flex-col items-center justify-center p-4
          border-2 transition-all duration-game
          ${isMatched ? 'border-success success-glow' : 'border-border game-shadow-rest'}
        `}>
          {/* Card Image */}
          <div className="w-16 h-16 mb-2 flex items-center justify-center">
            <Image
              src={card?.image}
              alt={`${card?.content} - ${card?.type}`}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Card Text */}
          <div className="text-center">
            <p className="font-body font-semibold text-game-card text-text-primary">
              {card?.content}
            </p>
            <p className="font-caption text-xs text-text-secondary capitalize mt-1">
              {card?.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;