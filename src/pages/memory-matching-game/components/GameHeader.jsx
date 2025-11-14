import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GameHeader = ({ onRestart, gameTitle = "Snap Match" }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 md:h-20 px-2 sm:px-4 md:px-6 max-w-7xl mx-auto w-full">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          {/* WONDERLEAP Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/assets/images/wonder_logo-1762769844639.png"
              alt="WONDERLEAP logo - yellow cartoon star character mascot"
              className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 object-contain"
              loading="eager"
            />
          </div>
          
          {/* Brand Text */}
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary truncate">
            {gameTitle}
          </h1>
        </div>

        {/* Restart Button */}
        <div className="flex items-center flex-shrink-0 ml-2 md:ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestart}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="min-h-10 md:min-h-12 px-3 md:px-4 text-xs md:text-lg font-semibold whitespace-nowrap"
          >
            New Game
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;