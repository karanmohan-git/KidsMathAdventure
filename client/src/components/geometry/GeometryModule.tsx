import React, { useState } from 'react';
import ShapeExplorer from './ShapeExplorer';
import GeometryLessons from './GeometryLessons';
import { calculateGeometryProperties } from '@/lib/geometryCalculations';

type Shape = 'triangle' | 'square' | 'circle';

const GeometryModule: React.FC = () => {
  const [selectedShape, setSelectedShape] = useState<Shape>('triangle');
  const [shapeSize, setShapeSize] = useState(100);
  const [sideLength, setSideLength] = useState(10);
  const [angle, setAngle] = useState(60);
  // Individual angles for triangle
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(60);
  const [angleC, setAngleC] = useState(60);
  const [shapeColor, setShapeColor] = useState('#3b82f6'); // Default blue color
  const [numSides, setNumSides] = useState(4); // Default 4 sides for square, can go up to 10
  const [width, setWidth] = useState(10); // For rectangle width
  const [height, setHeight] = useState(10); // For rectangle height
  
  const properties = calculateGeometryProperties(selectedShape, sideLength, angle, numSides, width, height);
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Interactive Geometry */}
      <div className="w-full lg:w-3/5">
        <ShapeExplorer 
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          shapeSize={shapeSize}
          setShapeSize={setShapeSize}
          sideLength={sideLength}
          setSideLength={setSideLength}
          angle={angle}
          setAngle={setAngle}
          angleA={angleA}
          setAngleA={setAngleA}
          angleB={angleB}
          setAngleB={setAngleB}
          angleC={angleC}
          setAngleC={setAngleC}
          shapeColor={shapeColor}
          setShapeColor={setShapeColor}
          numSides={numSides}
          setNumSides={setNumSides}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          properties={properties}
        />
      </div>
      
      {/* Right Column: Learning Content */}
      <div className="w-full lg:w-2/5">
        <GeometryLessons selectedShape={selectedShape} />
      </div>
    </div>
  );
};

export default GeometryModule;
