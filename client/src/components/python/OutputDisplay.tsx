import React, { useState, useEffect } from 'react';
import { RiEmotionLaughLine, RiTerminalBoxLine } from 'react-icons/ri';

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
  const [printOutput, setPrintOutput] = useState<string[]>([]);
  const [showShape, setShowShape] = useState(false);

  useEffect(() => {
    const handlePythonOutput = (event: CustomEvent<{ result: any, code: string }>) => {
      try {
        console.log("Received Python output:", event.detail);
        const { result, code } = event.detail;
        
        // Check if we have print statements in the code
        const hasPrintStatements = code.includes('print(');
        
        // Process print statements result if it exists
        if (result && result.result && typeof result.result === 'string') {
          // Split by newline and filter out empty lines
          const outputLines = result.result.split('\n').filter(Boolean);
          console.log("Output lines:", outputLines);
          setPrintOutput(outputLines);
          
          // Always show print output if it exists
          if (outputLines.length > 0) {
            setExplanation(`Great job! You used print() to show text in the output.`);
          }
        } else {
          // Make sure to clear print output if there's none
          setPrintOutput([]);
        }
        
        // Process shape drawing if it exists
        let shapeType = 'triangle';
        let size = 100;
        let color = 'blue';
        let drewShape = false;
        
        // Check if we have shape properties from Pyodide
        if (result && result.shapeProperties) {
          const props = result.shapeProperties;
          console.log("Shape properties:", props);
          
          if (props.type) {
            shapeType = props.type;
            drewShape = true;
            
            if (props.size) {
              size = parseInt(props.size, 10);
            }
            
            if (props.color) {
              color = props.color;
            }
          }
        }
        
        // Fallback to regex matching if needed
        if (!drewShape) {
          if (code.includes('draw_triangle')) {
            shapeType = 'triangle';
            drewShape = true;
            const sizeMatch = code.match(/size=(\d+)/);
            const colorMatch = code.match(/color="([^"]+)"/);
            
            if (sizeMatch && sizeMatch[1]) {
              size = parseInt(sizeMatch[1], 10);
            }
            
            if (colorMatch && colorMatch[1]) {
              color = colorMatch[1];
            }
            
            setExplanation(`You created a ${color} triangle with a size of ${size}. Great job!`);
          } else if (code.includes('draw_square')) {
            shapeType = 'square';
            drewShape = true;
            const sizeMatch = code.match(/size=(\d+)/);
            const colorMatch = code.match(/color="([^"]+)"/);
            
            if (sizeMatch && sizeMatch[1]) {
              size = parseInt(sizeMatch[1], 10);
            }
            
            if (colorMatch && colorMatch[1]) {
              color = colorMatch[1];
            }
            
            setExplanation(`You created a ${color} square with a size of ${size}. Great job!`);
          } else if (code.includes('draw_circle')) {
            shapeType = 'circle';
            drewShape = true;
            const sizeMatch = code.match(/size=(\d+)/);
            const colorMatch = code.match(/color="([^"]+)"/);
            
            if (sizeMatch && sizeMatch[1]) {
              size = parseInt(sizeMatch[1], 10);
            }
            
            if (colorMatch && colorMatch[1]) {
              color = colorMatch[1];
            }
            
            setExplanation(`You created a ${color} circle with a size of ${size}. Great job!`);
          } else if (!hasPrintStatements && (code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/'))) {
            setExplanation(`Great job using math in Python! You can see the results in the output.`);
          } else if (!hasPrintStatements) {
            setExplanation(`You ran your code successfully!`);
          }
        }
        
        // If we have a shape, show it
        setShowShape(drewShape);
        
        if (drewShape) {
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
        }
        
      } catch (error) {
        console.error('Error processing output:', error);
        setExplanation('Something went wrong when trying to run your code. Try again!');
        setPrintOutput(['Error: Check your code for mistakes']);
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
      <h2 className="text-2xl font-bold mb-4">Your Output</h2>
      
      {printOutput.length > 0 && (
        <div className="mb-4 bg-slate-800 text-white p-4 rounded-lg font-mono text-sm overflow-auto">
          <div className="flex items-center mb-2 text-slate-400 border-b border-slate-700 pb-1">
            <RiTerminalBoxLine className="mr-2" />
            <span>Program Output</span>
          </div>
          {printOutput.map((line, index) => (
            <div key={index} className="py-1">
              {line}
            </div>
          ))}
        </div>
      )}
      
      {showShape && (
        <div className="shape-canvas w-full aspect-video rounded-xl relative flex items-center justify-center overflow-hidden mb-4">
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
      )}
      
      <div className={`${!showShape && printOutput.length === 0 ? "mt-0" : "mt-4"} bg-gray-100 p-4 rounded-xl`}>
        <h3 className="font-bold text-lg mb-2">What happened?</h3>
        <p className="text-base">{explanation}</p>
      </div>
    </div>
  );
};

export default OutputDisplay;
