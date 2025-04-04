/**
 * Python Module Component
 * 
 * This component provides an interactive Python learning experience for children.
 * It includes a code editor, output display, and educational lessons that introduce
 * programming concepts in an age-appropriate way for 6-8 year old learners.
 */
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputDisplay from './OutputDisplay';
import { RiCheckLine, RiArrowRightLine, RiLockLine, RiLightbulbFlashLine, RiArrowRightCircleLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Pre-written code examples for different Python lessons
 * 
 * Each example is designed to be simple enough for young children to understand,
 * while introducing fundamental programming concepts:
 * - basics: Introduces comments, print statements, and variables
 * - math: Shows how Python can be used for basic mathematical operations
 * - shapes: Demonstrates visual output with shape-drawing functions
 */
const lessonExamples = {
  basics: '# This is a comment - the computer ignores it!\n\n# Try printing something\nprint("Hello, I am coding in Python!")\n\n# Variables store information\nmy_name = "Coder"\nprint("My name is", my_name)',
  
  math: '# Python can do math!\n\n# Addition\nprint(2 + 3)  # This equals 5\n\n# Subtraction\nprint(10 - 4)  # This equals 6\n\n# Multiplication\nprint(5 * 3)  # This equals 15\n\n# Division\nprint(20 / 5)  # This equals 4',
  
  shapes: '# Let\'s draw some colorful shapes!\n\n# Try a triangle\ndraw_triangle(size=100, color="blue")\n\n# You can also draw other shapes\n# Uncomment these lines (remove the #) to try them\n\n# draw_square(size=80, color="red")\n# draw_circle(size=120, color="green")',
  
  game: '# Small Number Guessing Game\n\n# The secret number\nsecret = 7\n\n# Ask the player to guess\nprint("I\'m thinking of a number between 1 and 10")\nprint("Can you guess what it is?")\n\n# Check their guess\nguess = 7  # Change this number to make a guess!\n\nprint("You guessed:", guess)\n\nif guess == secret:\n    print("You got it right! Great job!")\nelse:\n    print("Not quite. Try again!")',
  
  story: '# Let\'s tell a story with Python!\n\n# Create character information\ncharacter_name = "Alex"\ncharacter_age = 7\nfavorite_color = "purple"\npet_type = "robot dog"\npet_name = "Sparky"\n\n# Tell the story using variables\nprint("Once upon a time, there was a kid named", character_name)\nprint(character_name, "was", character_age, "years old.")\nprint("Their favorite color was", favorite_color + ".")\nprint("They had a special pet - a", pet_type, "named", pet_name + "!")\nprint(character_name, "and", pet_name, "had many adventures together.")\n\n# Change the variables above to create your own story!',
  
  animation: '# Simple Animation\n\n# Let\'s create a growing circle\nfor size in range(10, 150, 20):\n    print("Drawing a circle with size", size)\n    draw_circle(size=size, color="green")\n    \n# Now let\'s switch colors\ncolors = ["red", "orange", "yellow", "green", "blue", "purple"]\n\nfor color in colors:\n    print("Drawing a triangle with color", color)\n    draw_triangle(size=100, color=color)',
};

/**
 * PythonModule Component
 * 
 * The main component for the Python learning experience. It provides:
 * 1. An interactive code editor where children can write and modify Python code
 * 2. A visual output display showing the results of their code execution
 * 3. Age-appropriate lessons with examples and instructions
 * 4. Educational facts about Python to spark interest
 */
const PythonModule: React.FC = () => {
  // Track which lesson is currently active
  const [currentLesson, setCurrentLesson] = useState<'basics' | 'math' | 'shapes' | 'game' | 'story' | 'animation'>('basics');

  /**
   * Loads a selected code example into the editor
   * Uses custom events to communicate between components without requiring direct props
   * 
   * @param exampleType - The type of example to load (any of the keys in lessonExamples)
   */
  const loadExample = (exampleType: keyof typeof lessonExamples) => {
    setCurrentLesson(exampleType);
    // Dispatch a custom event to update the code editor with the selected example
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
        
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiLightbulbFlashLine className="text-warning mr-2 text-2xl" />
            Cool Python Projects
          </h2>
          <p className="mb-3">Try these fun Python projects - click a card to load the code:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div 
              className={`bg-gray-100 hover:bg-primary hover:bg-opacity-10 p-3 rounded-xl cursor-pointer transition-all ${currentLesson === 'game' ? 'border-2 border-primary' : ''}`}
              onClick={() => loadExample('game')}
            >
              <h3 className="font-bold text-primary">Number Guessing Game</h3>
              <p className="text-sm">Create a simple guessing game that gives feedback!</p>
            </div>
            
            <div 
              className={`bg-gray-100 hover:bg-primary hover:bg-opacity-10 p-3 rounded-xl cursor-pointer transition-all ${currentLesson === 'story' ? 'border-2 border-primary' : ''}`}
              onClick={() => loadExample('story')}
            >
              <h3 className="font-bold text-primary">Story Generator</h3>
              <p className="text-sm">Make a story using variables that you can change!</p>
            </div>
            
            <div 
              className={`bg-gray-100 hover:bg-primary hover:bg-opacity-10 p-3 rounded-xl cursor-pointer transition-all ${currentLesson === 'animation' ? 'border-2 border-primary' : ''}`}
              onClick={() => loadExample('animation')}
            >
              <h3 className="font-bold text-primary">Simple Animation</h3>
              <p className="text-sm">Use loops to create colorful animations!</p>
            </div>
            
            <div 
              className={`bg-gray-100 hover:bg-primary hover:bg-opacity-10 p-3 rounded-xl cursor-pointer transition-all ${currentLesson === 'shapes' ? 'border-2 border-primary' : ''}`}
              onClick={() => loadExample('shapes')}
            >
              <h3 className="font-bold text-primary">Shape Creator</h3>
              <p className="text-sm">Draw colorful shapes with code!</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <RiLightbulbFlashLine className="text-warning mr-2 text-2xl" />
            Learn More Python
          </h2>
          <p className="mb-3">Want to keep learning? Check out these kid-friendly Python resources:</p>
          
          <ul className="space-y-3">
            <li className="flex items-start bg-gray-50 p-3 rounded-lg">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <div>
                <a href="https://code.org/python" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Code.org Python</a>
                <p className="text-sm">Fun blocks-to-text Python lessons with fun characters!</p>
              </div>
            </li>
            
            <li className="flex items-start bg-gray-50 p-3 rounded-lg">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <div>
                <a href="https://www.codingkids.com.au/coding-kids-classes/python-for-kids/" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Coding Kids - Python</a>
                <p className="text-sm">Python courses specifically designed for kids!</p>
              </div>
            </li>
            
            <li className="flex items-start bg-gray-50 p-3 rounded-lg">
              <RiArrowRightCircleLine className="text-primary mr-2 mt-1 flex-shrink-0" />
              <div>
                <a href="https://trinket.io/python" target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline">Trinket.io Python</a>
                <p className="text-sm">Interactive Python learning with turtle graphics!</p>
              </div>
            </li>
          </ul>
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
