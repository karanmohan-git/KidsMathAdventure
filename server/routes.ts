import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for progress tracking (future consideration)
  app.get('/api/user/progress', (req, res) => {
    res.json({
      python: { level: 1, completed: 2 },
      algebra: { level: 1, completed: 1 },
      geometry: { level: 1, completed: 3 }
    });
  });

  // API routes for Python module
  app.get('/api/python/lessons', (req, res) => {
    res.json([
      { id: 1, title: 'Variables', completed: true },
      { id: 2, title: 'Drawing Shapes', completed: false },
      { id: 3, title: 'Moving Shapes', completed: false }
    ]);
  });

  // API routes for Algebra module
  app.get('/api/algebra/problems', (req, res) => {
    res.json([
      { 
        id: 1, 
        level: 1,
        problem: '5 + ? = 12',
        answer: 7,
        hint: 'To find the missing number, think about what number you need to add to 5 to get 12.'
      },
      { 
        id: 2, 
        level: 1,
        problem: '8 + ? = 15',
        answer: 7,
        hint: 'To find the missing number, think about what number you need to add to 8 to get 15.'
      }
    ]);
  });

  // API routes for Geometry module
  app.get('/api/geometry/shapes', (req, res) => {
    res.json([
      { id: 'triangle', name: 'Triangle', sides: 3, angles: 3, angleSum: 180 },
      { id: 'square', name: 'Square', sides: 4, angles: 4, angleSum: 360 },
      { id: 'circle', name: 'Circle', radius: true, circumference: '2πr' }
    ]);
  });

  const httpServer = createServer(app);

  return httpServer;
}
