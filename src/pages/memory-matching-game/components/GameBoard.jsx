import React, { useState } from 'react';
import GameCard from './GameCard';
import GameStats from './GameStats';

const GameBoard = ({ onGameComplete, onRestart, onCardFlip, onMatch }) => {
  const gameData = [
    { id: 1, profession: 'Chef', tool: 'Cooking Tools', professionImage: "/assets/images/chef_-1762802898157.PNG", professionImageAlt: 'Professional chef in white uniform and hat', toolImage: "/assets/images/chef_tools_-1762802929614.PNG", toolImageAlt: 'Collection of cooking tools' },
    { id: 2, profession: 'Nurse', tool: 'Medical Tools', professionImage: "/assets/images/nurse_-1762802027464.PNG", professionImageAlt: 'Nurse wearing scrubs and mask', toolImage: "/assets/images/nurse_tools_-1762802131970.PNG", toolImageAlt: 'Medical tools and equipment' },
    { id: 3, profession: 'Robotics Technician', tool: 'Robotics Tools', professionImage: "/assets/images/Robotics_-1762803076123.PNG", professionImageAlt: 'Robotics character', toolImage: "/assets/images/robotics_tools_-1762803110904.PNG", toolImageAlt: 'Robotics tools' },
    { id: 4, profession: 'Renewable Energy ', tool: 'Solar Panel & Wind Turbine', professionImage: "/assets/images/renewable_energy_-1762803674713.jpg", professionImageAlt: 'Renewable energy character', toolImage: "/assets/images/renewable_energy_tools_-1762803721226.PNG", toolImageAlt: 'Solar panel and wind turbine' },
    { id: 5, profession: 'Veterinarian', tool: 'Veterinary Tools', professionImage: "/assets/images/Vet-1762803776969.PNG", professionImageAlt: 'Veterinarian character', toolImage: "/assets/images/Vet_tools_-1762803874373.PNG", toolImageAlt: 'Veterinary tools' },
    { id: 6, profession: 'Physiotherapist', tool: 'Therapy Ball', professionImage: "/assets/images/Physiotherapist_-1762803995695.PNG", professionImageAlt: 'Physiotherapist', toolImage: "/assets/images/physio_tools_-1762804009140.jpg", toolImageAlt: 'Therapy ball' },
    { id: 7, profession: 'Electrician', tool: 'Multimeter', professionImage: "/assets/images/Electrician_-1762804093104.PNG", professionImageAlt: 'Electrician', toolImage: "/assets/images/electrician_tools_-1762804151629.jpg", toolImageAlt: 'Multimeter' },
    { id: 8, profession: 'Scientist', tool: 'Microscope', professionImage: "/assets/images/scientist_-1762804203805.jpg", professionImageAlt: 'Scientist', toolImage: "/assets/images/Scientist_tools_-1762804272512.jpeg", toolImageAlt: 'Microscope' }
  ];

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const createSnapCards = (ids) => {
    const cards = [];
    ids.forEach((id) => {
      const item = gameData.find(d => d.id === id);
      for (let i = 0; i < 2; i++) {
        cards.push({
          id: `profession-${item.id}-${i}`,
          type: 'profession',
          content: item.profession,
          image: item.professionImage,
          imageAlt: item.professionImageAlt,
          matchId: item.id
        });
      }
    });
    return shuffleArray(cards);
  };

  const createMatchCards = (ids) => {
    const cards = [];
    ids.forEach((id) => {
      const item = gameData.find(d => d.id === id);
      cards.push({
        id: `profession-${item.id}`,
        type: 'profession',
        content: item.profession,
        image: item.professionImage,
        imageAlt: item.professionImageAlt,
        matchId: item.id
      });
      cards.push({
        id: `tool-${item.id}`,
        type: 'tool',
        content: item.tool,
        image: item.toolImage,
        imageAlt: item.toolImageAlt,
        matchId: item.id
      });
    });
    return shuffleArray(cards);
  };

  const [mission1, setMission1] = useState(() => ({ cards: createSnapCards([1, 2, 3, 4]), flipped: [], matched: [], complete: false }));
  const [mission2, setMission2] = useState(() => ({ cards: createSnapCards([5, 6, 7, 8]), flipped: [], matched: [], complete: false }));
  const [mission3, setMission3] = useState(() => ({ cards: createMatchCards([1, 2, 3, 4]), flipped: [], matched: [], complete: false }));
  const [mission4, setMission4] = useState(() => ({ cards: createMatchCards([5, 6, 7, 8]), flipped: [], matched: [], complete: false }));

  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState({ show: false });
  const [celebration, setCelebration] = useState({ show: false, missionId: null, message: '' });
  const [allComplete, setAllComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleMissionCardClick = (cardId, missionState, setMissionState, missionId, expectedPairs, isSNAP) => {
    if (isChecking || missionState.flipped.includes(cardId) || missionState.matched.some(p => p.includes(cardId))) return;

    const newFlipped = [...missionState.flipped, cardId];
    setMissionState({ ...missionState, flipped: newFlipped });

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setAttempts(attempts + 1);

      setTimeout(() => {
        const [firstId, secondId] = newFlipped;
        const firstCard = missionState.cards.find(c => c.id === firstId);
        const secondCard = missionState.cards.find(c => c.id === secondId);

        const isMatch = isSNAP 
          ? (firstCard.matchId === secondCard.matchId && firstCard.type === secondCard.type)
          : (firstCard.matchId === secondCard.matchId && firstCard.type !== secondCard.type);

        if (isMatch) {
          const newMatched = [...missionState.matched, [firstId, secondId]];
          const isComplete = newMatched.length === expectedPairs;
          setMissionState({ ...missionState, flipped: [], matched: newMatched, complete: isComplete });
          setCelebration({ show: true, missionId, message: isSNAP ? '🎉 SNAP Well Done!' : '🎉 Perfect Match!' });
          setTimeout(() => setCelebration({ show: false, missionId: null, message: '' }), 1000);
        } else {
          setMissionState({ ...missionState, flipped: [] });
          setFeedback({ show: true });
          setTimeout(() => setFeedback({ show: false }), 1000);
        }
        setIsChecking(false);
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (mission1.complete && mission2.complete && mission3.complete && mission4.complete) {
      setAllComplete(true);
    }
  }, [mission1.complete, mission2.complete, mission3.complete, mission4.complete]);

  const resetAllGames = () => {
    const allSnapIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const shuffledIds = shuffleArray([...allSnapIds]);
    const mission1Ids = shuffledIds.slice(0, 4);
    const mission2Ids = shuffledIds.slice(4, 8);
    
    const allMatchIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const shuffledMatchIds = shuffleArray([...allMatchIds]);
    const mission3Ids = shuffledMatchIds.slice(0, 4);
    const mission4Ids = shuffledMatchIds.slice(4, 8);
    
    setMission1({ cards: createSnapCards(mission1Ids), flipped: [], matched: [], complete: false });
    setMission2({ cards: createSnapCards(mission2Ids), flipped: [], matched: [], complete: false });
    setMission3({ cards: createMatchCards(mission3Ids), flipped: [], matched: [], complete: false });
    setMission4({ cards: createMatchCards(mission4Ids), flipped: [], matched: [], complete: false });
    setAllComplete(false);
    setAttempts(0);
    setFeedback({ show: false });
    setCelebration({ show: false, missionId: null, message: '' });
    setIsChecking(false);
  };

  const totalMatches = mission1.matched.length + mission2.matched.length + mission3.matched.length + mission4.matched.length;

  const MissionCard = ({ card, missionState, onCardClick, disabled }) => (
    <div className="w-full aspect-square">
      <GameCard
        card={card}
        isFlipped={missionState.flipped.includes(card.id) || missionState.matched.some(p => p.includes(card.id))}
        isMatched={missionState.matched.some(p => p.includes(card.id))}
        onClick={() => onCardClick(card.id)}
        disabled={disabled}
      />
    </div>
  );

  const renderMission = (title, missionState, setMissionState, missionId, expectedPairs, isSNAP) => (
    <div className="relative bg-white rounded-xl p-8 shadow-lg border-4 border-purple-300 min-h-96">
      <h3 className="text-2xl font-bold text-purple-600 mb-2">{title}</h3>
      <p className="text-lg text-gray-700 mb-6 font-semibold">{isSNAP ? 'Match the 4 jobs on top with the 4 on bottom!' : 'Match the tools to the jobs!'}</p>
      
      <div className="flex-1 flex flex-col justify-between">
        {isSNAP ? (
          <>
            <div className="grid grid-cols-4 gap-4 mb-8 pb-8 border-b-4 border-purple-200">
              {missionState.cards.slice(0, 4).map(card => (
                <MissionCard key={card.id} card={card} missionState={missionState} onCardClick={(id) => handleMissionCardClick(id, missionState, setMissionState, missionId, expectedPairs, true)} disabled={isChecking} />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {missionState.cards.slice(4, 8).map(card => (
                <MissionCard key={card.id} card={card} missionState={missionState} onCardClick={(id) => handleMissionCardClick(id, missionState, setMissionState, missionId, expectedPairs, true)} disabled={isChecking} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {missionState.cards.map(card => (
              <MissionCard key={card.id} card={card} missionState={missionState} onCardClick={(id) => handleMissionCardClick(id, missionState, setMissionState, missionId, expectedPairs, false)} disabled={isChecking} />
            ))}
          </div>
        )}

        {missionState.complete && (
          <div className="p-3 bg-green-100 rounded-lg text-center border-2 border-green-400 mt-auto">
            <p className="text-green-700 font-bold text-lg">✅ Mission Complete!</p>
          </div>
        )}
      </div>

      {celebration.show && celebration.missionId === missionId && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl z-20">
          <div className="bg-yellow-300 rounded-full px-10 py-6 shadow-2xl animate-bounce">
            <p className="text-4xl font-bold text-purple-700">{celebration.message}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 text-purple-700">🎮 Game Missions</h1>
        <p className="text-center text-xl text-gray-700 font-semibold mb-8">Complete all 4 missions to finish the game!</p>

        <GameStats matchedPairs={totalMatches} totalPairs={16} attempts={attempts} />

        <div className="grid grid-cols-2 gap-10 mb-8">
          {renderMission('Mission 1: SNAP - Match the Jobs', mission1, setMission1, 'mission1', 4, true)}
          {renderMission('Mission 2: SNAP - Match the Jobs', mission2, setMission2, 'mission2', 4, true)}
          {renderMission('Mission 3: MATCH IT - Tools to Jobs', mission3, setMission3, 'mission3', 4, false)}
          {renderMission('Mission 4: MATCH IT - Tools to Jobs', mission4, setMission4, 'mission4', 4, false)}
        </div>
      </div>

      {allComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ left: `${Math.random() * 100}%`, top: `-10px`, animationDelay: `${Math.random() * 0.5}s`, animationDuration: `${2 + Math.random() * 1}s` }} />
            ))}
          </div>

          <div className="bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-3xl shadow-2xl text-center p-12 max-w-2xl w-full relative z-10 animate-bounce border-4 border-purple-600">
            <div className="text-8xl mb-6 animate-spin" style={{ animationDuration: '3s' }}>🎉</div>
            <h2 className="text-5xl font-bold text-purple-700 mb-4">🏆 Congratulations! 🏆</h2>
            <p className="text-2xl text-purple-600 mb-2 font-bold">You completed all 4 missions!</p>
            <p className="text-lg text-gray-700 mb-8">Amazing work! You matched all the jobs and tools perfectly! 🌟</p>
            <button onClick={resetAllGames} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-2xl transition-all duration-200 transform hover:scale-105">🎮 Play Again</button>
          </div>

          <style>{`@keyframes firework-burst { 0% { transform: translate(0, 0) scale(1); opacity: 1; } 100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; } } .firework { animation: firework-burst 1.5s ease-out forwards; }`}</style>
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 200;
              const tx = Math.cos(angle) * distance;
              const ty = Math.sin(angle) * distance;
              const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-500', 'bg-green-400', 'bg-pink-500', 'bg-purple-500'];
              return <div key={`firework-${i}`} className={`absolute w-3 h-3 ${colors[i % colors.length]} rounded-full firework`} style={{ left: '50%', top: '50%', '--tx': `${tx}px`, '--ty': `${ty}px`, animationDelay: `${(i % 10) * 0.1}s` }} />;
            })}
          </div>
        </div>
      )}

      {feedback.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-red-500 text-white rounded-xl shadow-2xl text-center px-8 py-8 max-w-md animate-bounce">
            <p className="text-3xl font-bold">You are close but try again!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
