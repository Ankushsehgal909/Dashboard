
import React, { useState } from 'react';

function HorizontalBarChart() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  // Fixed series of colors
  const colors = ['#8B0000', '#FF0000', '#FFA500', '#FFD700', '#D3D3D3']; 

  const handleAddData = () => {
    if (name.trim() === '' || value.trim() === '' || isNaN(value)) {
      return; // Prevent adding invalid data
    }

    const newValue = Number(value);

    // Calculate total value
    const totalValue = data.reduce((acc, item) => acc + item.value, 0) + newValue;

    // Calculate percentage
    const percentage = (newValue / totalValue) * 100;

    // Determine color based on the index
    const color = colors[data.length % colors.length];

    // Create new data entry
    const newData = {
      name,
      value: newValue,
      percentage,
      color,
    };

    // Update the existing data with new percentages
    const updatedData = data.map(item => ({
      ...item,
      percentage: (item.value / totalValue) * 100,
    }));

    setData([...updatedData, newData]);
    setName('');
    setValue('');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Data Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Data
        </button>
      </div>

      <div className="h-32 flex items-center">
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.color,
              width: `${item.percentage}%`,
            }}
            className="h-full flex items-center justify-center text-white text-sm"
          >
            {item.name} ({item.percentage.toFixed(2)}%)
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalBarChart;

