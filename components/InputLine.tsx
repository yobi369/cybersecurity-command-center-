import React, { useState, useRef, useEffect } from 'react';

interface InputLineProps {
  onCommand: (command: string) => void;
  disabled: boolean;
}

export const InputLine: React.FC<InputLineProps> = ({ onCommand, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    const command = inputValue.trim();
    if (!command || disabled) return;
    onCommand(command);
    setInputValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') submit();
  };

  return (
    <form
      className="flex items-center w-full mt-2"
      onSubmit={(event) => { event.preventDefault(); submit(); }}
      aria-label="Enter a simulation command"
    >
      <label htmlFor="terminal-command" className="text-yellow-400 mr-2">$</label>
      <input
        id="terminal-command"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={160}
        className="bg-transparent border-none text-white w-full focus:outline-none flex-1"
        autoComplete="off"
        spellCheck={false}
        aria-label="Simulation command"
      />
      <button type="submit" disabled={disabled || !inputValue.trim()} className="ml-2 text-xs text-green-300 disabled:opacity-40">
        Run
      </button>
    </form>
  );
};
