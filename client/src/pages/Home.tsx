import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import PythonModule from '../components/python/PythonModule';
import AlgebraModule from '../components/algebra/AlgebraModule';
import GeometryModule from '../components/geometry/GeometryModule';

type Tab = 'python' | 'algebra' | 'geometry';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('python');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 pb-20 flex-1">
        <div className={`tab-content ${activeTab === 'python' ? 'active' : ''}`}>
          <PythonModule />
        </div>
        
        <div className={`tab-content ${activeTab === 'algebra' ? 'active' : ''}`}>
          <AlgebraModule />
        </div>
        
        <div className={`tab-content ${activeTab === 'geometry' ? 'active' : ''}`}>
          <GeometryModule />
        </div>
      </main>
    </div>
  );
};

export default Home;
