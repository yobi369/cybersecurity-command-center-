
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommand(inputValue);
      setInputValue('');
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center w-full mt-2" onClick={handleClick}>
      <span className="text-yellow-400 mr-2">$</span>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="bg-transparent border-none text-white w-full focus:outline-none flex-1"
        autoComplete="off"
        spellCheck="false"
      />
      {!disabled && (
        <span className="w-2 h-5 bg-green-500 animate-pulse ml-1"></span>
      )}
    </div>
  );
};
