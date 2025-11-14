import React, { useMemo } from 'react';

const Image = ({ src, alt, className, loading, decoding }) => (
  <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} />
);

const GameCard = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = React.useCallback(() => {
    if (!disabled && !isFlipped) {
      onClick();
    }
  }, [disabled, isFlipped, onClick]);

  const cardData = useMemo(() => ({
    image: card?.image,
    imageAlt: card?.imageAlt,
    content: card?.content,
    type: card?.type
  }), [card]);

  const borderClass = useMemo(() => 
    isMatched ? 'border-green-400 shadow-green-300' : 'border-purple-300 shadow-lg',
    [isMatched]
  );

  return (
    <div 
      className={`
        relative w-full h-full aspect-square
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div 
        className={`
          w-full h-full
          transition-transform duration-500 ease-in-out
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
        }}
      >
        {/* Card Back - Closed state */}
        <div 
          className={`
            w-full h-full bg-purple-500 rounded-lg
            flex items-center justify-center overflow-hidden
            absolute border-2 border-purple-600
            transition-shadow duration-300
            ${!isFlipped ? 'hover:shadow-2xl' : ''}
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
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Card Front - Open state */}
        <div 
          className={`
            w-full h-full bg-white rounded-lg
            flex flex-col items-stretch justify-stretch
            border-2 transition-all duration-300 overflow-hidden absolute
            ${borderClass}
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Image Section - 85% */}
          <div className="h-5/6 w-full flex items-center justify-center bg-white overflow-hidden">
            <Image
              src={cardData.image}
              alt={cardData.imageAlt}
              className="w-full h-full object-contain p-1"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* Text Section - 15% */}
          <div className="h-1/6 w-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 border-t-2 border-purple-200 py-0.5">
            <p className="font-bold text-xs md:text-xs lg:text-sm text-purple-800 text-center px-1 line-clamp-1 leading-tight">
              {cardData.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);