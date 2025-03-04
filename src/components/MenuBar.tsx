import React from 'react';

export const MenuBar: React.FC = () => {
  const menuItems = ['File', 'Home', 'Insert', 'Data', 'Review', 'View', 'Automate'];
  
  return (
    <div className="bg-[#217346] text-white border-t border-[#1e6b41] border-b border-gray-300">
      <div className="flex">
        {menuItems.map((item, index) => (
          <div 
            key={index}
            className={`px-4 py-2 hover:bg-[#1e6b41] cursor-pointer ${index === 1 ? 'bg-[#1e6b41]' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};