
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { OutputLine, OutputType } from '../types';
import { runCommandSimulation } from '../services/geminiService';
import { InputLine } from './InputLine';

const HELP_MESSAGE = `
SIMULATION HELP MENU
--------------------
Available commands:

  scan <target>      - Simulates a network port scan on a fictional target.
                         Example: scan 192.168.1.1

  analyze <vuln>     - Provides an educational summary of a vulnerability.
                         Example: analyze Cross-Site_Scripting

  crack <hash>       - Simulates cracking a fictional password hash.
                         Example: crack a1b2c3d4e5f6

  exploit <target>   - Simulates a FAILED exploit attempt on a target.
                         Example: exploit server.local

  systeminfo         - Displays simulated system status and hardware info.

  help               - Displays this help menu.
  
  clear              - Clears the terminal screen.
`;

const WELCOME_MESSAGE: OutputLine[] = [
    { type: OutputType.SYSTEM, content: "Initializing Cyber Command Simulation v1.0..." },
    { type: OutputType.SYSTEM, content: "System ready. Type 'help' to see available commands." },
];

const Terminal: React.FC = () => {
    const [history, setHistory] = useState<OutputLine[]>(WELCOME_MESSAGE);
    const [isLoading, setIsLoading] = useState(false);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const processCommand = useCallback(async (commandLine: string) => {
        if (!commandLine.trim()) return;

        const newHistory: OutputLine[] = [...history, { type: OutputType.INPUT, content: commandLine }];
        setHistory(newHistory);
        setIsLoading(true);

        const [command, ...args] = commandLine.trim().toLowerCase().split(/\s+/);

        let outputContent: string;
        let outputType = OutputType.OUTPUT;

        if (command === 'clear') {
            setHistory(WELCOME_MESSAGE);
            setIsLoading(false);
            return;
        }

        if (command === 'help') {
            outputContent = HELP_MESSAGE;
        } else {
            try {
                outputContent = await runCommandSimulation(command, args);
                 if (outputContent.startsWith('Error:') || outputContent.startsWith('Unknown command:')) {
                    outputType = OutputType.ERROR;
                }
            } catch (err) {
                outputContent = `An unexpected client-side error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`;
                outputType = OutputType.ERROR;
            }
        }
        
        setHistory(prev => [...prev, { type: outputType, content: outputContent }]);
        setIsLoading(false);
    }, [history]);
    
    return (
        <div className="bg-black border-2 border-green-800 rounded-lg p-4 h-[70vh] flex flex-col overflow-hidden shadow-2xl shadow-green-500/10">
            <div className="flex-grow overflow-y-auto pr-2">
                {history.map((line, index) => (
                    <div key={index}>
                        {line.type === OutputType.INPUT && (
                            <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">$</span>
                                <p className="text-white whitespace-pre-wrap">{line.content}</p>
                            </div>
                        )}
                        {line.type === OutputType.OUTPUT && (
                             <p className="text-green-400 whitespace-pre-wrap">{line.content}</p>
                        )}
                         {line.type === OutputType.ERROR && (
                             <p className="text-red-500 whitespace-pre-wrap">{line.content}</p>
                        )}
                        {line.type === OutputType.SYSTEM && (
                             <p className="text-cyan-400 whitespace-pre-wrap">{line.content}</p>
                        )}
                    </div>
                ))}
                 {isLoading && <div className="text-gray-400">Processing...</div>}
                <div ref={endOfTerminalRef} />
            </div>
            <InputLine onCommand={processCommand} disabled={isLoading} />
        </div>
    );
};

export default Terminal;