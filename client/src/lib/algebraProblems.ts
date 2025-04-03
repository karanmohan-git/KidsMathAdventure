export interface Problem {
  id: number;
  level: number;
  firstNumber: number;
  operation: string;
  result: number;
  answer: number;
  hint: string;
  detailedHint: string;
  explanation: string;
  stepByStep: string;
}

// Generate a simple algebra problem for kids
export function generateAlgebraProblem(level: number): Problem {
  if (level === 1) {
    // Level 1: Simple addition and subtraction with missing number
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let firstNumber: number;
    let answer: number;
    let result: number;
    
    if (operation === '+') {
      firstNumber = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = Math.floor(Math.random() * 10) + 1; // 1-10
      result = firstNumber + answer;
    } else {
      result = Math.floor(Math.random() * 10) + 11; // 11-20
      answer = Math.floor(Math.random() * 10) + 1; // 1-10
      firstNumber = result - answer;
    }
    
    let hint: string;
    let detailedHint: string;
    let explanation: string;
    let stepByStep: string;
    
    if (operation === '+') {
      hint = `To find the missing number, think about what number you need to add to ${firstNumber} to get ${result}.`;
      detailedHint = `Try counting up from ${firstNumber} until you reach ${result}.`;
      explanation = `When we see an equation like ${firstNumber} + x = ${result}, we're looking for what number (x) we need to add to ${firstNumber} to get ${result}.`;
      stepByStep = `Start with ${firstNumber} and count up until you reach ${result}. The number of steps you take is the answer: ${answer}.`;
    } else {
      hint = `To find the missing number, think about what number you need to subtract from ${firstNumber} to get ${result}.`;
      detailedHint = `Try counting down from ${firstNumber} until you reach ${result}.`;
      explanation = `When we see an equation like ${firstNumber} - x = ${result}, we're looking for what number (x) we need to subtract from ${firstNumber} to get ${result}.`;
      stepByStep = `Start with ${firstNumber} and count down until you reach ${result}. The number of steps you take is the answer: ${answer}.`;
    }
    
    return {
      id: Math.floor(Math.random() * 1000),
      level,
      firstNumber,
      operation,
      result,
      answer,
      hint,
      detailedHint,
      explanation,
      stepByStep,
    };
  } else {
    // Default to level 1 if other levels aren't implemented yet
    return generateAlgebraProblem(1);
  }
}
