import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { GradientPickerPopover } from 'react-linear-gradient-picker';
import 'react-linear-gradient-picker/dist/index.css';
import PropTypes from 'prop-types';

const WrapperPropTypes = {
  onSelect: PropTypes.func,
};

const WrappedSketchPicker = ({ onSelect, ...rest }) => {
  return (
    <SketchPicker
      {...rest}
      color={rest.color}
      onChange={(c) => {
        const { r, g, b, a = 1 } = c.rgb;
        rest.setColorAndAngleAndPalette({
          name: 'color',
          value: `rgba(${r}, ${g}, ${b}, ${a})`,
        });
        onSelect(`rgba(${r}, ${g}, ${b},${a})`);
      }}
    />
  );
};

const App = ({
  myColor,
  myAngle,
  setColorAndAngleAndPalette,
  initialPallet,
}) => {
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(myAngle);
  const [palette, setPalette] = useState(initialPallet);

  return (
    <GradientPickerPopover
      {...{
        open,
        setOpen,
        angle,
        setAngle: (x) => {
          setAngle(x);
          setColorAndAngleAndPalette({ name: 'angle', value: x });
        },
        showAnglePicker: true,
        width: 220,
        maxStops: 3,
        paletteHeight: 32,
        palette,
        onPaletteChange: (x) => {
          setPalette(x);
          setColorAndAngleAndPalette({ name: 'pallet', value: x });
        },
        maxStops: 10,
      }}
    >
      <WrappedSketchPicker
        myColor={myColor}
        setColorAndAngleAndPalette={setColorAndAngleAndPalette}
      />
    </GradientPickerPopover>
  );
};

export default App;
