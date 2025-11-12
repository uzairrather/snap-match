import React from 'react';

const GameStats = ({ matchedPairs, totalPairs, attempts }) => {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg border-2 border-purple-300 p-6">
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-8">
            {/* Matches Card */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-200 min-w-24">
              <div className="text-3xl font-bold text-purple-600">{matchedPairs}</div>
              <div className="text-sm text-gray-600 font-semibold">Matches</div>
            </div>

            {/* Attempts Card */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-blue-200 min-w-24">
              <div className="text-3xl font-bold text-blue-600">{attempts}</div>
              <div className="text-sm text-gray-600 font-semibold">Attempts</div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="text-right">
            <div className="text-4xl font-bold text-purple-700">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-gray-600 font-semibold">Progress</div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full">
          {/* Background Bar */}
          <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner border-2 border-gray-400">
            {/* Animated Progress Fill */}
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-yellow-400 rounded-full transition-all duration-700 ease-out relative shadow-lg"
              style={{ 
                width: `${progress}%`,
                boxShadow: `0 0 20px rgba(168, 85, 247, 0.6)`
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Milestone Markers */}
          <div className="flex justify-between mt-3 text-xs font-bold text-gray-600">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Achievement Message */}
        {progress > 0 && progress < 100 && (
          <div className="mt-4 text-center">
            <p className="text-purple-600 font-semibold">
              🎮 {totalPairs - matchedPairs} more matches to go! Keep it up! 🌟
            </p>
          </div>
        )}

        {progress === 100 && (
          <div className="mt-4 text-center">
            <p className="text-green-600 font-bold text-lg animate-bounce">
              ✅ Mission Ready! Complete all 4 missions! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;