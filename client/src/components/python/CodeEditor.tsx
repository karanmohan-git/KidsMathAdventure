import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RiPlayCircleLine, RiRestartLine, RiQuestionLine } from 'react-icons/ri';
import { useToast } from '@/hooks/use-toast';
import { runPythonCode } from '@/lib/pythonInterpreter';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('# Type your code here!\n# Try drawing a triangle\n\ndraw_triangle(size=100, color="blue")');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      
      // Get the code from the contentEditable div
      const actualCode = editorRef.current?.textContent || code;
      
      // Run the Python code
      const result = await runPythonCode(actualCode);
      
      // Emit a custom event with the result
      const outputEvent = new CustomEvent('python-output', { 
        detail: { 
          result,
          code: actualCode 
        } 
      });
      window.dispatchEvent(outputEvent);
      
      toast({
        title: "Code executed successfully!",
        description: "Check out your drawing below",
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
    setCode('# Type your code here!\n# Try drawing a triangle\n\ndraw_triangle(size=100, color="blue")');
    if (editorRef.current) {
      editorRef.current.textContent = '# Type your code here!\n# Try drawing a triangle\n\ndraw_triangle(size=100, color="blue")';
    }
  };

  const handleShowHelp = () => {
    toast({
      title: "Python Help",
      description: "You can draw shapes using draw_triangle(), draw_square(), or draw_circle() functions",
    });
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setCode(editorRef.current.textContent || '');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Your Python Code</h2>
      <div className="flex space-x-2 mb-3">
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
      <div 
        className="code-editor rounded-xl"
        contentEditable="true"
        spellCheck="false"
        ref={editorRef}
        onInput={handleEditorInput}
        suppressContentEditableWarning={true}
      >
        {code}
      </div>
    </div>
  );
};

export default CodeEditor;
