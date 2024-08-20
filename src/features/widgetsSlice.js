import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [],
    },
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [],
    },
    {
      id: 3,
      name: 'Registry Scan',
      widgets: [],
    },
  ],
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
  },
});

export const { addWidget } = widgetsSlice.actions;

export default widgetsSlice.reducer;
