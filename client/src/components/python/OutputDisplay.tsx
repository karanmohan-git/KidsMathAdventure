import React, { useState, useEffect } from 'react';
import { RiEmotionLaughLine } from 'react-icons/ri';

interface OutputDisplayState {
  shapeType: string;
  size: number;
  color: string;
  showCelebration: boolean;
}

const OutputDisplay: React.FC = () => {
  const [output, setOutput] = useState<OutputDisplayState>({
    shapeType: 'triangle',
    size: 100,
    color: 'blue',
    showCelebration: false,
  });
  
  const [explanation, setExplanation] = useState("Type your code and press 'Run Code' to see what happens!");

  useEffect(() => {
    const handlePythonOutput = (event: CustomEvent<{ result: any, code: string }>) => {
      try {
        const { result, code } = event.detail;
        
        // Parse the output to determine the shape properties
        let shapeType = 'triangle';
        let size = 100;
        let color = 'blue';
        
        if (code.includes('draw_triangle')) {
          shapeType = 'triangle';
          const sizeMatch = code.match(/size=(\d+)/);
          const colorMatch = code.match(/color="([^"]+)"/);
          
          if (sizeMatch && sizeMatch[1]) {
            size = parseInt(sizeMatch[1], 10);
          }
          
          if (colorMatch && colorMatch[1]) {
            color = colorMatch[1];
          }
          
          setExplanation(`You created a ${color} triangle with a size of ${size}. Great job using the draw_triangle function!`);
        } else if (code.includes('draw_square')) {
          shapeType = 'square';
          const sizeMatch = code.match(/size=(\d+)/);
          const colorMatch = code.match(/color="([^"]+)"/);
          
          if (sizeMatch && sizeMatch[1]) {
            size = parseInt(sizeMatch[1], 10);
          }
          
          if (colorMatch && colorMatch[1]) {
            color = colorMatch[1];
          }
          
          setExplanation(`You created a ${color} square with a size of ${size}. Great job using the draw_square function!`);
        } else if (code.includes('draw_circle')) {
          shapeType = 'circle';
          const sizeMatch = code.match(/size=(\d+)/);
          const colorMatch = code.match(/color="([^"]+)"/);
          
          if (sizeMatch && sizeMatch[1]) {
            size = parseInt(sizeMatch[1], 10);
          }
          
          if (colorMatch && colorMatch[1]) {
            color = colorMatch[1];
          }
          
          setExplanation(`You created a ${color} circle with a size of ${size}. Great job using the draw_circle function!`);
        }
        
        setOutput({
          shapeType,
          size,
          color,
          showCelebration: true,
        });
        
        // Hide celebration after 3 seconds
        setTimeout(() => {
          setOutput(prev => ({ ...prev, showCelebration: false }));
        }, 3000);
        
      } catch (error) {
        console.error('Error processing output:', error);
        setExplanation('Something went wrong when trying to run your code. Try again!');
      }
    };

    // Add event listener for python-output event
    window.addEventListener('python-output', handlePythonOutput as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('python-output', handlePythonOutput as EventListener);
    };
  }, []);

  // Render the appropriate shape based on output
  const renderShape = () => {
    const { shapeType, size, color } = output;
    
    switch(shapeType) {
      case 'triangle':
        return (
          <div 
            className="w-0 h-0"
            style={{
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size * 0.866}px solid ${color}`,
            }}
          />
        );
      case 'square':
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
            }}
          />
        );
      case 'circle':
        return (
          <div 
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              borderRadius: '50%',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Drawing</h2>
      <div className="shape-canvas w-full aspect-video rounded-xl relative flex items-center justify-center overflow-hidden">
        {/* Render the shape */}
        {renderShape()}
        
        {/* Celebration effect */}
        {output.showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-success bg-opacity-90 text-white px-6 py-4 rounded-xl text-xl font-bold">
              <div className="flex items-center">
                <RiEmotionLaughLine className="text-3xl mr-2" />
                <span>Great job! You drew a {output.shapeType}!</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 bg-gray-100 p-4 rounded-xl">
        <h3 className="font-bold text-lg mb-2">What happened?</h3>
        <p className="text-base">{explanation}</p>
      </div>
    </div>
  );
};

export default OutputDisplay;
