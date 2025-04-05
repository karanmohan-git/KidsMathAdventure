import React from 'react';
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-700 to-purple-900">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome to Our Apps</h1>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center gap-8">
        {/* KidsMathAdventure Card */}
        <div className="max-w-3xl w-full p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Kids Math Adventure</h2>
          <p className="text-xl mb-8">
            An interactive educational platform for children ages 6-8 to learn programming, math, and more!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Python Coding</h3>
              <p>Learn to code with fun visual exercises designed for beginners.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Math Skills</h3>
              <p>Practice algebra and geometry through interactive problems.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Knowledge Quizzes</h3>
              <p>Test what you know about science, wildlife, and our planet.</p>
            </div>
          </div>
          
          <Link href="/academy">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-xl mb-4">
              Start Learning
            </Button>
          </Link>
        </div>
        
        {/* Solitaire Card */}
        <div className="max-w-3xl w-full p-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Play Solitaire</h2>
          <p className="text-xl mb-8">
            Enjoy a classic game of Solitaire with no ads, no distractions, and completely free.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Ad-Free</h3>
              <p>Play without any annoying advertisements, pop-ups, or interruptions.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Easy to Share</h3>
              <p>Install on any computer or share the link with friends and family.</p>
            </div>
            
            <div className="bg-white bg-opacity-20 p-6 rounded-lg flex-1">
              <h3 className="text-xl font-semibold mb-2">Complete Game</h3>
              <p>All the features you love about Solitaire including undo functionality.</p>
            </div>
          </div>
          
          <Link href="/solitaire">
            <Button className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 text-xl">
              Play Now
            </Button>
          </Link>
        </div>
      </main>
      
      <footer className="bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Kids Code Math Academy & Solitaire | Ad-Free & Educational</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;