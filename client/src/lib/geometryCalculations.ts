export interface GeometryProperties {
  perimeter: number;
  area: number;
  angleSum: number;
}

// Calculate properties for different geometric shapes
export function calculateGeometryProperties(
  shape: 'triangle' | 'square' | 'circle',
  sideLength: number,
  angle: number = 60,
  numSides: number = 4,
  width: number = 10,
  height: number = 10
): GeometryProperties {
  switch (shape) {
    case 'triangle':
      return calculateTriangleProperties(sideLength, angle);
    case 'square':
      if (numSides > 4) {
        return calculatePolygonProperties(sideLength, numSides);
      } else if (width !== height) {
        return calculateRectangleProperties(width, height);
      } else {
        return calculateSquareProperties(sideLength);
      }
    case 'circle':
      return calculateCircleProperties(sideLength); // sideLength acts as radius for circle
    default:
      return { perimeter: 0, area: 0, angleSum: 0 };
  }
}

// Calculate triangle properties
function calculateTriangleProperties(sideLength: number, angle: number): GeometryProperties {
  // For simplicity, we'll create an equilateral triangle when angle is 60
  // Otherwise, we'll estimate for an isosceles triangle
  
  const perimeter = sideLength * 3; // For equilateral triangle
  
  // Calculate area using the formula: area = (side length)² * sqrt(3) / 4
  // This is for an equilateral triangle
  const area = Math.round((Math.pow(sideLength, 2) * Math.sqrt(3) / 4) * 10) / 10;
  
  const angleSum = 180; // Sum of angles in any triangle is always 180 degrees
  
  return {
    perimeter,
    area,
    angleSum
  };
}

// Calculate square properties
function calculateSquareProperties(sideLength: number): GeometryProperties {
  const perimeter = sideLength * 4;
  const area = sideLength * sideLength;
  const angleSum = 360; // Sum of angles in a square is always 360 degrees (4 * 90)
  
  return {
    perimeter,
    area,
    angleSum
  };
}

// Calculate rectangle properties
function calculateRectangleProperties(width: number, height: number): GeometryProperties {
  const perimeter = 2 * (width + height);
  const area = width * height;
  const angleSum = 360; // Sum of angles in a rectangle is always 360 degrees (4 * 90)
  
  return {
    perimeter,
    area,
    angleSum
  };
}

// Calculate polygon properties
function calculatePolygonProperties(sideLength: number, numSides: number): GeometryProperties {
  const perimeter = sideLength * numSides;
  
  // Using the regular polygon area formula: area = (n * s²) / (4 * tan(π/n))
  // where n is the number of sides and s is the side length
  const area = Math.round((numSides * Math.pow(sideLength, 2)) / (4 * Math.tan(Math.PI / numSides)) * 10) / 10;
  
  // Sum of interior angles of a polygon = (n - 2) * 180 degrees
  const angleSum = (numSides - 2) * 180; 
  
  return {
    perimeter,
    area,
    angleSum
  };
}

// Calculate circle properties
function calculateCircleProperties(radius: number): GeometryProperties {
  const pi = Math.PI;
  const perimeter = Math.round((2 * pi * radius) * 10) / 10; // Circumference = 2πr
  const area = Math.round((pi * radius * radius) * 10) / 10; // Area = πr²
  const angleSum = 360; // A full circle is 360 degrees
  
  return {
    perimeter,
    area,
    angleSum
  };
}
