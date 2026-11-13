import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OutputLine, OutputType } from '../types';
import { runCommandSimulation, HELP_MESSAGE, WELCOME_MESSAGE } from '../services/simulationService';
import { InputLine } from './InputLine';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<OutputLine[]>(WELCOME_MESSAGE);
  const [isLoading, setIsLoading] = useState(false);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = useCallback(async (commandLine: string) => {
    const normalized = commandLine.trim();
    if (!normalized || isLoading) return;

    setHistory(previous => [...previous, { type: OutputType.INPUT, content: normalized }]);

    const [command, ...args] = normalized.split(/\s+/);
    const safeCommand = command.toLowerCase();

    if (safeCommand === 'clear') {
      setHistory(WELCOME_MESSAGE);
      return;
    }

    if (safeCommand === 'help') {
      setHistory(previous => [...previous, { type: OutputType.OUTPUT, content: HELP_MESSAGE }]);
      return;
    }

    setIsLoading(true);
    try {
      const output = await runCommandSimulation(safeCommand, args);
      setHistory(previous => [...previous, {
        type: output.startsWith('Unknown command:') || output.startsWith('Input error:') ? OutputType.ERROR : OutputType.OUTPUT,
        content: output,
      }]);
    } catch {
      setHistory(previous => [...previous, {
        type: OutputType.ERROR,
        content: 'The local simulation could not be completed. No network activity was performed.',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <section aria-label="Cybersecurity simulation terminal" className="bg-black border-2 border-green-800 rounded-lg p-4 h-[70vh] flex flex-col overflow-hidden shadow-2xl shadow-green-500/10">
      <div className="flex-grow overflow-y-auto pr-2" aria-live="polite" aria-relevant="additions text">
        {history.map((line, index) => (
          <div key={index}>
            {line.type === OutputType.INPUT && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-2" aria-hidden="true">$</span>
                <p className="text-white whitespace-pre-wrap">{line.content}</p>
              </div>
            )}
            {line.type === OutputType.OUTPUT && <p className="text-green-400 whitespace-pre-wrap">{line.content}</p>}
            {line.type === OutputType.ERROR && <p className="text-red-400 whitespace-pre-wrap">{line.content}</p>}
            {line.type === OutputType.SYSTEM && <p className="text-cyan-400 whitespace-pre-wrap">{line.content}</p>}
          </div>
        ))}
        {isLoading && <p className="text-gray-400" role="status">Evaluating local demonstration fixture…</p>}
        <div ref={endOfTerminalRef} />
      </div>
      <InputLine onCommand={processCommand} disabled={isLoading} />
    </section>
  );
};

export default Terminal;
