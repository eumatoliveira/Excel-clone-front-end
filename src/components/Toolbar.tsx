import React from 'react';
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Save, 
  FileText, 
  Download,
  ChevronDown
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center bg-gray-100 border-b border-gray-300 p-1">
      <div className="flex space-x-1 mr-2">
        <button className="p-1 hover:bg-gray-200 rounded">
          <FileText size={16} className="text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Save size={16} className="text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Download size={16} className="text-gray-700" />
        </button>
      </div>
      
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      
      <div className="flex items-center mr-2">
        <select className="bg-white border border-gray-300 rounded px-2 py-1 text-sm mr-2">
          <option>Calibri</option>
        </select>
        <select className="bg-white border border-gray-300 rounded px-2 py-1 text-sm">
          <option>11</option>
        </select>
      </div>
      
      <div className="flex space-x-1 mr-2">
        <button className="p-1 hover:bg-gray-200 rounded">
          <Bold size={16} className="text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Italic size={16} className="text-gray-700" />
        </button>
      </div>
      
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      
      <div className="flex space-x-1">
        <button className="p-1 hover:bg-gray-200 rounded">
          <AlignLeft size={16} className="text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <AlignCenter size={16} className="text-gray-700" />
        </button>
        <button className="p-1 hover:bg-gray-200 rounded">
          <AlignRight size={16} className="text-gray-700" />
        </button>
      </div>
      
      <div className="h-6 w-px bg-gray-300 mx-1"></div>
      
      <div className="flex items-center">
        <button className="flex items-center p-1 hover:bg-gray-200 rounded">
          <span className="text-gray-700 mr-1">Format</span>
          <ChevronDown size={14} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};