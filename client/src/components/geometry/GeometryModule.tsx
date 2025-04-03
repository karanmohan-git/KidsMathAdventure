/**
 * Geometry Module Component
 * 
 * This component provides an interactive geometry exploration experience for children ages 6-8.
 * It allows children to explore different shapes, modify their properties, and learn about
 * geometric concepts through hands-on interaction and guided lessons.
 */
import React, { useState } from 'react';
import ShapeExplorer from './ShapeExplorer';
import GeometryLessons from './GeometryLessons';
import { calculateGeometryProperties } from '@/lib/geometryCalculations';

/**
 * Shape type definition
 * Represents the three basic shapes available in the geometry module:
 * - triangle: A three-sided polygon
 * - square: A four-sided polygon with equal sides (extends to other regular polygons)
 * - circle: A round shape where all points are equidistant from the center
 */
type Shape = 'triangle' | 'square' | 'circle';

/**
 * GeometryModule Component
 * 
 * The main component for the geometry learning experience that provides:
 * 1. Interactive shape manipulation with real-time visual feedback
 * 2. Controls for various shape properties (size, angles, colors, etc.)
 * 3. Educational content about geometric shapes and their properties
 * 4. Age-appropriate quizzes and challenges
 */
const GeometryModule: React.FC = () => {
  // Selected shape type (triangle, square/polygon, or circle)
  const [selectedShape, setSelectedShape] = useState<Shape>('triangle');
  // Overall visual size of the shape in the display
  const [shapeSize, setShapeSize] = useState(100);
  // Length of each side for regular shapes
  const [sideLength, setSideLength] = useState(10);
  // General angle property (used differently for each shape)
  const [angle, setAngle] = useState(60);
  
  // Individual angles for triangle - allows creating different triangle types
  const [angleA, setAngleA] = useState(60);
  const [angleB, setAngleB] = useState(60);
  const [angleC, setAngleC] = useState(60);
  
  // Visual color of the shape - helps engage children through customization
  const [shapeColor, setShapeColor] = useState('#3b82f6'); // Default blue color
  
  // Number of sides for polygon shapes - enables exploration beyond basic shapes
  const [numSides, setNumSides] = useState(4); // Default 4 sides for square, can go up to 10
  
  // Width and height for rectangle exploration
  const [width, setWidth] = useState(10); 
  const [height, setHeight] = useState(10);
  
  // Calculate geometric properties based on current shape configuration
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
        <GeometryLessons 
          selectedShape={selectedShape} 
          numSides={numSides} 
        />
      </div>
    </div>
  );
};

export default GeometryModule;
