import React from 'react';
import { RiCodeBoxLine, RiFunctionLine, RiShapeLine, RiQuestionLine } from 'react-icons/ri';

type Tab = 'python' | 'algebra' | 'geometry' | 'quiz';

interface NavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <button 
            className={`flex flex-col items-center py-4 px-8 border-b-4 font-bold text-xl
              ${activeTab === 'python' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('python')}
          >
            <RiCodeBoxLine className="text-3xl mb-1" />
            Python Coding
          </button>
          
          <button 
            className={`flex flex-col items-center py-4 px-8 border-b-4 font-bold text-xl
              ${activeTab === 'algebra' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('algebra')}
          >
            <RiFunctionLine className="text-3xl mb-1" />
            Algebra
          </button>
          
          <button 
            className={`flex flex-col items-center py-4 px-8 border-b-4 font-bold text-xl
              ${activeTab === 'geometry' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('geometry')}
          >
            <RiShapeLine className="text-3xl mb-1" />
            Geometry
          </button>
          
          <button 
            className={`flex flex-col items-center py-4 px-8 border-b-4 font-bold text-xl
              ${activeTab === 'quiz' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 hover:text-primary'}`}
            onClick={() => setActiveTab('quiz')}
          >
            <RiQuestionLine className="text-3xl mb-1" />
            Quizzes
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
