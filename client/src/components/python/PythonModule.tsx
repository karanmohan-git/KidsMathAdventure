import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputDisplay from './OutputDisplay';
import { RiCheckLine, RiArrowRightLine, RiLockLine, RiLightbulbFlashLine, RiArrowRightCircleLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const lessonExamples = {
  basics: '# This is a comment - the computer ignores it!\n\n# Try printing something\nprint("Hello, I am coding in Python!")\n\n# Variables store information\nmy_name = "Coder"\nprint("My name is", my_name)',
  
  math: '# Python can do math!\n\n# Addition\nprint(2 + 3)  # This equals 5\n\n# Subtraction\nprint(10 - 4)  # This equals 6\n\n# Multiplication\nprint(5 * 3)  # This equals 15\n\n# Division\nprint(20 / 5)  # This equals 4',
  
  shapes: '# Let\'s draw some colorful shapes!\n\n# Try a triangle\ndraw_triangle(size=100, color="blue")\n\n# You can also draw other shapes\n# Uncomment these lines (remove the #) to try them\n\n# draw_square(size=80, color="red")\n# draw_circle(size=120, color="green")',
};

const PythonModule: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<'basics' | 'math' | 'shapes'>('basics');

  const loadExample = (exampleType: 'basics' | 'math' | 'shapes') => {
    setCurrentLesson(exampleType);
    // We will dispatch a custom event to update the code editor
    const loadExampleEvent = new CustomEvent('load-python-example', { 
      detail: { code: lessonExamples[exampleType] } 
    });
    window.dispatchEvent(loadExampleEvent);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column: Lessons and Guidance */}
      <div className="w-full md:w-2/5">
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-3">1</div>
            <h2 className="text-2xl font-bold">Your Python Adventure</h2>
          </div>
          <p className="text-lg mb-4">Let's learn to code with Python! Choose a lesson below:</p>
          
          <Tabs defaultValue="basics" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="basics" 
                className="flex items-center justify-center"
                onClick={() => loadExample('basics')}
              >
                Basics
              </TabsTrigger>
              <TabsTrigger 
                value="math" 
                className="flex items-center justify-center"
                onClick={() => loadExample('math')}
              >
                Math
              </TabsTrigger>
              <TabsTrigger 
                value="shapes" 
                className="flex items-center justify-center"
                onClick={() => loadExample('shapes')}
              >
                Shapes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Python Basics</h3>
                <p>Learn how to write your first Python code! In this lesson:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Write comments with <code className="bg-gray-100 px-1 rounded">#</code></li>
                  <li>Print messages with <code className="bg-gray-100 px-1 rounded">print()</code></li>
                  <li>Create variables with <code className="bg-gray-100 px-1 rounded">name = value</code></li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="math" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Python Math</h3>
                <p>Python can solve math problems! Try these operations:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Addition: <code className="bg-gray-100 px-1 rounded">2 + 2</code></li>
                  <li>Subtraction: <code className="bg-gray-100 px-1 rounded">10 - 5</code></li>
                  <li>Multiplication: <code className="bg-gray-100 px-1 rounded">3 * 4</code></li>
                  <li>Division: <code className="bg-gray-100 px-1 rounded">15 / 3</code></li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="shapes" className="mt-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Drawing Shapes</h3>
                <p>Create colorful shapes with Python commands:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><code className="bg-gray-100 px-1 rounded">draw_triangle(size=100, color="blue")</code></li>
                  <li><code className="bg-gray-100 px-1 rounded">draw_square(size=80, color="red")</code></li>
                  <li><code className="bg-gray-100 px-1 rounded">draw_circle(size=120, color="green")</code></li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-accent bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-accent">Try It Yourself!</h3>
            <p className="mb-2">Click on a lesson above and try the examples in the code editor.</p>
            <p>Change some values and see what happens!</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiLightbulbFlashLine className="text-warning mr-2 text-2xl" />
            Did You Know?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span>Python was created in 1991 by Guido van Rossum</span>
            </li>
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span>Python is named after the comedy show "Monty Python"</span>
            </li>
            <li className="flex items-start">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <span>It's used by scientists, game developers, and websites!</span>
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
