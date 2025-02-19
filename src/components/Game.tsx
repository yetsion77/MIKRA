import React, { useState, useEffect } from 'react';
import VerseDisplay from './VerseDisplay.tsx';
import { Verse, getVersesByDifficulty } from '../data/versesData.ts';

interface GameProps {
  difficulty: 'easy' | 'hard';
  onGameOver: (score: number) => void;
  onLevelComplete: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ difficulty, onGameOver, onLevelComplete }) => {
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
    const unusedVerses = availableVerses.filter(verse => !used.has(verse.id));
    
    if (unusedVerses.length === 0) {
      setUsedVerses(new Set());
      selectRandomVerse(availableVerses, new Set());
      return;
    }

    const randomIndex = Math.floor(Math.random() * unusedVerses.length);
    const selectedVerse = unusedVerses[randomIndex];
    setCurrentVerse(selectedVerse);
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
        const newScore = score + 1;
        setScore(newScore);
        
        // בודק אם הגענו ל-20 נקודות
        if (newScore === 20 && difficulty === 'easy') {
          onLevelComplete(newScore);
        } else {
          setShowSource(false);
          setFeedbackVisible(false);
          setIsCorrect(null);
          selectRandomVerse(verses, usedVerses);
        }
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

        {/* תצוגת הפסוק */}
        <div className="mb-4">
          <VerseDisplay 
            partialVerse={currentVerse.partialVerse}
            missingWords={currentVerse.missingWords.map(word => ({ length: word.length }))}
            onAnswerUpdate={handleAnswerUpdate}
            verseIndex={usedVerses.size}
          />
        </div>

        {/* משוב ומקור */}
        <div className="mt-4 space-y-2">
          {feedbackVisible && (
            <div 
              className={`p-3 rounded-xl text-center text-lg font-medium transition-all duration-300
                ${isCorrect 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
                }
              `}
            >
              {isCorrect ? 'כל הכבוד! התשובה נכונה' : 'לא מדויק, נסה שוב'}
            </div>
          )}

          {showSource && (
            <div className="p-3 bg-blue-50 rounded-xl text-right border border-blue-100">
              <span className="text-gray-600">מקור: </span>
              <span className="font-semibold text-blue-800">{currentVerse.source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;