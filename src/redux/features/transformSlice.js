import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    scaleX: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0,
    skewX: 0,
    skewY: 0,
    transformOriginX: 50,
    transformOriginY: 50,
  },
  background: {
    r: '255',
    g: '255',
    b: '255',
    a: '1',
  },
  boxColor: {
    r: '61',
    g: '157',
    b: '246',
    a: '0.5',
  },
};

const transformSlice = createSlice({
  name: 'transform',
  initialState,
  reducers: {
    setValue: (state, action) => {
      const { name, data } = action.payload;
      return {
        ...state,
        value: {
          ...state.value,
          [name]: data,
        },
      };
    },
    resetValue: (state, action) => {
      return initialState;
    },
    setPreview: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
  },
});

export const { setValue, resetValue, setPreview } = transformSlice.actions;

export default transformSlice.reducer;
