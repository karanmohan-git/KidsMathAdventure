/**
 * Home Page Component
 * 
 * This is the main page of the Kids Code & Math Academy application. It contains:
 * 1. A header with the application title and branding
 * 2. A navigation component for switching between the three learning modules
 * 3. The main content area that displays the active educational module
 */
import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import PythonModule from '../components/python/PythonModule';
import AlgebraModule from '../components/algebra/AlgebraModule';
import GeometryModule from '../components/geometry/GeometryModule';

/**
 * Tab type definition
 * Represents the three educational modules available in the application:
 * - python: Introduction to Python programming with visual outputs
 * - algebra: Interactive algebra problems with step-by-step explanations
 * - geometry: Exploration of geometric shapes and their properties
 */
type Tab = 'python' | 'algebra' | 'geometry';

/**
 * Home Component
 * 
 * The main container component that manages the active learning module tab
 * and renders the appropriate educational content based on user selection.
 */
const Home: React.FC = () => {
  // State to track which educational module is currently active
  const [activeTab, setActiveTab] = useState<Tab>('python');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Application header with title and branding */}
      <Header />
      
      {/* Tab navigation for selecting learning modules */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content area displaying the active educational module */}
      <main className="container mx-auto px-4 pb-20 flex-1">
        {/* Python module - displays when 'python' tab is active */}
        <div className={`tab-content ${activeTab === 'python' ? 'active' : ''}`}>
          <PythonModule />
        </div>
        
        {/* Algebra module - displays when 'algebra' tab is active */}
        <div className={`tab-content ${activeTab === 'algebra' ? 'active' : ''}`}>
          <AlgebraModule />
        </div>
        
        {/* Geometry module - displays when 'geometry' tab is active */}
        <div className={`tab-content ${activeTab === 'geometry' ? 'active' : ''}`}>
          <GeometryModule />
        </div>
      </main>
    </div>
  );
};

export default Home;
