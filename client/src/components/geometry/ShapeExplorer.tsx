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
        return (
          <div className="relative">
            <div 
              className="w-0 h-0"
              style={{
                borderLeft: `${shapeSize}px solid transparent`,
                borderRight: `${shapeSize}px solid transparent`,
                borderBottom: `${shapeSize * 1.73}px solid`,
                borderBottomColor: shapeColor,
              }}
            >
            </div>
            
            {/* Angle markers */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angle}°
            </div>
            <div className="absolute bottom-16 left-8 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angle}°
            </div>
            <div className="absolute bottom-16 right-8 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              {angle}°
            </div>
            
            {/* Side length markers */}
            <div className="absolute bottom-24 left-0 -translate-x-4 text-slate-800 font-bold">
              {sideLength}
            </div>
            <div className="absolute bottom-24 right-0 translate-x-4 text-slate-800 font-bold">
              {sideLength}
            </div>
            <div className="absolute bottom-0 text-slate-800 font-bold mt-2">
              {sideLength}
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
        return (
          <div className="relative">
            <div 
              style={{
                width: `${shapeSize * 2}px`,
                height: `${shapeSize * 2}px`,
                backgroundColor: shapeColor,
                borderRadius: '50%',
              }}
            >
            </div>
            
            {/* Radius marker */}
            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-white"></div>
            <div className="absolute top-1/2 left-3/4 -translate-y-8 text-black bg-white bg-opacity-70 px-1 rounded font-bold">
              Radius: {sideLength}
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
              Square
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
                <label className="block mb-2 font-bold">Angle:</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min={20}
                    max={120}
                  />
                  <span className="ml-2">degrees</span>
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
        <h2 className="text-2xl font-bold mb-4">Shape Measurements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-bold text-primary text-center mb-2">Perimeter</h3>
            <p className="text-center text-3xl font-bold">{properties.perimeter}</p>
            <p className="text-center text-sm mt-1">units</p>
          </div>
          
          <div className="bg-secondary bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-bold text-secondary text-center mb-2">Area</h3>
            <p className="text-center text-3xl font-bold">{properties.area}</p>
            <p className="text-center text-sm mt-1">square units</p>
          </div>
          
          <div className="bg-accent bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-bold text-accent text-center mb-2">
              {selectedShape === 'circle' ? 'Diameter' : 'Sum of Angles'}
            </h3>
            <p className="text-center text-3xl font-bold">
              {selectedShape === 'circle' ? (sideLength * 2) : properties.angleSum}
              {selectedShape !== 'circle' && '°'}
            </p>
            <p className="text-center text-sm mt-1">
              {selectedShape === 'circle' ? 'units' : 'degrees'}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border-l-4 border-warning">
          <h3 className="font-bold mb-2">Did you know?</h3>
          <p>
            {selectedShape === 'triangle' && 'The angles in any triangle always add up to 180 degrees!'}
            {selectedShape === 'square' && 'A square has 4 equal sides and 4 right angles (90°)!'}
            {selectedShape === 'circle' && 'The circumference of a circle is about 3.14 (π) times its diameter!'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShapeExplorer;
