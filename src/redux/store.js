import { configureStore } from '@reduxjs/toolkit';
import boxShadowReducer from './features/boxShadowSlice';
import transformReducer from './features/transformSlice';
import textShadowReducer from './features/textShadowSlice';
import borderReducer from './features/borderSlice';
import gradientReducer from './features/gradientSlice';

const store = configureStore({
  reducer: {
    boxShadow: boxShadowReducer,
    transform: transformReducer,
    textShadow: textShadowReducer,
    border: borderReducer,
    gradient: gradientReducer,
  },
});

export default store;
