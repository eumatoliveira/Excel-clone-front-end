import React, { useState, useRef, useEffect } from 'react';
import { Cell, SpreadsheetData } from '../types';
import { getCellId } from '../utils/spreadsheetUtils';

interface GridProps {
  data: SpreadsheetData;
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
  onCellChange: (row: number, col: number, value: string) => void;
}

export const Grid: React.FC<GridProps> = ({ 
  data, 
  selectedCell, 
  onCellSelect, 
  onCellChange 
}) => {
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);
  
  const handleCellClick = (row: number, col: number) => {
    onCellSelect(row, col);
    
    // Double click to edit
    if (selectedCell?.row === row && selectedCell?.col === col) {
      setEditingCell({ row, col });
      setEditValue(data[row][col].rawValue);
    }
  };
  
  const handleCellDoubleClick = (row: number, col: number) => {
    onCellSelect(row, col);
    setEditingCell({ row, col });
    setEditValue(data[row][col].rawValue);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };
  
  const handleInputBlur = () => {
    if (editingCell) {
      onCellChange(editingCell.row, editingCell.col, editValue);
      setEditingCell(null);
    }
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editingCell) {
        onCellChange(editingCell.row, editingCell.col, editValue);
        setEditingCell(null);
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };
  
  const renderHeaderRow = () => {
    return (
      <tr>
        <th className="w-10 h-8 bg-gray-100 border border-gray-300 sticky top-0 left-0 z-20"></th>
        {data[0].map((_, colIndex) => (
          <th 
            key={colIndex} 
            className="min-w-20 h-8 bg-gray-100 border border-gray-300 sticky top-0 z-10 text-center text-gray-700 font-normal text-sm"
          >
            {String.fromCharCode(65 + colIndex)}
          </th>
        ))}
      </tr>
    );
  };
  
  // Sample data for the first few rows to match the Excel screenshot
  const sampleData = [
    ['Year', 'Make', 'Model', 'Style', 'Notes', 'Cost', 'Quantity', 'Sales'],
    ['2018', 'Audi', 'S8', 'Sedan', '', '$104,700.00', '8', '$837,600.00'],
    ['2018', 'Audi', 'SQ5', 'SUV', '', '$51,400.00', '25', '$1,285,000.00'],
    ['2018', 'Audi', 'TT', 'Convertible', '', '$43,500.00', '10', '$435,000.00'],
    ['2018', 'Bentley', 'Bentayga', 'SUV', 'bad quarter', '$195,700.00', '2', '$391,400.00'],
    ['2018', 'BMW', '3 Series', 'Wagon', 'top seller', '$40,500.00', '53', '$2,146,500.00'],
    ['2018', 'BMW', '6 Series', 'Convertible', '', '$73,400.00', '18', '$1,321,200.00'],
    ['2018', 'BMW', '7 Series', 'Sedan', '', '$69,300.00', '14', '$970,200.00']
  ];
  
  // Function to populate sample data
  const populateSampleData = () => {
    const newData = [...data];
    
    sampleData.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if (rowIndex < newData.length && colIndex < newData[0].length) {
          newData[rowIndex][colIndex] = {
            rawValue: value,
            displayValue: value
          };
        }
      });
    });
    
    return newData;
  };
  
  // Populate with sample data on first render
  useEffect(() => {
    onCellChange(0, 0, 'Year');
    // We're not actually calling populateSampleData() here to avoid changing state
    // This is just to show what the data would look like
  }, []);
  
  return (
    <div className="overflow-auto h-full">
      <table className="border-collapse">
        <thead>
          {renderHeaderRow()}
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="w-10 h-7 bg-gray-100 border border-gray-300 sticky left-0 z-10 text-center text-gray-700 text-sm">
                {rowIndex + 1}
              </td>
              {row.map((cell, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                
                // Apply special styling for header row
                const isHeaderRow = rowIndex === 0;
                const headerStyle = isHeaderRow ? 'font-semibold bg-[#e6f2eb]' : '';
                
                return (
                  <td 
                    key={colIndex}
                    className={`min-w-20 h-7 border border-gray-300 relative ${
                      isSelected ? 'bg-[#e6f2eb]' : 'bg-white'
                    } ${headerStyle}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, colIndex)}
                    data-cell-id={getCellId(rowIndex, colIndex)}
                  >
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        className="absolute inset-0 w-full h-full border-2 border-[#217346] outline-none px-1 text-sm"
                      />
                    ) : (
                      <div className="px-1 truncate text-sm">{cell.displayValue}</div>
                    )}
                    {isSelected && !isEditing && (
                      <div className="absolute inset-0 border-2 border-[#217346] pointer-events-none"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};