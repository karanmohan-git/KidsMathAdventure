import React from 'react';
import { Button } from '@/components/ui/button';
import { RiUserSmileLine } from 'react-icons/ri';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full mr-3 bg-primary flex items-center justify-center text-white font-bold text-xl">
            KC&M
          </div>
          <h1 className="text-3xl font-extrabold text-primary">Kids Code & Math</h1>
        </div>
        <div>
          <Button 
            className="bg-secondary hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-full text-lg"
          >
            <RiUserSmileLine className="mr-2" />
            Hello, Explorer!
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
