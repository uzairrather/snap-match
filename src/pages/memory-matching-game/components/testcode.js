// import React, { useState, useCallback } from 'react';
// import GameCard from './GameCard';

// const GameBoard = ({ onGameComplete, onRestart, onCardFlip, onMatch }) => {
//   const gameData = [
//   {
//     id: 1,
//     profession: 'Chef',
//     tool: 'Cooking Tools',
//     professionImage: "/assets/images/chef_-1762802898157.PNG",
//     professionImageAlt: 'Professional chef in white uniform and hat',
//     toolImage: "/assets/images/chef_tools_-1762802929614.PNG",
//     toolImageAlt: 'Collection of cooking tools including gray frying pan with black handle, white spatula with orange handle and slotted design, white chef\'s hat, and wooden spoon'
//   },
//   {
//     id: 2,
//     profession: 'Nurse',
//     tool: 'Medical Tools',
//     professionImage: "/assets/images/nurse_-1762802027464.PNG",
//     professionImageAlt: 'Nurse wearing scrubs and mask',
//     toolImage: "/assets/images/nurse_tools_-1762802131970.PNG",
//     toolImageAlt: 'Medical tools and equipment for healthcare'
//   },
//   {
//     id: 3,
//     profession: 'Robotics Technician',
//     tool: 'Robotics Tools',
//     professionImage: "/assets/images/Robotics_-1762803076123.PNG",
//     professionImageAlt: 'Yellow cartoon star character wearing white shirt with blue vest/apron and purple WONDERLEAP belt, giving thumbs up gesture and holding a small gray robot with blue eyes and control panel',
//     toolImage: "/assets/images/robotics_tools_-1762803110904.PNG",
//     toolImageAlt: 'Collection of robotics and engineering tools including gray robot with blue eyes and happy expression, silver wrench, blue-handled screwdriver, gray laptop computer with blue screen, and yellow toolbox with brown cross symbol'
//   },
//   {
//     id: 4,
//     profession: 'Renewable Energy Technician',
//     tool: 'Solar Panel & Wind Turbine',
//     professionImage: "/assets/images/renewable_energy_-1762803674713.jpg",
//     professionImageAlt: 'Yellow cartoon star character wearing green helmet with yellow sun logo, holding blue solar panel in left hand and white wind turbine in right hand, wearing purple WONDERLEAP belt, happy facial expression with big eyes, smile and rosy cheeks',
//     toolImage: "/assets/images/renewable_energy_tools_-1762803721226.PNG",
//     toolImageAlt: 'Renewable energy tools including solar panel and wind turbine'
//   },
//   {
//     id: 5,
//     profession: 'Veterinarian',
//     tool: 'Veterinary Tools',
//     professionImage: "/assets/images/Vet-1762803776969.PNG",
//     professionImageAlt: 'Veterinarian character',
//     toolImage: "/assets/images/Vet_tools_-1762803874373.PNG",
//     toolImageAlt: 'Collection of veterinary tools including gray stethoscope, beige pet carrier/travel cage with gray grated door and ventilation slots, light blue syringe with measurement marks, beige medicine bottle with orange cross symbol, and brown paw print with four toe pads'
//   },
//   {
//     id: 6,
//     profession: 'Physiotherapist',
//     tool: 'Therapy Ball',
//     professionImage: "/assets/images/Physiotherapist_-1762803995695.PNG",
//     professionImageAlt: 'Physiotherapist',
//     toolImage: "/assets/images/physio_tools_-1762804009140.jpg",
//     toolImageAlt: 'Therapy ball'
//   },
//   {
//     id: 7,
//     profession: 'Electrician',
//     tool: 'Multimeter',
//     professionImage: "/assets/images/Electrician_-1762804093104.PNG",
//     professionImageAlt: 'Electrician',
//     toolImage: "/assets/images/electrician_tools_-1762804151629.jpg",
//     toolImageAlt: 'Digital multimeter'
//   },
//   {
//     id: 8,
//     profession: 'Scientist',
//     tool: 'Microscope',
//     professionImage: "/assets/images/scientist_-1762804203805.jpg",
//     professionImageAlt: 'Scientist in lab',
//     toolImage: "/assets/images/Scientist_tools_-1762804272512.jpeg",
//     toolImageAlt: 'Laboratory microscope'
//   }
// ];


//   const createCards = useCallback(() => {
//     const cards = [];
//     gameData?.forEach((item) => {
//       cards?.push({
//         id: `profession-${item?.id}`,
//         type: 'profession',
//         content: item?.profession,
//         image: item?.professionImage,
//         imageAlt: item?.professionImageAlt,
//         matchId: item?.id
//       });
//       cards?.push({
//         id: `tool-${item?.id}`,
//         type: 'tool',
//         content: item?.tool,
//         image: item?.toolImage,
//         imageAlt: item?.toolImageAlt,
//         matchId: item?.id
//       });
//     });
//     return shuffleArray(cards);
//   }, []);

//   const shuffleArray = (array) => {
//     const newArray = [...array];
//     for (let i = newArray?.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [newArray[i], newArray[j]] = [newArray?.[j], newArray?.[i]];
//     }
//     return newArray;
//   };

//   const [cards, setCards] = useState(() => createCards());
//   const [flippedCards, setFlippedCards] = useState([]);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [isChecking, setIsChecking] = useState(false);
//   const [gameComplete, setGameComplete] = useState(false);

//   const handleCardClick = (cardId) => {
//     if (isChecking || flippedCards?.includes(cardId) || matchedPairs?.some((pair) => pair?.includes(cardId))) {
//       return;
//     }

//     const newFlippedCards = [...flippedCards, cardId];
//     setFlippedCards(newFlippedCards);

//     if (onCardFlip) {
//       onCardFlip();
//     }

//     if (newFlippedCards?.length === 2) {
//       setIsChecking(true);

//       setTimeout(() => {
//         const [firstCardId, secondCardId] = newFlippedCards;
//         const firstCard = cards?.find((card) => card?.id === firstCardId);
//         const secondCard = cards?.find((card) => card?.id === secondCardId);

//         if (firstCard?.matchId === secondCard?.matchId && firstCard?.type !== secondCard?.type) {
//           const newMatchedPairs = [...matchedPairs, [firstCardId, secondCardId]];
//           setMatchedPairs(newMatchedPairs);

//           if (onMatch) {
//             onMatch();
//           }

//           if (newMatchedPairs?.length === gameData?.length) {
//             setGameComplete(true);
//             if (onGameComplete) {
//               onGameComplete();
//             }
//           }
//         }

//         setFlippedCards([]);
//         setIsChecking(false);
//       }, 1000);
//     }
//   };

//   const resetGame = () => {
//     setCards(createCards());
//     setFlippedCards([]);
//     setMatchedPairs([]);
//     setIsChecking(false);
//     setGameComplete(false);
//     if (onRestart) {
//       onRestart();
//     }
//   };

//   const isCardFlipped = (cardId) => {
//     return flippedCards?.includes(cardId) || matchedPairs?.some((pair) => pair?.includes(cardId));
//   };

//   const isCardMatched = (cardId) => {
//     return matchedPairs?.some((pair) => pair?.includes(cardId));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full py-8">
//       {/* Game Grid */}
//       <div className="grid grid-cols-5 gap-4 max-w-6xl w-full px-4">
//         {cards?.map((card) =>
//         <div key={card?.id} className="w-full aspect-square">
//             <GameCard
//             card={card}
//             isFlipped={isCardFlipped(card?.id)}
//             isMatched={isCardMatched(card?.id)}
//             onClick={() => handleCardClick(card?.id)}
//             disabled={isChecking} />

//           </div>
//         )}
//       </div>
//       {/* Game Complete Modal */}
//       {gameComplete &&
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-2xl text-center max-w-sm w-full p-8">
//             <div className="text-6xl mb-4">🎉</div>
//             <h2 className="text-3xl font-bold text-green-500 mb-4">
//               Congratulations!
//             </h2>
//             <p className="text-gray-600 mb-8 text-lg">
//               You matched all the professions with their tools!
//             </p>
//             <button
//             onClick={resetGame}
//             className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">

//               Play Again
//             </button>
//           </div>
//         </div>
//       }
//     </div>);

// };

// export default GameBoard;