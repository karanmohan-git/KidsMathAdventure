import React from 'react';
import { RiCheckDoubleLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Problem } from '@/lib/algebraProblems';

interface AlgebraFeedbackProps {
  isCorrect: boolean;
  problem: Problem;
  userAnswer: number;
  onNextChallenge: () => void;
}

const AlgebraFeedback: React.FC<AlgebraFeedbackProps> = ({ 
  isCorrect, 
  problem, 
  userAnswer,
  onNextChallenge 
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      {isCorrect ? (
        <div className="p-4 bg-success bg-opacity-10 rounded-xl border-l-4 border-success">
          <div className="flex items-start">
            <div className="bg-success text-white p-2 rounded-xl mr-4">
              <RiCheckDoubleLine className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-success mb-1">Correct! Great job!</h3>
              <p className="text-lg">
                {problem.firstNumber} {problem.operation} {problem.answer} = {problem.result}
              </p>
              <p className="mt-2">You figured out the missing number!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-error bg-opacity-10 rounded-xl border-l-4 border-error">
          <div className="flex items-start">
            <div className="bg-error text-white p-2 rounded-xl mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-error mb-1">Not quite right</h3>
              <p className="text-lg">
                {problem.firstNumber} {problem.operation} {userAnswer} ≠ {problem.result}
              </p>
              <p className="mt-2">Let's try again! The correct answer is {problem.answer}.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-3">Understanding the Problem</h3>
        <p className="text-lg mb-4">
          {problem.explanation}
        </p>
        <div className="flex justify-center my-6">
          <div className="bg-primary bg-opacity-10 p-4 rounded-xl w-full max-w-md">
            <h4 className="font-bold text-lg text-primary mb-2">Step by Step</h4>
            <p>{problem.stepByStep}</p>
          </div>
        </div>
        <Button 
          className="w-full bg-secondary hover:bg-opacity-90 text-white py-3 rounded-xl text-xl font-bold"
          onClick={onNextChallenge}
        >
          Next Challenge
        </Button>
      </div>
    </div>
  );
};

export default AlgebraFeedback;
