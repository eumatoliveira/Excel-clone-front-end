import React, { useState, useEffect, useRef } from 'react';
import { Grid } from './components/Grid';
import { Toolbar } from './components/Toolbar';
import { FormulaBar } from './components/FormulaBar';
import { MenuBar } from './components/MenuBar';
import { createEmptySheet, evaluateFormula } from './utils/spreadsheetUtils';
import { Cell, SpreadsheetData } from './types';

function App() {
  const [data, setData] = useState<SpreadsheetData>(() => createEmptySheet(26, 50));
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [formulaBarValue, setFormulaBarValue] = useState<string>('');
  
  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
    const cellValue = data[row][col].rawValue;
    setEditValue(cellValue);
    setFormulaBarValue(cellValue);
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newData = [...data];
    
    // Update the raw value
    newData[row][col].rawValue = value;
    
    // Calculate the display value
    if (value.startsWith('=')) {
      try {
        const result = evaluateFormula(value.substring(1), newData);
        newData[row][col].displayValue = result.toString();
      } catch (error) {
        newData[row][col].displayValue = '#ERROR';
      }
    } else {
      newData[row][col].displayValue = value;
    }
    
    setData(newData);
    setEditValue(value);
    setFormulaBarValue(value);
  };

  const handleFormulaBarChange = (value: string) => {
    setFormulaBarValue(value);
    if (selectedCell) {
      handleCellChange(selectedCell.row, selectedCell.col, value);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-[#217346] text-white p-2 flex items-center">
        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-0.5 mr-2 ml-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
          </div>
          <h1 className="text-xl font-semibold">Excel Clone</h1>
        </div>
        <div className="flex-grow mx-4">
          <div className="bg-white rounded flex items-center px-2">
            <span className="text-gray-500 mr-2">InventorySales • Saved</span>
            <span className="text-gray-400">▼</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white rounded flex items-center px-3 py-1 mr-4">
            <span className="text-gray-600">🔍</span>
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none text-gray-700 ml-2 w-48"
            />
          </div>
          <div className="flex items-center">
            <span className="text-white mr-2">⚙️</span>
            <span className="text-white">Mike Miller</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 ml-2"></div>
          </div>
        </div>
      </header>
      
      <MenuBar />
      
      <Toolbar />
      
      <FormulaBar 
        value={formulaBarValue} 
        onChange={handleFormulaBarChange} 
        selectedCell={selectedCell}
      />
      
      <div className="flex-grow overflow-auto">
        <Grid 
          data={data} 
          selectedCell={selectedCell}
          onCellSelect={handleCellSelect}
          onCellChange={handleCellChange}
        />
      </div>
      
      <footer className="bg-gray-100 p-1 text-xs text-gray-600 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button className="px-2 py-1 hover:bg-gray-200 rounded">
              <span>◀</span>
            </button>
            <button className="px-2 py-1 hover:bg-gray-200 rounded">
              <span>▶</span>
            </button>
            <div className="bg-[#217346] text-white px-3 py-1 rounded-sm ml-2">
              Sheet1
            </div>
            <div className="text-gray-500 px-3 py-1">
              Sheet2
            </div>
            <div className="text-gray-500 px-3 py-1 flex items-center">
              <span className="text-[#217346] mr-1">+</span> New sheet
            </div>
          </div>
          <div className="text-gray-500 text-xs mr-4">
            Inner Ring (Fastfood) · F1
          </div>
          <div className="text-gray-500 text-xs">
            Average: 10 | Count: 10 | Sum: 30
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;