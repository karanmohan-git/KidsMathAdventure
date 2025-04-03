import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RiQuestionLine, RiCheckboxCircleLine } from 'react-icons/ri';

// Helper function to generate polygon points
const generatePolygonPoints = (sides: number, centerX: number, centerY: number, radius: number) => {
  const points: string[] = [];
  
  for (let i = 0; i < sides; i++) {
    // Calculate the angle for this vertex
    const angle = (i * 2 * Math.PI / sides) - Math.PI / 2; // Start from top
    
    // Calculate X and Y coordinates
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    points.push(`${x},${y}`);
  }
  
  return points.join(' ');
};

type Shape = 'triangle' | 'square' | 'circle';

interface GeometryLessonsProps {
  selectedShape: Shape;
  numSides?: number; // Add numSides as an optional prop
}

const GeometryLessons: React.FC<GeometryLessonsProps> = ({ selectedShape, numSides = 4 }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  
  // Create multiple geometry questions for each shape
  const triangleQuestions = [
    {
      question: 'What is the name of a triangle where all sides are equal?',
      answers: [
        'Scalene Triangle',
        'Isosceles Triangle',
        'Equilateral Triangle',
        'Right Triangle'
      ],
      correctAnswer: 'Equilateral Triangle'
    },
    {
      question: 'How many vertices does a triangle have?',
      answers: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: '3'
    },
    {
      question: 'What is the sum of all angles in a triangle?',
      answers: [
        '90 degrees',
        '180 degrees',
        '270 degrees',
        '360 degrees'
      ],
      correctAnswer: '180 degrees'
    },
    {
      question: 'Which of these is not a type of triangle?',
      answers: [
        'Equilateral',
        'Isosceles',
        'Scalene',
        'Hexagonal'
      ],
      correctAnswer: 'Hexagonal'
    },
    {
      question: 'A triangle with one angle that is 90 degrees is called a...',
      answers: [
        'Right triangle',
        'Acute triangle',
        'Obtuse triangle',
        'Straight triangle'
      ],
      correctAnswer: 'Right triangle'
    }
  ];

  const squareQuestions = [
    {
      question: 'What is special about the angles in a square?',
      answers: [
        'They are all 60 degrees',
        'They are all 90 degrees',
        'They are all 45 degrees',
        'They add up to 180 degrees'
      ],
      correctAnswer: 'They are all 90 degrees'
    },
    {
      question: 'How many sides does a square have?',
      answers: [
        '3',
        '4',
        '5',
        '6'
      ],
      correctAnswer: '4'
    },
    {
      question: 'What shape is a square with unequal sides?',
      answers: [
        'Triangle',
        'Rectangle',
        'Circle',
        'Pentagon'
      ],
      correctAnswer: 'Rectangle'
    },
    {
      question: 'How do you find the area of a square?',
      answers: [
        'side + side',
        'side × 4',
        'side × side',
        'side ÷ 2'
      ],
      correctAnswer: 'side × side'
    },
    {
      question: 'What is a square with 5 sides called?',
      answers: [
        'Pentagon',
        'Hexagon',
        'Octagon',
        'Decagon'
      ],
      correctAnswer: 'Pentagon'
    }
  ];

  const circleQuestions = [
    {
      question: 'What is the name for the distance around a circle?',
      answers: [
        'Radius',
        'Diameter',
        'Circumference',
        'Perimeter'
      ],
      correctAnswer: 'Circumference'
    },
    {
      question: 'The distance from the center to any point on a circle is called the...',
      answers: [
        'Diameter',
        'Radius',
        'Circumference',
        'Arc'
      ],
      correctAnswer: 'Radius'
    },
    {
      question: 'What is the value of π (pi) rounded to the nearest whole number?',
      answers: [
        '2',
        '3',
        '4',
        '5'
      ],
      correctAnswer: '3'
    },
    {
      question: 'What is the distance across a circle through its center called?',
      answers: [
        'Radius',
        'Diameter',
        'Circumference',
        'Chord'
      ],
      correctAnswer: 'Diameter'
    },
    {
      question: 'How many corners does a circle have?',
      answers: [
        '0',
        '1',
        '2',
        'Infinite'
      ],
      correctAnswer: '0'
    }
  ];

  // Get a random question for the current shape
  const getRandomQuestion = (shape: Shape) => {
    const questionBank = 
      shape === 'triangle' ? triangleQuestions :
      shape === 'square' ? squareQuestions :
      circleQuestions;
    
    // Get a random index between 0 and the length of the question bank
    const randomIndex = Math.floor(Math.random() * questionBank.length);
    return questionBank[randomIndex];
  };

  // Generate a random question when resetting
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestion(selectedShape));

  // Update current question when shape changes
  React.useEffect(() => {
    setCurrentQuestion(getRandomQuestion(selectedShape));
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  }, [selectedShape]);

  // Helper function to get polygon names
  const getPolygonName = (sides: number) => {
    const polygonNames: {[key: number]: string} = {
      3: 'Triangle',
      4: 'Square',
      5: 'Pentagon',
      6: 'Hexagon',
      7: 'Heptagon',
      8: 'Octagon',
      9: 'Nonagon',
      10: 'Decagon'
    };
    return polygonNames[sides] || `${sides}-sided Polygon`;
  };

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
          question: currentQuestion.question,
          answers: currentQuestion.answers,
          correctAnswer: currentQuestion.correctAnswer
        };
      case 'square':
        // Handle polygon information based on numSides
        if (numSides > 4) {
          const polygonName = getPolygonName(numSides);
          const angleSum = (numSides - 2) * 180;
          const interiorAngle = angleSum / numSides;
          
          return {
            title: `All About ${polygonName}s`,
            description: `A ${polygonName.toLowerCase()} is a polygon with ${numSides} sides and ${numSides} angles. Regular ${polygonName.toLowerCase()}s have all sides and angles equal.`,
            types: [
              { name: 'Regular', desc: `All ${numSides} sides and angles are equal` },
              { name: 'Interior Angle', desc: `Each angle is ${Math.round(interiorAngle)}° in a regular ${polygonName.toLowerCase()}` },
              { name: 'Angle Sum', desc: `The sum of all angles is ${angleSum}°` }
            ],
            question: currentQuestion.question,
            answers: currentQuestion.answers,
            correctAnswer: currentQuestion.correctAnswer
          };
        } else {
          return {
            title: 'All About Squares',
            description: 'A square is a special type of rectangle where all four sides have the same length. It has four right angles (90 degrees).',
            types: [
              { name: 'Square', desc: 'All sides equal, all angles 90°' },
              { name: 'Rectangle', desc: 'Opposite sides equal, all angles 90°' },
              { name: 'Rhombus', desc: 'All sides equal, opposite angles equal' }
            ],
            question: currentQuestion.question,
            answers: currentQuestion.answers,
            correctAnswer: currentQuestion.correctAnswer
          };
        }
      case 'circle':
        return {
          title: 'All About Circles',
          description: 'A circle is a round shape where all points on the edge are the same distance from the center. This distance is called the radius.',
          types: [
            { name: 'Radius', desc: 'The distance from center to edge' },
            { name: 'Diameter', desc: 'The distance across the circle through the center' },
            { name: 'Circumference', desc: 'The distance around the circle' }
          ],
          question: currentQuestion.question,
          answers: currentQuestion.answers,
          correctAnswer: currentQuestion.correctAnswer
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
    // Get a new random question
    setCurrentQuestion(getRandomQuestion(selectedShape));
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
                {numSides === 4 ? (
                  // Regular square
                  <rect x="20" y="20" width="60" height="60" fill="var(--primary)" />
                ) : (
                  // Generate a polygon with the specified number of sides
                  <polygon 
                    points={generatePolygonPoints(numSides, 50, 50, 40)} 
                    fill="var(--primary)" 
                  />
                )}
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
                    <span className="font-bold">{numSides}</span>
                  </div>
                  <p>Sides</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">{numSides}</span>
                  </div>
                  <p>Angles</p>
                </div>
                <div className="text-center">
                  <div className="bg-accent bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="font-bold">{numSides}</span>
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
