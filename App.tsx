import React from 'react';
import Terminal from './components/Terminal';

const App: React.FC = () => (
  <div className="bg-gray-900 min-h-screen text-green-400 font-mono">
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-cyan-400">Research prototype · Demonstration environment</p>
        <h1 className="text-2xl md:text-4xl font-bold text-center text-green-400 mt-2">Cybersecurity Command Center</h1>
        <p className="text-center text-sm text-yellow-300 mt-3">Synthetic local fixtures only. No real network activity or security actions are performed.</p>
      </header>
      <main><Terminal /></main>
      <footer className="text-center text-xs text-gray-500 mt-4">Evidence-grounded security research · Prototype build · Not for production monitoring</footer>
    </div>
  </div>
);

export default App;
