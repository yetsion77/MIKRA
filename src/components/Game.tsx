import React, { useState, useEffect } from 'react';
import VerseDisplay from './VerseDisplay.tsx';
import { Verse, getVersesByDifficulty } from '../data/versesData.ts';

interface GameProps {
  difficulty: 'easy' | 'hard';
  onGameOver: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ difficulty, onGameOver }) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [usedVerses, setUsedVerses] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [showSource, setShowSource] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const loadedVerses = getVersesByDifficulty(difficulty);
    setVerses(loadedVerses);
    selectRandomVerse(loadedVerses, new Set());
  }, [difficulty]);

  const selectRandomVerse = (availableVerses: Verse[], used: Set<string>) => {
    // מסנן את הפסוקים שכבר השתמשנו בהם
    const unusedVerses = availableVerses.filter(verse => !used.has(verse.id));
    
    // אם השתמשנו בכל הפסוקים, מתחיל מחדש
    if (unusedVerses.length === 0) {
      setUsedVerses(new Set());
      selectRandomVerse(availableVerses, new Set());
      return;
    }

    // בוחר פסוק אקראי מהרשימה הנותרת
    const randomIndex = Math.floor(Math.random() * unusedVerses.length);
    const selectedVerse = unusedVerses[randomIndex];
    setCurrentVerse(selectedVerse);
    
    // מוסיף את הפסוק לרשימת הפסוקים שהשתמשנו בהם
    setUsedVerses(prev => new Set([...prev, selectedVerse.id]));
  };

  const handleAnswerUpdate = (answers: string[]) => {
    if (!currentVerse || answers.includes('')) return;
    
    const correctAnswer = currentVerse.missingWords.join(' ');
    const userAnswer = answers.join(' ');
    
    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      setFeedbackVisible(true);
      setShowSource(true);
      
      setTimeout(() => {
        setScore(score + 1);
        setShowSource(false);
        setFeedbackVisible(false);
        setIsCorrect(null);
        // בוחר פסוק חדש אקראי
        selectRandomVerse(verses, usedVerses);
      }, 2000);
    } else {
      setIsCorrect(false);
      setFeedbackVisible(true);
      setMistakes(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 2) {
          setTimeout(() => onGameOver(score), 1500);
        }
        return newMistakes;
      });
      
      setTimeout(() => {
        setFeedbackVisible(false);
        setIsCorrect(null);
      }, 2000);
    }
  };

  if (!currentVerse) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        {/* כותרת וניקוד */}
        <div className="mb-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl">
          <div className="text-lg font-semibold">
            ניקוד: 
            <span className="mx-2 px-3 py-1 bg-blue-500 text-white rounded-lg">
              {score}
            </span>
          </div>
          <div className="text-lg font-semibold flex items-center gap-2">
            טעויות: 
            <div className="flex gap-1">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < mistakes ? 'bg-red-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* משוב */}
        {feedbackVisible && (
          <div 
            className={`p-3 my-4 rounded-xl text-center text-lg font-semibold 
              transform transition-all duration-300 scale-100 
              ${isCorrect 
                ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                : 'bg-red-100 text-red-700 border-2 border-red-200'
              }
              fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md
              shadow-lg animate-bounce
            `}
          >
            {isCorrect ? 'כל הכבוד! התשובה נכונה' : 'לא מדויק, נסה שוב'}
          </div>
        )}

        {/* תצוגת הפסוק */}
        <div className="mb-4">
          <VerseDisplay 
            partialVerse={currentVerse.partialVerse}
            missingWords={currentVerse.missingWords.map(word => ({ length: word.length }))}
            onAnswerUpdate={handleAnswerUpdate}
            verseIndex={usedVerses.size}
          />
        </div>

        {/* מקור */}
        {showSource && (
          <div className="p-3 bg-blue-50 rounded-xl text-right animate-fade-in border-2 border-blue-100 mb-4">
            <span className="text-gray-600">מקור: </span>
            <span className="font-semibold text-blue-800">{currentVerse.source}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// הוספת אנימציית קפיצה למשוב
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce {
    0%, 100% { transform: translateY(0) translateX(-50%); }
    50% { transform: translateY(-10px) translateX(-50%); }
  }
  .animate-bounce {
    animation: bounce 1s infinite;
  }
`;
document.head.appendChild(style);

export default Game;