import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RiPlayCircleLine, RiRestartLine, RiQuestionLine } from 'react-icons/ri';
import { useToast } from '@/hooks/use-toast';
import { runPythonCode } from '@/lib/pythonInterpreter';
import { Textarea } from '@/components/ui/textarea';

const initialCode = '# This is a comment - the computer ignores it!\n\n# Try printing something\nprint("Hello, I am coding in Python!")\n\n# Variables store information\nmy_name = "Coder"\nprint("My name is", my_name)';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea on initial render
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Listen for example code loading events
  useEffect(() => {
    const handleLoadExample = (event: CustomEvent<{ code: string }>) => {
      setCode(event.detail.code);
    };

    window.addEventListener('load-python-example', handleLoadExample as EventListener);
    
    return () => {
      window.removeEventListener('load-python-example', handleLoadExample as EventListener);
    };
  }, []);

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      
      // Run the Python code
      const result = await runPythonCode(code);
      
      // Emit a custom event with the result
      const outputEvent = new CustomEvent('python-output', { 
        detail: { 
          result,
          code: code 
        } 
      });
      window.dispatchEvent(outputEvent);
      
      toast({
        title: "Great job! 🎉",
        description: "Check out what your code did below!",
      });
    } catch (error) {
      console.error('Error running code:', error);
      // Handle error and show a child-friendly error message
      toast({
        title: "Oops! Something went wrong",
        description: "Check if your code has any mistakes",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetCode = () => {
    setCode(initialCode);
  };

  const handleShowHelp = () => {
    toast({
      title: "Python Help",
      description: "You can draw shapes using draw_triangle(), draw_square(), or draw_circle() functions. Try math operations like 2 + 2 or 5 * 3!",
      duration: 5000,
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Python Code</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        <Button 
          className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm font-bold"
          onClick={handleRunCode}
          disabled={isRunning}
        >
          <RiPlayCircleLine className="mr-1" /> Run Code
        </Button>
        <Button 
          className="bg-gray-200 hover:bg-gray-300 text-slate-800 px-4 py-2 rounded-lg text-sm font-bold"
          onClick={handleResetCode}
        >
          <RiRestartLine className="mr-1" /> Reset
        </Button>
        <Button 
          className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm font-bold"
          onClick={handleShowHelp}
        >
          <RiQuestionLine className="mr-1" /> Help
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-editor font-mono text-base min-h-[250px]"
        spellCheck="false"
        placeholder="# Type your Python code here"
      />
      <p className="text-sm text-gray-500 mt-2">Type your code above and click "Run Code" to see what happens!</p>
    </div>
  );
};

export default CodeEditor;
