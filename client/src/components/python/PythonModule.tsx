import React from 'react';
import CodeEditor from './CodeEditor';
import OutputDisplay from './OutputDisplay';
import { RiCheckLine, RiArrowRightLine, RiLockLine, RiLightbulbFlashLine, RiArrowRightCircleLine } from 'react-icons/ri';

const PythonModule: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column: Lessons and Guidance */}
      <div className="w-full md:w-2/5">
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">1</div>
            <h2 className="text-2xl font-bold">Your Python Adventure</h2>
          </div>
          <p className="text-lg mb-4">Let's learn to make the computer draw shapes using Python code!</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="bg-success bg-opacity-20 rounded-full p-2 mr-3 mt-1">
                <RiCheckLine className="text-success" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Step 1: Variables</h3>
                <p>We've learned how to create variables!</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary bg-opacity-20 rounded-full p-2 mr-3 mt-1">
                <RiArrowRightLine className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Step 2: Drawing Shapes</h3>
                <p>Now let's use code to draw shapes on the screen.</p>
              </div>
            </div>
            
            <div className="flex items-start opacity-60">
              <div className="bg-gray-200 rounded-full p-2 mr-3 mt-1">
                <RiLockLine className="text-gray-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Step 3: Moving Shapes</h3>
                <p>Soon we'll learn to move our shapes around!</p>
              </div>
            </div>
          </div>
          
          <div className="bg-accent bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-accent">Draw a Triangle</h3>
            <p className="mb-2">Try using these commands:</p>
            <pre className="bg-white p-3 rounded-lg text-sm mb-2">
draw_triangle(size=100, color="blue")
            </pre>
            <p>You can change the <strong>size</strong> and <strong>color</strong>!</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiLightbulbFlashLine className="text-warning mr-2 text-2xl" />
            Helpful Tips
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1" />
              <span>Use <code className="bg-gray-100 px-1 rounded">draw_triangle()</code> to create a triangle</span>
            </li>
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1" />
              <span>Colors can be: "red", "blue", "green", "yellow", "purple"</span>
            </li>
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1" />
              <span>Size can be any number from 50 to 200</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right Column: Code Editor and Output */}
      <div className="w-full md:w-3/5">
        <CodeEditor />
        <OutputDisplay />
      </div>
    </div>
  );
};

export default PythonModule;
