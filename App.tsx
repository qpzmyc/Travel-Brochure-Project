import React from 'react';
import { MathSection } from './components/MathSection';
import { Attractions } from './components/Attractions';
import { DataTables } from './components/DataTables';
import { AiPlanner } from './components/AiPlanner';
import { Map, FileText } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <header className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579165466741-7f35a4755657?auto=format&fit=crop&w=2070&q=80"
            alt="Montreal Skyline" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-montreal-dark/60 via-montreal-dark/40 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg animate-fade-in-up">
            Montreal<span className="text-montreal-red">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto animate-fade-in-up delay-100">
            Modeling a city's rhythm through Sine and Cosine waves.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        <MathSection />
        <Attractions />
        <AiPlanner />
        <DataTables />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-center">
        <p className="font-serif text-lg text-white">Made by Cheng</p>
      </footer>
    </div>
  );
};

export default App;