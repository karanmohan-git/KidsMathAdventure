import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiQuestionLine, RiCheckboxCircleLine } from 'react-icons/ri';

type Shape = 'triangle' | 'square' | 'circle';

interface GeometryLessonsProps {
  selectedShape: Shape;
}

const GeometryLessons: React.FC<GeometryLessonsProps> = ({ selectedShape }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  
  const getShapeInfo = () => {
    switch(selectedShape) {
      case 'triangle':
        return {
          title: 'All About Triangles',
          description: 'A triangle is a shape with 3 sides and 3 angles. The word "triangle" comes from the Latin word "triangulus," which means "three-cornered."',
          types: [
            { name: 'Equilateral', desc: 'All sides and angles are equal' },
            { name: 'Isosceles', desc: 'Two sides and two angles are equal' },
            { name: 'Scalene', desc: 'All sides and angles are different' }
          ],
          question: 'What is the name of a triangle where all sides are equal?',
          answers: [
            'Scalene Triangle',
            'Isosceles Triangle',
            'Equilateral Triangle',
            'Right Triangle'
          ],
          correctAnswer: 'Equilateral Triangle'
        };
      case 'square':
        return {
          title: 'All About Squares',
          description: 'A square is a special type of rectangle where all four sides have the same length. It has four right angles (90 degrees).',
          types: [
            { name: 'Square', desc: 'All sides equal, all angles 90°' },
            { name: 'Rectangle', desc: 'Opposite sides equal, all angles 90°' },
            { name: 'Rhombus', desc: 'All sides equal, opposite angles equal' }
          ],
          question: 'What is special about the angles in a square?',
          answers: [
            'They are all 60 degrees',
            'They are all 90 degrees',
            'They are all 45 degrees',
            'They add up to 180 degrees'
          ],
          correctAnswer: 'They are all 90 degrees'
        };
      case 'circle':
        return {
          title: 'All About Circles',
          description: 'A circle is a round shape where all points on the edge are the same distance from the center. This distance is called the radius.',
          types: [
            { name: 'Radius', desc: 'The distance from center to edge' },
            { name: 'Diameter', desc: 'The distance across the circle through the center' },
            { name: 'Circumference', desc: 'The distance around the circle' }
          ],
          question: 'What is the name for the distance around a circle?',
          answers: [
            'Radius',
            'Diameter',
            'Circumference',
            'Perimeter'
          ],
          correctAnswer: 'Circumference'
        };
      default:
        return {
          title: 'Explore Shapes',
          description: 'Select a shape to learn more about it!',
          types: [],
          question: '',
          answers: [],
          correctAnswer: ''
        };
    }
  };
  
  const info = getShapeInfo();
  
  const handleAnswerClick = (answer: string) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };
  
  const checkAnswer = () => {
    setIsAnswerChecked(true);
  };
  
  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };
  
  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">{info.title}</h2>
        
        <div className="mb-6">
          <div className="bg-primary bg-opacity-10 p-4 rounded-xl mb-4">
            {selectedShape === 'triangle' && (
              <svg className="w-full h-32 mx-auto" viewBox="0 0 100 100">
                <polygon points="50,10 10,90 90,90" fill="var(--primary)" />
              </svg>
            )}
            {selectedShape === 'square' && (
              <svg className="w-full h-32 mx-auto" viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" fill="var(--primary)" />
              </svg>
            )}
            {selectedShape === 'circle' && (
              <svg className="w-full h-32 mx-auto" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="var(--primary)" />
              </svg>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">What is a {selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)}?</h3>
          <p className="text-lg mb-4">
            {info.description}
          </p>
          
          <div className="flex items-center justify-around my-6">
            {selectedShape === 'triangle' && (
              <>
                <div className="text-center">
                  <div className="bg-primary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <p>Sides</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <p>Angles</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <p>Vertices</p>
                </div>
              </>
            )}
            
            {selectedShape === 'square' && (
              <>
                <div className="text-center">
                  <div className="bg-primary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <p>Sides</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <p>Angles</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <p>Vertices</p>
                </div>
              </>
            )}
            
            {selectedShape === 'circle' && (
              <>
                <div className="text-center">
                  <div className="bg-primary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">r</span>
                  </div>
                  <p>Radius</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">d</span>
                  </div>
                  <p>Diameter</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">π</span>
                  </div>
                  <p>Pi</p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="font-bold text-lg mb-2">
            {selectedShape === 'circle' 
              ? 'Important Circle Terms' 
              : `Types of ${selectedShape.charAt(0).toUpperCase() + selectedShape.slice(1)}s`}
          </h3>
          <ul className="space-y-2">
            {info.types.map((type, index) => (
              <li key={index} className="flex items-center">
                <RiCheckboxCircleLine className="text-primary mr-2" />
                <span><strong>{type.name}:</strong> {type.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-secondary text-white p-2 rounded-xl mr-3">
            <RiQuestionLine className="text-xl" />
          </div>
          <h2 className="text-2xl font-bold">Geometry Challenge</h2>
        </div>
        
        <div className="bg-secondary bg-opacity-10 p-4 rounded-xl mb-6">
          <h3 className="font-bold text-lg mb-3">Answer this question:</h3>
          <p className="text-lg mb-4">{info.question}</p>
          
          <div className="space-y-2">
            {info.answers.map((answer, index) => (
              <div 
                key={index}
                className={`bg-white p-3 rounded-lg border-2 cursor-pointer
                  ${selectedAnswer === answer ? 'border-secondary' : 'border-transparent hover:border-secondary'}
                  ${isAnswerChecked && answer === info.correctAnswer ? 'border-success bg-success bg-opacity-10' : ''}
                  ${isAnswerChecked && selectedAnswer === answer && answer !== info.correctAnswer ? 'border-error bg-error bg-opacity-10' : ''}
                `}
                onClick={() => handleAnswerClick(answer)}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center
                      ${selectedAnswer === answer ? 'bg-secondary border-2 border-secondary' : 'border-2 border-gray-300'}
                      ${isAnswerChecked && answer === info.correctAnswer ? 'bg-success border-success' : ''}
                      ${isAnswerChecked && selectedAnswer === answer && answer !== info.correctAnswer ? 'bg-error border-error' : ''}
                    `}
                  >
                    {isAnswerChecked && answer === info.correctAnswer && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-bold">{answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {isAnswerChecked ? (
          <Button 
            className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-xl text-xl font-bold flex items-center justify-center"
            onClick={resetQuiz}
          >
            Try Another Question
          </Button>
        ) : (
          <Button 
            className="w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-xl text-xl font-bold flex items-center justify-center"
            onClick={checkAnswer}
            disabled={!selectedAnswer}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Check Answer
          </Button>
        )}
      </div>
    </>
  );
};

export default GeometryLessons;
