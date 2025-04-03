import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { GeometryProperties } from '@/lib/geometryCalculations';

type Shape = 'triangle' | 'square' | 'circle';

interface ShapeExplorerProps {
  selectedShape: Shape;
  setSelectedShape: (shape: Shape) => void;
  shapeSize: number;
  setShapeSize: (size: number) => void;
  sideLength: number;
  setSideLength: (length: number) => void;
  angle: number;
  setAngle: (angle: number) => void;
  angleA: number;
  setAngleA: (angle: number) => void;
  angleB: number;
  setAngleB: (angle: number) => void;
  angleC: number;
  setAngleC: (angle: number) => void;
  shapeColor: string;
  setShapeColor: (color: string) => void;
  numSides: number;
  setNumSides: (sides: number) => void;
  width: number;
  setWidth: (width: number) => void;
  height: number;
  setHeight: (height: number) => void;
  properties: GeometryProperties;
}

const ShapeExplorer: React.FC<ShapeExplorerProps> = ({
  selectedShape,
  setSelectedShape,
  shapeSize,
  setShapeSize,
  sideLength,
  setSideLength,
  angle,
  setAngle,
  angleA,
  setAngleA,
  angleB,
  setAngleB,
  angleC,
  setAngleC,
  shapeColor,
  setShapeColor,
  numSides,
  setNumSides,
  width,
  setWidth,
  height,
  setHeight,
  properties
}) => {
  const renderShape = () => {
    // Helper function to generate a polygon SVG path
    const generatePolygonPath = (sides: number, size: number) => {
      const points = [];
      const angleStep = (Math.PI * 2) / sides;
      
      for (let i = 0; i < sides; i++) {
        const x = size + size * Math.cos(i * angleStep - Math.PI / 2);
        const y = size + size * Math.sin(i * angleStep - Math.PI / 2);
        points.push(`${x},${y}`);
      }
      
      return points.join(' ');
    };
    
    // Calculate whether we should show a rectangle (different width/height) or a square
    const isRectangle = selectedShape === 'square' && width !== height;
    // Calculate whether we should show a polygon with > 4 sides
    const isPolygon = selectedShape === 'square' && numSides > 4;
    
    switch (selectedShape) {
      case 'triangle':
        // Generate a custom triangle with SVG to show different angles
        const triangleHeight = shapeSize * 1.5;
        const triangleBase = shapeSize * 2;
        
        return (
          <div className="relative">
            <svg 
              width={triangleBase} 
              height={triangleHeight}
              viewBox={`0 0 ${triangleBase} ${triangleHeight}`}
            >
              <polygon 
                points={`${triangleBase/2},0 0,${triangleHeight} ${triangleBase},${triangleHeight}`}
                fill={shapeColor}
                stroke="black"
                strokeWidth="1"
              />
            </svg>
            
            {/* Angle markers */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angleB}°
            </div>
            <div className="absolute bottom-0 left-4 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angleA}°
            </div>
            <div className="absolute bottom-0 right-4 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angleC}°
            </div>
            
            {/* Side length markers */}
            <div className="absolute bottom-8 left-1/4 text-slate-800 font-bold">
              {sideLength}
            </div>
            <div className="absolute bottom-8 right-1/4 text-slate-800 font-bold">
              {sideLength}
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-slate-800 font-bold">
              {sideLength}
            </div>
            
            {/* Triangle type label based on angles */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 px-2 py-1 rounded text-black text-xs">
              {angleA === angleB && angleB === angleC ? 'Equilateral' : 
                (angleA === angleB || angleB === angleC || angleA === angleC) ? 'Isosceles' : 'Scalene'} 
              Triangle
            </div>
          </div>
        );
      case 'square':
        if (isPolygon) {
          return (
            <div className="relative">
              <svg 
                width={shapeSize * 3} 
                height={shapeSize * 3}
                viewBox={`0 0 ${shapeSize * 2} ${shapeSize * 2}`}
              >
                <polygon 
                  points={generatePolygonPath(numSides, shapeSize)}
                  fill={shapeColor}
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
              
              {/* Display the number of sides */}
              <div className="absolute top-2 left-2 bg-white bg-opacity-70 px-2 py-1 rounded text-black font-bold">
                {numSides} sides
              </div>
              
              {/* Side length marker */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-slate-800 font-bold">
                Side length: {sideLength}
              </div>
            </div>
          );
        } else if (isRectangle) {
          return (
            <div className="relative">
              <div 
                style={{
                  width: `${width * 10}px`,
                  height: `${height * 10}px`,
                  backgroundColor: shapeColor,
                }}
              >
              </div>
              
              {/* Angle markers - all 90° for rectangle */}
              <div className="absolute top-1 left-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute top-1 right-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute bottom-1 left-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute bottom-1 right-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              
              {/* Side length markers */}
              <div className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{height}</div>
              <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{height}</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-slate-800 font-bold">{width}</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-slate-800 font-bold">{width}</div>
            </div>
          );
        } else {
          return (
            <div className="relative">
              <div 
                style={{
                  width: `${shapeSize * 1.5}px`,
                  height: `${shapeSize * 1.5}px`,
                  backgroundColor: shapeColor,
                }}
              >
              </div>
              
              {/* Angle markers - all 90° for square */}
              <div className="absolute top-1 left-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute top-1 right-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute bottom-1 left-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              <div className="absolute bottom-1 right-1 text-black bg-white bg-opacity-70 px-1 rounded font-bold">90°</div>
              
              {/* Side length markers */}
              <div className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{sideLength}</div>
              <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{sideLength}</div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-slate-800 font-bold">{sideLength}</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-slate-800 font-bold">{sideLength}</div>
            </div>
          );
        }
      case 'circle':
        const diameter = sideLength * 2;
        const circumference = Math.round((2 * Math.PI * sideLength) * 10) / 10;
        
        return (
          <div className="relative">
            <svg 
              width={shapeSize * 3} 
              height={shapeSize * 3}
              viewBox={`0 0 ${shapeSize * 3} ${shapeSize * 3}`}
            >
              <circle 
                cx={shapeSize * 1.5} 
                cy={shapeSize * 1.5} 
                r={shapeSize} 
                fill={shapeColor}
                stroke="black"
                strokeWidth="1"
              />
              {/* Radius line */}
              <line 
                x1={shapeSize * 1.5} 
                y1={shapeSize * 1.5} 
                x2={shapeSize * 2.5} 
                y2={shapeSize * 1.5}
                stroke="white" 
                strokeWidth="2"
              />
              {/* Diameter line */}
              <line 
                x1={shapeSize * 0.5} 
                y1={shapeSize * 1.5} 
                x2={shapeSize * 2.5} 
                y2={shapeSize * 1.5}
                stroke="rgba(255,255,255,0.5)" 
                strokeWidth="1" 
                strokeDasharray="5,5"
              />
              {/* Center point */}
              <circle 
                cx={shapeSize * 1.5} 
                cy={shapeSize * 1.5} 
                r="3" 
                fill="white"
              />
            </svg>
            
            {/* Circle definitions */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-8 bg-white bg-opacity-70 px-2 py-1 rounded text-black text-sm font-bold">
              Center
            </div>
            <div className="absolute top-1/2 right-1/4 transform translate-x-2 -translate-y-6 bg-white bg-opacity-70 px-2 py-1 rounded text-black text-sm font-bold">
              Radius: {sideLength} units
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 px-2 py-1 rounded text-black text-sm">
              Diameter: {diameter} units
            </div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-70 px-2 py-1 rounded text-black text-sm">
              Circumference: {circumference} units (2πr)
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Explore Shapes</h2>
          <div className="flex space-x-2">
            <Button 
              className={`${selectedShape === 'triangle' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-800'} px-4 py-2 rounded-lg text-sm font-bold`}
              onClick={() => setSelectedShape('triangle')}
            >
              Triangle
            </Button>
            <Button 
              className={`${selectedShape === 'square' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-800'} px-4 py-2 rounded-lg text-sm font-bold`}
              onClick={() => setSelectedShape('square')}
            >
              Sides
            </Button>
            <Button 
              className={`${selectedShape === 'circle' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-800'} px-4 py-2 rounded-lg text-sm font-bold`}
              onClick={() => setSelectedShape('circle')}
            >
              Circle
            </Button>
          </div>
        </div>
        
        <div className="shape-canvas w-full aspect-video mb-4 flex items-center justify-center">
          {renderShape()}
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl">
          <h3 className="font-bold text-lg mb-3">Change the Shape</h3>
          
          <div className="mb-4">
            <label className="block mb-2 font-bold">Size:</label>
            <Slider
              value={[shapeSize]}
              min={50}
              max={150}
              step={1}
              onValueChange={(values) => setShapeSize(values[0])}
              className="w-full h-3"
            />
          </div>

          {/* Color picker */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Color:</label>
            <div className="flex flex-wrap gap-2">
              {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#000000'].map((color) => (
                <div 
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer ${shapeColor === color ? 'ring-2 ring-black ring-offset-2' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setShapeColor(color)}
                />
              ))}
              <input 
                type="color" 
                value={shapeColor}
                onChange={(e) => setShapeColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">
                {selectedShape === 'circle' ? 'Radius:' : 'Side Length:'}
              </label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={sideLength}
                  onChange={(e) => setSideLength(Number(e.target.value))}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  min={1}
                  max={20}
                />
                <span className="ml-2">units</span>
              </div>
            </div>
            {selectedShape === 'triangle' && (
              <div>
                <label className="block mb-2 font-bold">Angles:</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-medium">Angle A</label>
                    <Input
                      type="number"
                      value={angleA}
                      onChange={(e) => {
                        const newAngleA = Number(e.target.value);
                        // Ensure angles sum to 180
                        const remaining = 180 - newAngleA - angleC;
                        setAngleA(newAngleA);
                        setAngleB(remaining > 0 ? remaining : 1);
                      }}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      min={1}
                      max={178}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Angle B</label>
                    <Input
                      type="number"
                      value={angleB}
                      onChange={(e) => {
                        const newAngleB = Number(e.target.value);
                        // Ensure angles sum to 180
                        const remaining = 180 - newAngleB - angleC;
                        setAngleB(newAngleB);
                        setAngleA(remaining > 0 ? remaining : 1);
                      }}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      min={1}
                      max={178}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Angle C</label>
                    <Input
                      type="number"
                      value={angleC}
                      onChange={(e) => {
                        const newAngleC = Number(e.target.value);
                        // Ensure angles sum to 180
                        const remaining = 180 - newAngleC - angleA;
                        setAngleC(newAngleC);
                        setAngleB(remaining > 0 ? remaining : 1);
                      }}
                      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                      min={1}
                      max={178}
                    />
                  </div>
                </div>
                <div className="text-center mt-1 text-sm">
                  Sum: {angleA + angleB + angleC}° (must equal 180°)
                </div>
              </div>
            )}
          </div>

          {/* Show polygon sides slider for square */}
          {selectedShape === 'square' && (
            <div className="mt-4">
              <label className="block mb-2 font-bold">Number of Sides:</label>
              <Slider
                value={[numSides]}
                min={4}
                max={10}
                step={1}
                onValueChange={(values) => setNumSides(values[0])}
                className="w-full h-3"
              />
              <div className="text-center mt-1">{numSides} sides</div>
            </div>
          )}

          {/* Show width/height controls for rectangle */}
          {selectedShape === 'square' && numSides === 4 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-bold">Width:</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min={1}
                    max={20}
                  />
                  <span className="ml-2">units</span>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-bold">Height:</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min={1}
                    max={20}
                  />
                  <span className="ml-2">units</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Math Fun Facts</h2>
        
        {selectedShape === 'triangle' && (
          <div className="space-y-4">
            <div className="p-4 bg-primary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Triangle Types</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Equilateral:</strong> All sides and angles are equal (60° each)</li>
                <li><strong>Isosceles:</strong> Two sides and two angles are equal</li>
                <li><strong>Scalene:</strong> All sides and angles are different</li>
              </ul>
            </div>
            
            <div className="p-4 bg-secondary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Triangle Formulas</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Area:</strong> A = ½ × base × height</li>
                <li><strong>Perimeter:</strong> P = side1 + side2 + side3</li>
                <li><strong>Angle Sum:</strong> Always equals 180°</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-warning">
              <h3 className="font-bold mb-2">Did you know?</h3>
              <p>The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².</p>
            </div>
          </div>
        )}
        
        {selectedShape === 'square' && (
          <div className="space-y-4">
            <div className="p-4 bg-primary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Regular Polygon Properties</h3>
              <p className="mb-2">A regular polygon has all sides equal length and all angles equal.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Triangle (3 sides):</strong> Sum of angles = 180°</li>
                <li><strong>Quadrilateral (4 sides):</strong> Sum of angles = 360°</li>
                <li><strong>Pentagon (5 sides):</strong> Sum of angles = 540°</li>
                <li><strong>Hexagon (6 sides):</strong> Sum of angles = 720°</li>
              </ul>
            </div>
            
            <div className="p-4 bg-secondary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Polygon Angle Formula</h3>
              <p>For any polygon with n sides:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Sum of interior angles:</strong> (n - 2) × 180°</li>
                <li><strong>Each angle in a regular polygon:</strong> (n - 2) × 180° ÷ n</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-warning">
              <h3 className="font-bold mb-2">Did you know?</h3>
              <p>There are only five regular polyhedra (3D shapes with identical faces): tetrahedron, cube, octahedron, dodecahedron, and icosahedron. These are called the Platonic solids.</p>
            </div>
          </div>
        )}
        
        {selectedShape === 'circle' && (
          <div className="space-y-4">
            <div className="p-4 bg-primary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Circle Basics</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Radius:</strong> Distance from center to edge</li>
                <li><strong>Diameter:</strong> Distance across circle through center (2 × radius)</li>
                <li><strong>Circumference:</strong> Distance around the circle (2 × π × radius)</li>
                <li><strong>Area:</strong> Amount of space inside the circle (π × radius²)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-secondary bg-opacity-10 rounded-xl">
              <h3 className="font-bold mb-2">Circle Formulas</h3>
              <p>If r = radius and d = diameter:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Circumference:</strong> C = 2πr or C = πd</li>
                <li><strong>Area:</strong> A = πr²</li>
                <li><strong>Diameter:</strong> d = 2r</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-warning">
              <h3 className="font-bold mb-2">Did you know?</h3>
              <p>π (pi) is approximately 3.14159 and goes on forever without repeating. It's the ratio of a circle's circumference to its diameter and appears in many important math formulas!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShapeExplorer;
