import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../features/dashboardSlice';
import { PieChart } from '@mui/x-charts/PieChart';
import graph from '../assets/graph.png';

export const Category = ({ Category, categoryIndex }) => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [dataEntries, setDataEntries] = useState([{ label: '', value: '' }]);

  const handleAddWidget = () => {
    const newWidget = {
      name: widgetName,
      Data: dataEntries.map((entry) => ({
        label: entry.label,
        value: Number(entry.value),
      })),
    };
    dispatch(addWidget({ categoryIndex, widget: newWidget }));
    setShowForm(false);
    setWidgetName('');
    setDataEntries([{ label: '', value: '' }]);
  };

  const handleDataChange = (index, field, value) => {
    const updatedEntries = [...dataEntries];
    updatedEntries[index][field] = value;
    setDataEntries(updatedEntries);
  };

  const addDataField = () => {
    setDataEntries([...dataEntries, { label: '', value: '' }]);
  };

  const handleRemoveWidget = (widgetIndex) => {
    dispatch(removeWidget({ categoryIndex, widgetIndex }));
  };

  return (
    <div className='p-2'>
      <h4 className='font-bold'>{Category.name}</h4>
      <div className='flex flex-wrap'>
        {Category.widget.map((widget, widgetIdx) => (
          <div key={widgetIdx} className="bg-gray-100 w-1/3 h-60 rounded-lg p-2 relative">
            <div className='w-full rounded-lg bg-white h-full flex flex-col justify-center items-center relative'>
              <button
                onClick={() => handleRemoveWidget(widgetIdx)}
                className="absolute top-2 right-2 text-red-500"
              >
                &times;
              </button>
              <h4 className='text-md'>{widget.name}</h4>
              {widget.Data && widget.Data.length > 0? (
                <>
                  <PieChart
                    series={[
                      {
                        data: widget.Data,
                        innerRadius: 50,
                        outerRadius: 80,
                        paddingAngle: 0,
                        cornerRadius: 0,
                        startAngle: 0,
                        endAngle: 360,
                        cx: 130,
                        cy: 100,
                      },
                    ]}
                  />
                  
  <div className='absolute mt-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
    <span className='text-lg mr-48 font-bold'>
      {widget.Data.reduce((total, item) => total + item.value, 0)}
    </span>
    <span className='text-sm mr-48 font-medium block'>Total</span>
  </div>

                </>
              ) : (
                <div className=' rounded-lg'>
                  <span className="flex justify-center mb-4">
                    <img src={graph} alt="No Graph" />
                  </span>
                  <h4 >No Graph Available
                  </h4>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="bg-gray-100 w-1/3 h-60 rounded-lg p-2 relative">
          <div className='w-full rounded-lg bg-white h-full flex justify-center items-center relative'>
            <button
              className='border border-gray-200 rounded-lg'
              onClick={() => setShowForm(!showForm)}
            >
              <span className='m-4 text-blue-800'>
                + Add Widget
              </span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <div className="mb-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">Widget Name</label>
            <input
              type="text"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {dataEntries.map((entry, idx) => (
            <div key={idx} className="mb-2 flex space-x-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Data Name</label>
                <input
                  type="text"
                  value={entry.label}
                  onChange={(e) => handleDataChange(idx, 'label', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Value</label>
                <input
                  type="number"
                  value={entry.value}
                  onChange={(e) => handleDataChange(idx, 'value', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}

          <button
            onClick={addDataField}
            className="text-blue-600 text-sm"
          >
            + Add another data field
          </button>

          <div className="mt-4">
            <button
              onClick={handleAddWidget}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Widget
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
