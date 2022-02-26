import { createSlice } from '@reduxjs/toolkit';

const initialPallet = [
  { offset: '0.00', color: 'rgba(230, 100, 101,1)' },
  { offset: '1.00', color: 'rgba(145, 152, 229,1)' },
];

const gradient = createSlice({
  name: 'gradient',
  initialState: {
    color: 'rgba(255,255,255,1)',
    style: 'linear',
    colorFormat: 'hex',
    direction: 'left top',
    pallet: initialPallet,
    angle: 90,
  },
  reducers: {
    setGradient: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
  },
});

export const { setGradient } = gradient.actions;

export default gradient.reducer;
