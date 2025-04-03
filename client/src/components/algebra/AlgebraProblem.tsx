import React from 'react';
import { Problem } from '@/lib/algebraProblems';

interface AlgebraProblemProps {
  problem: Problem;
}

const AlgebraProblem: React.FC<AlgebraProblemProps> = ({ problem }) => {
  return (
    <div className="bg-accent bg-opacity-10 p-5 rounded-xl mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-accent">Find the Missing Number</h3>
        <span className="bg-accent text-white px-3 py-1 rounded-lg text-sm font-bold">Level {problem.level}</span>
      </div>
      
      <div className="text-center py-4">
        <div className="flex items-center justify-center text-3xl font-bold">
          <span>{problem.firstNumber}</span>
          <span className="mx-2">{problem.operation}</span>
          <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-lg flex items-center justify-center text-black font-bold border-2 border-dashed border-secondary">
            x
          </div>
          <span className="mx-2">=</span>
          <span>{problem.result}</span>
        </div>
        <div className="text-lg mt-2 text-gray-700 font-medium">
          ({problem.firstNumber} {problem.operation} <span className="text-black font-bold">x</span> = {problem.result})
        </div>
      </div>
      
      <p className="text-center text-lg mt-2">
        What number should replace the <span className="text-secondary font-bold">x</span>?
      </p>
    </div>
  );
};

export default AlgebraProblem;
