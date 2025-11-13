import React, { useMemo } from 'react';
import Image from '../../../components/AppImage';

const GameCard = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = React.useCallback(() => {
    if (!disabled && !isFlipped) {
      onClick();
    }
  }, [disabled, isFlipped, onClick]);

  // Memoize card data to prevent unnecessary re-renders
  const cardData = useMemo(() => ({
    image: card?.image,
    imageAlt: card?.imageAlt,
    content: card?.content,
    type: card?.type
  }), [card]);

  const borderClass = useMemo(() => 
    isMatched ? 'border-green-400 success-glow' : 'border-gray-200 shadow-lg',
    [isMatched]
  );

  return (
    <div 
      className={`
        relative w-full aspect-square
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${!isFlipped && !disabled ? 'breathing-pulse' : ''}
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div 
        className={`
          card-flip w-full h-full
          transition-transform duration-500 ease-in-out
          ${isFlipped ? 'flipped' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Card Back - Back face (Closed) */}
        <div 
          className={`
            card-face w-full h-full bg-purple-500 rounded-lg shadow-lg
            flex items-center justify-center overflow-hidden p-0
            transition-shadow duration-300 absolute
            ${!isFlipped ? 'hover:shadow-xl' : ''}
            ${!isFlipped && !disabled ? 'haptic-feedback' : ''}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            WebkitBackfaceVisibility: 'hidden',
            WebkitTransform: 'rotateY(180deg)'
          }}
        >
          <Image
            src="/assets/images/Wonda_main-1762805782777.png"
            alt="WONDERLEAP star character mascot"
            className="w-full h-full object-cover will-change-transform"
            loading="eager"
          />
        </div>

        {/* Card Front - Image side (Open) */}
        <div 
          className={`
            card-face w-full h-full bg-white rounded-lg
            flex flex-col items-stretch justify-stretch p-0
            border-2 transition-all duration-300 overflow-hidden absolute
            ${borderClass}
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Image Section - 70% */}
          <div className="h-7/10 w-full flex items-center justify-center bg-white overflow-hidden will-change-transform">
            <Image
              src={cardData.image}
              alt={cardData.imageAlt}
              className="w-full h-full object-contain will-change-auto"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* Text Section - 30% */}
          <div className="h-3/10 w-full flex flex-col items-center justify-center bg-white border-t border-gray-200 will-change-auto">
            <p className="font-bold text-xs text-gray-800 text-center leading-tight truncate px-1">
              {cardData.content}
            </p>
            <p className="text-xs text-gray-400 capitalize mt-0.5">
              {cardData.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);