
import React from 'react';
import Terminal from './components/Terminal';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-green-400 font-mono">
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-green-500 animate-pulse">
            Cybersecurity Command Center Simulator
          </h1>
          <p className="text-center text-sm text-yellow-500 mt-2">
            Educational purposes only. No real attacks are performed.
          </p>
        </header>
        <main>
          <Terminal />
        </main>
      </div>
    </div>
  );
};

export default App;
