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
  
  const properties = calculateGeometryProperties(selectedShape, sideLength, angle);
  
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
