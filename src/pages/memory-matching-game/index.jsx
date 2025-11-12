import React, { useState } from 'react';
import GameHeader from './components/GameHeader';
import GameBoard from './components/GameBoard';
import GameStats from './components/GameStats';

const MemoryMatchingGame = () => {
  const [gameKey, setGameKey] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const totalPairs = 6;

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setMatchedPairs(0);
    setAttempts(0);
  };

  const handleGameComplete = () => {
    // Game completion logic can be added here
    console.log('Game completed!');
  };

  const handleCardFlip = () => {
    setAttempts(prev => prev + 1);
  };

  const handleMatch = () => {
    setMatchedPairs(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Game Header */}
      <GameHeader onRestart={handleRestart} />
      {/* Main Game Content */}
      <main className="pt-8 pb-8">
        {/* Game Stats */}
        {/* <GameStats 
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          attempts={attempts}
        /> */}
        
        {/* Instructions */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            You have a Mission - Match the Jobs to Their Tools!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tap the cards to flip them over.
            Can you find which tools belong to the jobs?
            See if you can match them all – Good Luck
          </p>
        </div>
        
        {/* Game Board */}
        <div className="flex justify-center px-4">
          <GameBoard 
            key={gameKey}
            onGameComplete={handleGameComplete}
            onRestart={handleRestart}
            onCardFlip={handleCardFlip}
            onMatch={handleMatch}
          />
        </div>
        
        {/* Encouragement Message */}
        <div className="text-center mt-8 px-4">
          <p className="text-lg text-gray-600">
            {matchedPairs === 0 && "Let's start matching! Click any card to begin."}
            {matchedPairs > 0 && matchedPairs < totalPairs && `Great job! You've found ${matchedPairs} match${matchedPairs > 1 ? 'es' : ''}. Keep going!`}
            {matchedPairs === totalPairs && "🎉 Amazing! You matched them all! 🎉"}
          </p>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">
            © {new Date()?.getFullYear()} Wonderleap – Discover, Leap and Succeed 
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MemoryMatchingGame;