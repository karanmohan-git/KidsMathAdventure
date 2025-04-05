/**
 * Universe Quiz Component
 * 
 * This component provides a multiple-choice quiz about space, planets, stars, and astronomy.
 * It presents questions with 4 options each, tracks the user's score, and provides feedback.
 */
import React, { useState } from 'react';
import { QuizQuestion, QuizState } from './types';
import { Button } from '@/components/ui/button';

/**
 * Universe Quiz Questions
 * 
 * A collection of multiple-choice questions about space and astronomy,
 * appropriate for children ages 6-8.
 */
const universeQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which is the closest star to Earth?",
    options: [
      "Proxima Centauri",
      "The Sun",
      "Sirius",
      "Alpha Centauri"
    ],
    correctAnswer: 1,
    explanation: "The Sun is the closest star to Earth, at about 93 million miles (150 million kilometers) away."
  },
  {
    id: 2,
    question: "How many planets are in our solar system?",
    options: [
      "7",
      "8",
      "9",
      "10"
    ],
    correctAnswer: 1,
    explanation: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
  },
  {
    id: 3,
    question: "Which planet is known for its beautiful rings?",
    options: [
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus"
    ],
    correctAnswer: 2,
    explanation: "Saturn is famous for its beautiful and extensive ring system, which is made mostly of ice particles with a smaller amount of rocky debris and dust."
  },
  {
    id: 4,
    question: "What is the name of Earth's natural satellite?",
    options: [
      "Sun",
      "Mars",
      "Venus",
      "Moon"
    ],
    correctAnswer: 3,
    explanation: "The Moon is Earth's only natural satellite. It orbits around Earth and is about 238,855 miles (384,400 kilometers) away."
  },
  {
    id: 5,
    question: "Which is the hottest planet in our solar system?",
    options: [
      "Mercury",
      "Venus",
      "Earth",
      "Mars"
    ],
    correctAnswer: 1,
    explanation: "Venus is the hottest planet in our solar system. Its thick atmosphere traps heat in a greenhouse effect, making it even hotter than Mercury."
  }
];

/**
 * UniverseQuiz Component
 * 
 * Renders a quiz about the universe, space, and astronomy with
 * multiple-choice questions and interactive feedback.
 */
const UniverseQuiz: React.FC = () => {
  // Initialize quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    completed: false
  });

  // Get the current question based on index
  const currentQuestion = universeQuestions[quizState.currentQuestionIndex];

  /**
   * Handle when the user selects an answer option
   * @param answerIndex - The index of the selected answer
   */
  const handleAnswerSelect = (answerIndex: number) => {
    setQuizState({
      ...quizState,
      selectedAnswer: answerIndex,
    });
  };

  /**
   * Handle when the user submits their answer
   * Shows feedback and updates score if correct
   */
  const handleSubmitAnswer = () => {
    if (quizState.selectedAnswer === null) return;

    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;
    
    setQuizState({
      ...quizState,
      showFeedback: true,
      score: isCorrect ? quizState.score + 1 : quizState.score
    });
  };

  /**
   * Handle moving to the next question or completing the quiz
   */
  const handleNextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= universeQuestions.length) {
      // Quiz is complete
      setQuizState({
        ...quizState,
        completed: true,
        showFeedback: false
      });
    } else {
      // Move to next question
      setQuizState({
        ...quizState,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showFeedback: false
      });
    }
  };

  /**
   * Reset the quiz to start over
   */
  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showFeedback: false,
      score: 0,
      completed: false
    });
  };

  // Render the quiz completion screen
  if (quizState.completed) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <div className="mb-6">
          <p className="text-xl">Your Score: <span className="font-bold text-primary">{quizState.score} / {universeQuestions.length}</span></p>
          <p className="mt-2 text-gray-600">
            {quizState.score === universeQuestions.length 
              ? "Perfect score! You're a space expert!" 
              : quizState.score > universeQuestions.length / 2
                ? "Great job! You know a lot about space!"
                : "Good effort! Keep learning about the universe!"}
          </p>
        </div>
        <Button onClick={handleRestartQuiz}>
          Play Again
        </Button>
      </div>
    );
  }

  // Render the active quiz question
  return (
    <div className="py-4">
      <div className="flex justify-between mb-6">
        <span className="text-sm font-medium">
          Question {quizState.currentQuestionIndex + 1} of {universeQuestions.length}
        </span>
        <span className="text-sm font-medium">
          Score: {quizState.score}
        </span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                quizState.selectedAnswer === index 
                  ? 'bg-blue-100 border-blue-500' 
                  : 'hover:bg-gray-50 border-gray-300'
              } ${
                quizState.showFeedback && index === currentQuestion.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : quizState.showFeedback && index === quizState.selectedAnswer && index !== currentQuestion.correctAnswer
                    ? 'bg-red-100 border-red-500'
                    : ''
              }`}
              onClick={() => !quizState.showFeedback && handleAnswerSelect(index)}
            >
              <div className="flex items-center">
                <div className={`h-6 w-6 flex items-center justify-center rounded-full mr-3 ${
                  quizState.selectedAnswer === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {quizState.showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          quizState.selectedAnswer === currentQuestion.correctAnswer
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          <p className="font-bold mb-1">
            {quizState.selectedAnswer === currentQuestion.correctAnswer
              ? 'Correct!'
              : 'Not quite right.'}
          </p>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex justify-end">
        {!quizState.showFeedback ? (
          <Button 
            onClick={handleSubmitAnswer}
            disabled={quizState.selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {quizState.currentQuestionIndex === universeQuestions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UniverseQuiz;