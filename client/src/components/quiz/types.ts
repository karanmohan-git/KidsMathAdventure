/**
 * Quiz Question Interface
 * 
 * Defines the structure of a quiz question with multiple choice options.
 */
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/**
 * Quiz State Interface
 * 
 * Tracks the current state of a quiz session including:
 * - Which question is currently being displayed
 * - The user's selected answer for the current question
 * - Whether feedback is currently being shown
 * - The user's cumulative score
 * - Whether the quiz is completed
 */
export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  score: number;
  completed: boolean;
}