import { createSlice } from '@reduxjs/toolkit';
import { uid } from 'uid';
const defaultValue = {
  id: uid(),
  shiftRight: 0,
  shiftDown: 0,
  blur: 5,
  opacity: 20,
  color: {
    r: '0',
    g: '0',
    b: '0',
    a: '1',
  },
};

const textShadowSlice = createSlice({
  name: 'textShadow',
  initialState: {
    textShadowArr: [{ ...defaultValue }],
    active: 0,
    background: {
      r: '255',
      g: '255',
      b: '255',
      a: '1',
    },
    textColor: {
      r: '61',
      g: '157',
      b: '246',
      a: '1',
    },
    dragLayer: null,
    dropLayer: null,
  },
  reducers: {
    addLayer: (state) => {
      return {
        ...state,
        textShadowArr: [...state.textShadowArr, { ...defaultValue, id: uid() }],
      };
    },
    setActiveLayer: (state, action) => {
      return { ...state, active: action.payload };
    },
    removeLayer: (state, action) => {
      if (state.textShadowArr.length === 1) return state;
      const { id, index } = action.payload;
      return {
        ...state,
        textShadowArr: state.textShadowArr.filter((layer) => layer.id !== id),
        active:
          (index === state.textShadowArr.length - 1 &&
            index === state.active) ||
          index < state.active
            ? state.active - 1
            : state.active,
      };
    },
    setLayer: (state, action) => {
      const { id, name, value } = action.payload;
      return {
        ...state,
        textShadowArr: state.textShadowArr.map((layer) =>
          layer.id === id ? { ...layer, [name]: value } : layer
        ),
      };
    },
    setPreview: (state, action) => {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    setDragItem: (state, action) => {
      return {
        ...state,
        dragLayer: action.payload,
      };
    },
    setDropItemAndSwap: (state, action) => {
      if (action.payload === state.dragLayer) return state;
      const dragItem = state.textShadowArr[state.dragLayer];
      const dropItem = state.textShadowArr[action.payload];
      state.textShadowArr.splice(state.dragLayer, 1, dropItem);
      state.textShadowArr.splice(action.payload, 1, dragItem);
    },
  },
});

export const {
  addLayer,
  setActiveLayer,
  removeLayer,
  setLayer,
  setPreview,
  setDragItem,
  setDropItem,
  setDropItemAndSwap,
} = textShadowSlice.actions;

export default textShadowSlice.reducer;
