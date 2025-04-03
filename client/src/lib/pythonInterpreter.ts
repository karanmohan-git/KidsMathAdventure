/**
 * Python Interpreter Module
 * 
 * This module provides in-browser Python execution capabilities using Pyodide,
 * a WebAssembly-based Python interpreter. It enables young children to write and 
 * execute real Python code directly in the browser with immediate visual feedback.
 * 
 * The implementation focuses on providing a simplified, kid-friendly Python 
 * environment with custom drawing functions designed for 6-8 year old users.
 */

/** The Pyodide instance once loaded */
let pyodide: any = null;
/** Flag to track if Pyodide is currently loading */
let isLoading = false;
/** Promise that resolves when Pyodide finishes loading */
let loadingPromise: Promise<any> | null = null;

/**
 * Initializes the Pyodide Python interpreter and sets up the environment
 * 
 * This function:
 * 1. Dynamically loads the Pyodide JavaScript library
 * 2. Initializes the Python environment
 * 3. Loads necessary Python packages (matplotlib)
 * 4. Defines kid-friendly drawing functions for shapes
 * 
 * @returns A promise that resolves to the initialized Pyodide instance
 */
export async function loadPyodide() {
  // Return existing instance if already loaded
  if (pyodide) {
    return pyodide;
  }
  
  // Return existing promise if already loading
  if (loadingPromise) {
    return loadingPromise;
  }
  
  isLoading = true;
  
  loadingPromise = new Promise(async (resolve, reject) => {
    try {
      // Load Pyodide script dynamically
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
      document.head.appendChild(pyodideScript);
      
      // Wait for the script to load
      await new Promise<void>((resolveScript) => {
        pyodideScript.onload = () => resolveScript();
      });
      
      // Initialize Pyodide
      // @ts-ignore - Pyodide attaches to window object
      pyodide = await window.loadPyodide();
      
      // Load matplotlib package for potential visualization
      await pyodide.loadPackage("matplotlib");
      
      // Set up simplified drawing functions designed for young children
      // These functions are easier to use than raw matplotlib and provide
      // instant visual feedback for basic shape creation
      await pyodide.runPythonAsync(`
        import js
        import matplotlib.pyplot as plt
        from io import BytesIO
        import base64
        import math
        
        # Global variables to store shape properties for visualization
        current_shape = None
        shape_properties = {'type': None, 'color': None, 'size': None}
        
        # Kid-friendly function to draw a triangle
        def draw_triangle(size=100, color="blue"):
            global current_shape, shape_properties
            shape_properties = {'type': 'triangle', 'color': color, 'size': size}
            return f"Drew a {color} triangle with size {size}"
        
        # Kid-friendly function to draw a square
        def draw_square(size=100, color="red"):
            global current_shape, shape_properties
            shape_properties = {'type': 'square', 'color': color, 'size': size}
            return f"Drew a {color} square with size {size}"
        
        # Kid-friendly function to draw a circle
        def draw_circle(size=100, color="green"):
            global current_shape, shape_properties
            shape_properties = {'type': 'circle', 'color': color, 'size': size}
            return f"Drew a {color} circle with size {size}"
        
        # Helper function to retrieve shape properties for visualization
        def get_shape_properties():
            return shape_properties
      `);
      
      isLoading = false;
      resolve(pyodide);
    } catch (error) {
      isLoading = false;
      loadingPromise = null;
      reject(error);
    }
  });
  
  return loadingPromise;
}

/**
 * Executes Python code provided by the user and returns the results
 * 
 * This function:
 * 1. Ensures Pyodide is loaded
 * 2. Runs the user's Python code
 * 3. Retrieves any shape properties for visualization
 * 4. Handles and reports errors in a kid-friendly way
 * 
 * @param code - The Python code string to execute
 * @returns A promise containing the execution result and any shape properties
 */
export async function runPythonCode(code: string): Promise<any> {
  try {
    // Ensure Pyodide is loaded before executing code
    if (!pyodide) {
      pyodide = await loadPyodide();
    }
    
    // Execute the user's Python code
    const result = await pyodide.runPythonAsync(code);
    
    // Retrieve any shape properties for visualization
    const shapeProperties = await pyodide.runPythonAsync('get_shape_properties()');
    
    // Return both the execution result and shape properties
    return {
      result,
      shapeProperties: shapeProperties.toJs(),
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Python execution error:', error);
    // Re-throw to allow the UI to handle the error appropriately
    throw error;
  }
}
