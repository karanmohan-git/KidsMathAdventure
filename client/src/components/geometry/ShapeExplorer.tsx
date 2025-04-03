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
  properties
}) => {
  const renderShape = () => {
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
                borderBottomColor: 'var(--primary)',
              }}
            >
            </div>
            
            {/* Angle markers */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white font-bold">
              {angle}°
            </div>
            <div className="absolute bottom-16 left-8 text-white font-bold">
              {angle}°
            </div>
            <div className="absolute bottom-16 right-8 text-white font-bold">
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
        return (
          <div className="relative">
            <div 
              style={{
                width: `${shapeSize * 1.5}px`,
                height: `${shapeSize * 1.5}px`,
                backgroundColor: 'var(--primary)',
              }}
            >
            </div>
            
            {/* Angle markers - all 90° for square */}
            <div className="absolute top-1 left-1 text-white font-bold">90°</div>
            <div className="absolute top-1 right-1 text-white font-bold">90°</div>
            <div className="absolute bottom-1 left-1 text-white font-bold">90°</div>
            <div className="absolute bottom-1 right-1 text-white font-bold">90°</div>
            
            {/* Side length markers */}
            <div className="absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{sideLength}</div>
            <div className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 text-slate-800 font-bold">{sideLength}</div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-slate-800 font-bold">{sideLength}</div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 text-slate-800 font-bold">{sideLength}</div>
          </div>
        );
      case 'circle':
        return (
          <div className="relative">
            <div 
              style={{
                width: `${shapeSize * 2}px`,
                height: `${shapeSize * 2}px`,
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
              }}
            >
            </div>
            
            {/* Radius marker */}
            <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-white"></div>
            <div className="absolute top-1/2 left-3/4 -translate-y-8 text-white font-bold">
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
            {selectedShape !== 'circle' && (
              <div>
                <label className="block mb-2 font-bold">Angle:</label>
                <div className="flex items-center">
                  <Input
                    type="number"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min={selectedShape === 'square' ? 90 : 20}
                    max={selectedShape === 'square' ? 90 : 120}
                    disabled={selectedShape === 'square'}
                  />
                  <span className="ml-2">degrees</span>
                </div>
              </div>
            )}
          </div>
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
