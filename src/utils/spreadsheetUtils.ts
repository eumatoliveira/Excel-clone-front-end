import { Cell, SpreadsheetData } from '../types';

export function createEmptySheet(cols: number, rows: number): SpreadsheetData {
  const data: SpreadsheetData = [];
  
  for (let i = 0; i < rows; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        rawValue: '',
        displayValue: '',
      });
    }
    data.push(row);
  }
  
  // Add sample data for the first few rows
  if (data.length > 0) {
    // Header row
    const sampleHeaders = ['Year', 'Make', 'Model', 'Style', 'Notes', 'Cost', 'Quantity', 'Sales'];
    sampleHeaders.forEach((header, index) => {
      if (index < cols) {
        data[0][index] = {
          rawValue: header,
          displayValue: header
        };
      }
    });
    
    // Sample data rows
    const sampleData = [
      ['2018', 'Audi', 'S8', 'Sedan', '', '$104,700.00', '8', '$837,600.00'],
      ['2018', 'Audi', 'SQ5', 'SUV', '', '$51,400.00', '25', '$1,285,000.00'],
      ['2018', 'Audi', 'TT', 'Convertible', '', '$43,500.00', '10', '$435,000.00'],
      ['2018', 'Bentley', 'Bentayga', 'SUV', 'bad quarter', '$195,700.00', '2', '$391,400.00'],
      ['2018', 'BMW', '3 Series', 'Wagon', 'top seller', '$40,500.00', '53', '$2,146,500.00'],
      ['2018', 'BMW', '6 Series', 'Convertible', '', '$73,400.00', '18', '$1,321,200.00'],
      ['2018', 'BMW', '7 Series', 'Sedan', '', '$69,300.00', '14', '$970,200.00'],
      ['2018', 'BMW', 'i3', 'Hatchback', '', '$39,359.00', '21', '$826,539.00'],
      ['2018', 'BMW', 'M3', 'Sedan', '', '$62,300.00', '8', '$498,400.00'],
      ['2018', 'BMW', 'M4', 'Coupe', '', '$64,300.00', '30', '$1,929,000.00'],
      ['2018', 'BMW', 'M5', 'Sedan', '', '$95,700.00', '11', '$1,052,700.00'],
      ['2018', 'BMW', 'M6', 'Convertible', '', '$105,549.00', '5', '$512,745.00'],
      ['2018', 'BMW', 'X1', 'SUV', '', '$31,400.00', '65', '$2,041,000.00'],
      ['2018', 'BMW', 'X2', 'SUV', '', '$36,400.00', '38', '$1,383,200.00'],
      ['2018', 'BMW', 'X3', 'SUV', '', '$42,650.00', '22', '$938,300.00'],
      ['2018', 'BMW', 'X5', 'SUV', '', '$57,200.00', '14', '$800,800.00'],
      ['2018', 'Tesla', 'Model 3', 'Sedan', 'backordered', '$35,000.00', '49', '$1,715,000.00'],
      ['2018', 'Tesla', 'Model 3 P', 'Sedan', 'performance', '$49,900.00', '8', '$399,200.00'],
      ['2018', 'Tesla', 'Model S', 'Sedan', '', '$75,000.00', '7', '$525,000.00'],
      ['2018', 'Tesla', 'Model X', 'SUV', '', '$81,000.00', '2', '$162,000.00'],
      ['2020', 'Tesla', 'Model Y LR', 'SUV', 'preorder, long range', '$48,000.00', '2', '$96,000.00']
    ];
    
    sampleData.forEach((row, rowIndex) => {
      if (rowIndex + 1 < rows) { // +1 because we already set the header row
        row.forEach((value, colIndex) => {
          if (colIndex < cols) {
            data[rowIndex + 1][colIndex] = {
              rawValue: value,
              displayValue: value
            };
          }
        });
      }
    });
    
    // Add totals at the bottom
    if (22 < rows && 7 < cols) {
      data[22][6] = {
        rawValue: 'TOTAL SALES',
        displayValue: 'TOTAL SALES'
      };
      data[22][7] = {
        rawValue: '$20,266,784.00',
        displayValue: '$20,266,784.00'
      };
    }
    
    if (23 < rows && 7 < cols) {
      data[23][6] = {
        rawValue: 'AVERAGE SALE',
        displayValue: 'AVERAGE SALE'
      };
      data[23][7] = {
        rawValue: '$49,191',
        displayValue: '$49,191'
      };
    }
  }
  
  return data;
}

export function getCellId(row: number, col: number): string {
  const colLabel = String.fromCharCode(65 + col);
  return `${colLabel}${row + 1}`;
}

export function parseCellId(cellId: string): { row: number; col: number } | null {
  const match = cellId.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  
  const colStr = match[1];
  const rowStr = match[2];
  
  let colIndex = 0;
  for (let i = 0; i < colStr.length; i++) {
    colIndex = colIndex * 26 + (colStr.charCodeAt(i) - 64);
  }
  
  return {
    row: parseInt(rowStr, 10) - 1,
    col: colIndex - 1
  };
}

export function evaluateFormula(formula: string, data: SpreadsheetData): number {
  // This is a very basic formula evaluator
  // In a real application, you would use a proper formula parser
  
  // Replace cell references with their values
  const cellRefRegex = /([A-Z]+\d+)/g;
  const formulaWithValues = formula.replace(cellRefRegex, (match) => {
    const cellPos = parseCellId(match);
    if (!cellPos) return '0';
    
    const { row, col } = cellPos;
    if (row < 0 || row >= data.length || col < 0 || col >= data[0].length) {
      return '0';
    }
    
    const cellValue = data[row][col].displayValue;
    if (!cellValue || cellValue === '') return '0';
    
    // Check if the value is numeric
    if (isNaN(Number(cellValue))) {
      throw new Error('Cell reference is not a number');
    }
    
    return cellValue;
  });
  
  // Evaluate the formula
  try {
    // eslint-disable-next-line no-eval
    return eval(formulaWithValues);
  } catch (error) {
    throw new Error('Invalid formula');
  }
}