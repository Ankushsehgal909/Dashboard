import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddWidget from './AddWidget';
import { Category } from './Category';
import { removeWidget } from '../features/dashboardSlice';


export const Dashboard = ({ searchTerm }) => {
  const dashboard = useSelector((state) => state.dashboard.data);
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = (widgetsToRemove) => {
    Object.keys(widgetsToRemove).forEach((categoryIndex) => {
      widgetsToRemove[categoryIndex].forEach((widgetIndex) => {
        dispatch(removeWidget({ categoryIndex: parseInt(categoryIndex), widgetIndex }));
      });
    });
  };

  // Filter categories and widgets based on search term
  const filteredDashboard = dashboard.map((category) => {
    if (category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      // If the category matches, return the full category with all widgets
      return category;
    } else {
      // Otherwise, filter widgets within the category
      const filteredWidgets = category.widget.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...category, widget: filteredWidgets };
    }
  }).filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.widget.length > 0 // Ensure categories with matching widgets are included
  );

  return (
    <div className='bg-blue-50 px-4 pt-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>CNAPP Dashboard</h2>
        <div className='flex space-x-4'>
          <button className='bg-white hover:bg-gray-100 border border-gray-300 py-2 px-2 rounded' onClick={() => setModalOpen(true)}>
            Add Widget +
          </button>
          <button className='bg-white  hover:bg-gray-100 py-2 px-2 rounded'>
            <svg fill="#3949AB" height="24px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-3.21 -3.21 38.48 38.48" xml:space="preserve" stroke="#3949AB" stroke-width="0.00032055" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(90)">

              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#2196F3CCCCCC" stroke-width="0.12822" />

              <g id="SVGRepo_iconCarrier"> <g> <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z" /> </g> </g>

            </svg>
          </button>
          <button className='bg-white hover:bg-gray-100 py-2 px-2 rounded'>
          
          Last 2 days
          </button>
        </div>
      </div>

      {filteredDashboard.map((category, index) => (
        <Category key={index} Category={category} categoryIndex={index} />
      ))}

      {isModalOpen && (
        <AddWidget
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};
