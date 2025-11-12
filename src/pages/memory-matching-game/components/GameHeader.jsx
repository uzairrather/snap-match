import React from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const GameHeader = ({ onRestart, gameTitle = "Snap Match" }) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-20 px-6 max-w-7xl mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            {/* WONDERLEAP Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/assets/images/wonder_logo-1762769844639.png"
                alt="WONDERLEAP logo - yellow cartoon star character mascot with happy expression, rosy cheeks, holding paintbrush and scroll, with purple and blue gradient branding"
                className="w-16 h-16 object-contain"
              />
            </div>
            
            {/* Brand Text */}
            <h1 className="text-3xl font-bold text-primary">
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
            className="min-h-[60px] min-w-[140px] text-lg font-semibold"
          >
            New Game
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;