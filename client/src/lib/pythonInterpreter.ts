// This file implements a Python interpreter using Pyodide

let pyodide: any = null;
let isLoading = false;
let loadingPromise: Promise<any> | null = null;

// Initialize Pyodide and load the required packages
export async function loadPyodide() {
  if (pyodide) {
    return pyodide;
  }
  
  if (loadingPromise) {
    return loadingPromise;
  }
  
  isLoading = true;
  
  loadingPromise = new Promise(async (resolve, reject) => {
    try {
      // Load Pyodide script
      const pyodideScript = document.createElement('script');
      pyodideScript.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
      document.head.appendChild(pyodideScript);
      
      // Wait for the script to load
      await new Promise<void>((resolveScript) => {
        pyodideScript.onload = () => resolveScript();
      });
      
      // Initialize Pyodide
      // @ts-ignore
      pyodide = await window.loadPyodide();
      
      // Load matplotlib package
      await pyodide.loadPackage("matplotlib");
      
      // Set up our simplified drawing functions for kids
      await pyodide.runPythonAsync(`
        import js
        import matplotlib.pyplot as plt
        from io import BytesIO
        import base64
        import math
        
        # Global variables to store shape properties
        current_shape = None
        shape_properties = {'type': None, 'color': None, 'size': None}
        
        def draw_triangle(size=100, color="blue"):
            global current_shape, shape_properties
            shape_properties = {'type': 'triangle', 'color': color, 'size': size}
            return f"Drew a {color} triangle with size {size}"
        
        def draw_square(size=100, color="red"):
            global current_shape, shape_properties
            shape_properties = {'type': 'square', 'color': color, 'size': size}
            return f"Drew a {color} square with size {size}"
        
        def draw_circle(size=100, color="green"):
            global current_shape, shape_properties
            shape_properties = {'type': 'circle', 'color': color, 'size': size}
            return f"Drew a {color} circle with size {size}"
        
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

// Execute Python code and return the result
export async function runPythonCode(code: string): Promise<any> {
  try {
    if (!pyodide) {
      pyodide = await loadPyodide();
    }
    
    // Run the user's code
    const result = await pyodide.runPythonAsync(code);
    
    // Get the properties of the drawn shape
    const shapeProperties = await pyodide.runPythonAsync('get_shape_properties()');
    
    return {
      result,
      shapeProperties: shapeProperties.toJs(),
    };
  } catch (error) {
    console.error('Python execution error:', error);
    throw error;
  }
}
