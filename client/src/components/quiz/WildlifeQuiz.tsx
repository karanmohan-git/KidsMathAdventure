/**
 * Wildlife Quiz Component
 * 
 * This component provides a multiple-choice quiz about animals, ecosystems, and nature.
 * It presents questions with 4 options each, tracks the user's score, and provides feedback.
 */
import React, { useState } from 'react';
import { QuizQuestion, QuizState } from './types';
import { Button } from '@/components/ui/button';

/**
 * Wildlife Quiz Questions
 * 
 * A collection of multiple-choice questions about animals and nature,
 * appropriate for children ages 6-8.
 */
const wildlifeQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which animal is known as the 'King of the Jungle'?",
    options: [
      "Tiger",
      "Elephant",
      "Lion",
      "Gorilla"
    ],
    correctAnswer: 2,
    explanation: "Lions are often called the 'King of the Jungle' because of their strength and majestic appearance, even though they actually live in grasslands and plains, not jungles."
  },
  {
    id: 2,
    question: "Which of these animals can fly?",
    options: [
      "Penguin",
      "Bat",
      "Dolphin",
      "Kangaroo"
    ],
    correctAnswer: 1,
    explanation: "Bats are mammals that can fly. They're the only mammals with wings that allow true flight!"
  },
  {
    id: 3,
    question: "What do caterpillars turn into?",
    options: [
      "Spiders",
      "Birds",
      "Frogs",
      "Butterflies"
    ],
    correctAnswer: 3,
    explanation: "Caterpillars transform into butterflies or moths through a process called metamorphosis."
  },
  {
    id: 4,
    question: "Which animal has black and white stripes?",
    options: [
      "Zebra",
      "Giraffe",
      "Lion",
      "Elephant"
    ],
    correctAnswer: 0,
    explanation: "Zebras have distinctive black and white stripes. Each zebra's stripe pattern is unique, like human fingerprints!"
  },
  {
    id: 5,
    question: "Which animal can change its color to match its surroundings?",
    options: [
      "Snake",
      "Frog",
      "Chameleon",
      "Turtle"
    ],
    correctAnswer: 2,
    explanation: "Chameleons can change their skin color to blend with their environment, communicate with other chameleons, or regulate their body temperature."
  }
];

/**
 * WildlifeQuiz Component
 * 
 * Renders a quiz about wildlife, animals, and nature with
 * multiple-choice questions and interactive feedback.
 */
const WildlifeQuiz: React.FC = () => {
  // Initialize quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    score: 0,
    completed: false
  });

  // Get the current question based on index
  const currentQuestion = wildlifeQuestions[quizState.currentQuestionIndex];

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
    
    if (nextIndex >= wildlifeQuestions.length) {
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
          <p className="text-xl">Your Score: <span className="font-bold text-primary">{quizState.score} / {wildlifeQuestions.length}</span></p>
          <p className="mt-2 text-gray-600">
            {quizState.score === wildlifeQuestions.length 
              ? "Perfect score! You're an animal expert!" 
              : quizState.score > wildlifeQuestions.length / 2
                ? "Great job! You know a lot about wildlife!"
                : "Good effort! Keep learning about animals!"}
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
          Question {quizState.currentQuestionIndex + 1} of {wildlifeQuestions.length}
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
            {quizState.currentQuestionIndex === wildlifeQuestions.length - 1
              ? 'Finish Quiz'
              : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WildlifeQuiz;