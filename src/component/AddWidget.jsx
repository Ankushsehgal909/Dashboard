import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AddWidget = ({ isOpen, onClose, onConfirm }) => {
  const categories = useSelector((state) => state.dashboard.data);
  const [selectedWidgets, setSelectedWidgets] = useState({});

  useEffect(() => {
    if (isOpen) {
      const initialSelectedWidgets = {};
      categories.forEach((category, categoryIndex) => {
        initialSelectedWidgets[categoryIndex] = category.widget.map((_, widgetIndex) => widgetIndex);
      });
      setSelectedWidgets(initialSelectedWidgets);
    }
  }, [isOpen, categories]);

  const handleCheckboxChange = (categoryIndex, widgetIndex) => {
    setSelectedWidgets((prev) => {
      const updated = { ...prev };
      if (!updated[categoryIndex]) {
        updated[categoryIndex] = [];
      }
      if (updated[categoryIndex].includes(widgetIndex)) {
        updated[categoryIndex] = updated[categoryIndex].filter((index) => index !== widgetIndex);
      } else {
        updated[categoryIndex].push(widgetIndex);
      }
      return updated;
    });
  };

  const handleConfirm = () => {
    const widgetsToRemove = {};
    Object.keys(selectedWidgets).forEach((categoryIndex) => {
      widgetsToRemove[categoryIndex] = categories[categoryIndex].widget
        .map((_, widgetIndex) => widgetIndex)
        .filter((widgetIndex) => !selectedWidgets[categoryIndex].includes(widgetIndex));
    });
    onConfirm(widgetsToRemove);
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Add Widget</h2>
        <div>
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h3 className="font-bold">{category.name}</h3>
              {category.widget.map((widget, widgetIndex) => (
                <div key={widgetIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedWidgets[categoryIndex]?.includes(widgetIndex) || false}
                    onChange={() => handleCheckboxChange(categoryIndex, widgetIndex)}
                    className="mr-2"
                  />
                  <label>{widget.name}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddWidget;
