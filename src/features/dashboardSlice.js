import { createSlice } from '@reduxjs/toolkit';
import rawData from '../assets/Data.json'; // Adjust the path according to your file structure

// Helper function to format label
const formatLabel = (label, value) => `${label} (${value})`;

// Function to process raw data and format labels
const processData = (data) => {
  return data.map(category => ({
    ...category,
    widget: category.widget.map(widget => ({
      ...widget,
      Data: widget.Data ? widget.Data.map(entry => ({
        ...entry,
        label: formatLabel(entry.label, entry.value)
      })) : []
    }))
  }));
};

const initialState = {
  data: processData(rawData),
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryIndex, widget } = action.payload;
      // Format labels for new widget data
      const formattedWidget = {
        ...widget,
        Data: widget.Data.map(entry => ({
          ...entry,
          label: formatLabel(entry.label, entry.value),
        })),
      };
      state.data[categoryIndex].widget.push(formattedWidget);
    },
    removeWidget: (state, action) => {
      const { categoryIndex, widgetIndex } = action.payload;
      state.data[categoryIndex].widget.splice(widgetIndex, 1);
    },
  },
});

export const { addWidget, removeWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
