/**
 * Earth Quiz Component
 * 
 * This component provides a multiple-choice quiz about geography, climate, and Earth science.
 * It presents questions with 4 options each, tracks the user's score, and provides feedback.
 */
import React, { useState } from 'react';
import { QuizQuestion, QuizState } from './types';
import { Button } from '@/components/ui/button';

/**
 * Earth Quiz Questions
 * 
 * A collection of multiple-choice questions about geography and Earth science,
 * appropriate for children ages 6-8.
 */
const earthQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What shape is the Earth?",
    options: [
      "Flat like a pancake",
      "Round like a sphere",
      "Square like a box",
      "Pointy like a triangle"
    ],
    correctAnswer: 1,
    explanation: "The Earth is round, similar to a sphere. It's slightly flattened at the poles, making it what scientists call an 'oblate spheroid'."
  },
  {
    id: 2,
    question: "How much of Earth is covered by water?",
    options: [
      "About 25%",
      "About 50%",
      "About 70%",
      "About 90%"
    ],
    correctAnswer: 2,
    explanation: "About 70% of Earth's surface is covered by water. Most of this is in our oceans, which is why Earth is sometimes called the 'Blue Planet'."
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    correctAnswer: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth. It covers more than 30% of the Earth's surface!"
  },
  {
    id: 4,
    question: "What is the tallest mountain on Earth?",
    options: [
      "Mount Everest",
      "Mount Kilimanjaro",
      "Mount Fuji",
      "Mount Rushmore"
    ],
    correctAnswer: 0,
    explanation: "Mount Everest is the tallest mountain on Earth, standing at 29,032 feet (8,849 meters) high. It's located in the Himalayan mountain range between Nepal and Tibet."
  },
  {
    id: 5,
    question: "What causes day and night on Earth?",
    options: [
      "Clouds blocking the sun",
      "The Earth turning around (rotating)",
      "The Sun moving around Earth",
      "The Moon blocking the Sun"
    ],
    correctAnswer: 1,
    explanation: "Day and night are caused by the Earth's rotation. As the Earth turns, different parts face the Sun (day) or face away from the Sun (night)."
  }
];

/**
 * EarthQuiz Component
 * 
 * Renders a quiz about the Earth, geography, and climate with
 * multiple-choice questions and interactive feedback.
 */
const EarthQuiz: React.FC = () => {
  // Initialize quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    completed: false
  });

  // Get the current question based on index
  const currentQuestion = earthQuestions[quizState.currentQuestionIndex];

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
    
    if (nextIndex >= earthQuestions.length) {
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
          <p className="text-xl">Your Score: <span className="font-bold text-primary">{quizState.score} / {earthQuestions.length}</span></p>
          <p className="mt-2 text-gray-600">
            {quizState.score === earthQuestions.length 
              ? "Perfect score! You're an Earth science expert!" 
              : quizState.score > earthQuestions.length / 2
                ? "Great job! You know a lot about our planet!"
                : "Good effort! Keep learning about Earth!"}
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
          Question {quizState.currentQuestionIndex + 1} of {earthQuestions.length}
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
            {quizState.currentQuestionIndex === earthQuestions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EarthQuiz;