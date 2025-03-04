export interface Cell {
  rawValue: string;
  displayValue: string;
  type?: 'text' | 'number' | 'formula';
}

export type SpreadsheetData = Cell[][];

export interface CellPosition {
  row: number;
  col: number;
}