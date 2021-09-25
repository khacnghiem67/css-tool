import React from 'react';

function Slider({ title, min, max, name, value, handleChange, step }) {
  return (
    <>
      <span style={{ userSelect: 'none' }}>{title}</span>
      <input
        type='range'
        min={min}
        max={max}
        step={step ? step : '1'}
        name={name}
        value={value}
        onChange={handleChange}
        style={{ position: 'relative', zIndex: '10' }}
      />
    </>
  );
}

export default Slider;
