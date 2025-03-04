import React from 'react';
import { getCellId } from '../utils/spreadsheetUtils';

interface FormulaBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedCell: { row: number; col: number } | null;
}

export const FormulaBar: React.FC<FormulaBarProps> = ({ value, onChange, selectedCell }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="flex items-center bg-gray-100 border-b border-gray-300 p-1">
      <div className="w-10 text-gray-600 font-medium mr-2 text-center">
        fx
      </div>
      <div className="w-20 bg-white border border-gray-300 px-2 py-1 mr-2 text-sm">
        {selectedCell ? getCellId(selectedCell.row, selectedCell.col) : ''}
      </div>
      <div className="flex-grow">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-[#217346]"
          placeholder="Enter a value or formula (e.g. =A1+B1)"
        />
      </div>
    </div>
  );
};