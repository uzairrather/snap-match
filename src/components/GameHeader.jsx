import React from 'react';
import Button from './ui/Button';

const GameHeader = ({ onRestart, gameTitle = "Snap Match" }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border h-header-height">
      <div className="flex items-center justify-between h-full px-game-margin">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            {/* Logo SVG */}
            <svg 
              width="40" 
              height="40" 
              viewBox="0 0 40 40" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <rect 
                width="40" 
                height="40" 
                rx="8" 
                fill="var(--color-primary)"
              />
              <rect 
                x="8" 
                y="8" 
                width="10" 
                height="10" 
                rx="2" 
                fill="white"
              />
              <rect 
                x="22" 
                y="8" 
                width="10" 
                height="10" 
                rx="2" 
                fill="var(--color-accent)"
              />
              <rect 
                x="8" 
                y="22" 
                width="10" 
                height="10" 
                rx="2" 
                fill="var(--color-secondary)"
              />
              <rect 
                x="22" 
                y="22" 
                width="10" 
                height="10" 
                rx="2" 
                fill="white"
              />
            </svg>
            
            {/* Brand Text */}
            <h1 className="font-heading text-game-title text-primary">
              {gameTitle}
            </h1>
          </div>
        </div>

        {/* Restart Button */}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="lg"
            onClick={onRestart}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={20}
            className="touch-target forgiving-zone font-body font-semibold text-game-button"
          >
            New Game
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;