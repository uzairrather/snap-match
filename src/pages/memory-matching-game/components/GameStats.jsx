import React from 'react';

const GameStats = ({ matchedPairs, totalPairs, attempts }) => {
  const progress = (matchedPairs / totalPairs) * 100;

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-4 mb-6 md:mb-8">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg md:rounded-2xl shadow-lg border-2 border-purple-300 p-3 md:p-4 lg:p-6">
        {/* Stats Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 mb-4 md:mb-6">
          <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 lg:gap-8 w-full md:w-auto">
            {/* Matches Card */}
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 shadow-md border-2 border-purple-200 min-w-20 md:min-w-24">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 text-center">{matchedPairs}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold text-center">Matches</div>
            </div>

            {/* Attempts Card */}
            <div className="bg-white rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 shadow-md border-2 border-blue-200 min-w-20 md:min-w-24">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 text-center">{attempts}</div>
              <div className="text-xs md:text-sm text-gray-600 font-semibold text-center">Attempts</div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="text-center md:text-right">
            <div className="text-3xl md:text-4xl font-bold text-purple-700">
              {Math.round(progress)}%
            </div>
            <div className="text-xs md:text-sm text-gray-600 font-semibold">Progress</div>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full">
          {/* Background Bar */}
          <div className="w-full bg-gray-300 rounded-full h-5 md:h-6 overflow-hidden shadow-inner border-2 border-gray-400">
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
          <div className="flex justify-between mt-2 md:mt-3 text-xs font-bold text-gray-600">
            <span>0%</span>
            <span className="hidden sm:inline">25%</span>
            <span>50%</span>
            <span className="hidden sm:inline">75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Achievement Message */}
        {progress > 0 && progress < 100 && (
          <div className="mt-3 md:mt-4 text-center">
            <p className="text-purple-600 font-semibold text-xs md:text-sm lg:text-base">
              🎮 {totalPairs - matchedPairs} more matches to go! Keep it up! 🌟
            </p>
          </div>
        )}

        {progress === 100 && (
          <div className="mt-3 md:mt-4 text-center">
            <p className="text-green-600 font-bold text-sm md:text-base lg:text-lg animate-bounce">
              ✅ Mission Ready! Complete all 4 missions! 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStats;