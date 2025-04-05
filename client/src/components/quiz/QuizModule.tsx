/**
 * Quiz Module Component
 * 
 * This component provides an interactive quiz experience for children with three categories:
 * 1. Universe Quiz - Questions about space, planets, stars, and astronomy
 * 2. Wildlife Quiz - Questions about animals, ecosystems, and nature
 * 3. Earth Quiz - Questions about geography, climate, and Earth science
 * 
 * Each quiz presents multiple-choice questions with 4 options and tracks the child's score.
 */
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button } from '@/components/ui/button';
import UniverseQuiz from './UniverseQuiz';
import WildlifeQuiz from './WildlifeQuiz';
import EarthQuiz from './EarthQuiz';

/**
 * QuizModule Component
 * 
 * Main container for the quiz section that allows children to select and 
 * interact with different quiz categories.
 */
const QuizModule: React.FC = () => {
  // Track which quiz category is currently active
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">Knowledge Adventure Quizzes</h1>
        <p className="text-gray-600 text-center">
          Test your knowledge about the universe, wildlife, and Earth with these fun quizzes!
          Each quiz has multiple-choice questions to challenge what you know.
        </p>
      </header>

      <Tabs 
        selectedIndex={activeQuizIndex} 
        onSelect={index => setActiveQuizIndex(index)}
        className="mb-6"
      >
        <TabList className="flex mb-4 border-b">
          <Tab className="px-6 py-3 font-semibold text-center cursor-pointer border-b-2 border-transparent hover:text-primary transition-colors">
            Universe Quiz
          </Tab>
          <Tab className="px-6 py-3 font-semibold text-center cursor-pointer border-b-2 border-transparent hover:text-primary transition-colors">
            Wildlife Quiz
          </Tab>
          <Tab className="px-6 py-3 font-semibold text-center cursor-pointer border-b-2 border-transparent hover:text-primary transition-colors">
            Earth Quiz
          </Tab>
        </TabList>

        <div className="px-2">
          <TabPanel>
            <UniverseQuiz />
          </TabPanel>
          
          <TabPanel>
            <WildlifeQuiz />
          </TabPanel>
          
          <TabPanel>
            <EarthQuiz />
          </TabPanel>
        </div>
      </Tabs>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold text-lg text-blue-700 mb-2">Learning Through Quizzes</h3>
        <p className="text-blue-600">
          Quizzes are a fun way to learn and remember important facts about our world and beyond.
          Try to beat your previous score each time you play!
        </p>
      </div>
    </div>
  );
};

export default QuizModule;