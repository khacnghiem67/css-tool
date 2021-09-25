import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
  width: '5',
  color: {
    r: '28',
    g: '110',
    b: '164',
    a: '1',
  },
  style: 'solid',
  position: 'All',
};

const background = {
  r: '255',
  g: '255',
  b: '255',
  a: '1',
};

const boxColor = {
  r: '61',
  g: '157',
  b: '246',
  a: '1',
};

const borderRadiusStyle = {
  all: '0',
  topLeft: '0',
  topRight: '0',
  bottomRight: '0',
  bottomLeft: '0',
};

const borderSlice = createSlice({
  name: 'border',
  initialState: {
    borderStyle: defaultValue,
    background,
    boxColor,
    borderRadiusStyle,
  },
  reducers: {
    setBorderStyle: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        borderStyle: { ...state.borderStyle, [name]: value },
      };
    },
    setPreview: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    },
    setBorderRadiusStyle: (state, action) => {
      const { name, value } = action.payload;
      if (name === 'all')
        return {
          ...state,
          borderRadiusStyle: {
            all: value,
            topLeft: value,
            topRight: value,
            bottomRight: value,
            bottomLeft: value,
          },
        };
      return {
        ...state,
        borderRadiusStyle: { ...state.borderRadiusStyle, [name]: value },
      };
    },
    resetBorderRadiusStyle: (state, action) => {
      return {
        ...state,
        borderRadiusStyle,
      };
    },
    setStyleAndPosition: (state, action) => {},
  },
});

export const {
  setBorderStyle,
  setPreview,
  setBorderRadiusStyle,
  resetBorderRadiusStyle,
} = borderSlice.actions;

export default borderSlice.reducer;
