import React from 'react';
import Image from '../../../components/AppImage';

const GameCard = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !isFlipped) {
      onClick();
    }
  };

  return (
    <div 
      className={`
        relative w-full aspect-square cursor-pointer
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${!isFlipped && !disabled ? 'breathing-pulse' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`card-flip w-full h-full ${isFlipped ? 'flipped' : ''}`}>
        {/* Card Back (Hidden/Default State) */}
        <div className={`
          card-face bg-purple-500 rounded-lg shadow-lg
          flex items-center justify-center overflow-hidden
          transition-all duration-300 p-0
          ${!isFlipped ? 'hover:shadow-xl' : ''}
          ${!isFlipped && !disabled ? 'haptic-feedback' : ''}
        `}>
          <Image
            src="/assets/images/Wonda_main-1762805782777.png"
            alt="WONDERLEAP star character mascot with happy face, holding paintbrush and scroll"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Front (Revealed State) */}
        <div className={`
          card-face card-back bg-white rounded-lg
          flex flex-col items-stretch justify-stretch p-0
          border-2 transition-all duration-300 overflow-hidden h-full
          ${isMatched ? 'border-green-400 success-glow' : 'border-gray-200 shadow-lg'}
        `}>
          {/* Card Image - 70% with contain to prevent cropping */}
          <div className="h-7/10 w-full flex items-center justify-center bg-white overflow-hidden">
            <Image
              src={card?.image}
              alt={card?.imageAlt}
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Card Text - 30% */}
          <div className="h-3/10 w-full flex flex-col items-center justify-center bg-white border-t border-gray-200 ">
            <p className="font-bold text-xs text-gray-800 text-center leading-tight">
              {card?.content}
            </p>
            <p className="text-xs text-gray-400 capitalize mt-0.5">
              {card?.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;