import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from '../ColorPicker';
import {
  resetBorderRadiusStyle,
  setBorderRadiusStyle,
  setBorderStyle,
  setPreview,
} from '../redux/features/borderSlice';
import Slider from '../Slider';

const styles = [
  'solid',
  'dotted',
  'dashed',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

const positions = ['All', 'Top', 'Right', 'Bottom', 'Left'];

function Border() {
  const dispatch = useDispatch();
  const { border } = useSelector((state) => state);
  const { background, boxColor, borderRadiusStyle, borderStyle } = border;
  const { width, color, style, position } = borderStyle;
  const { all, topLeft, topRight, bottomRight, bottomLeft } = borderRadiusStyle;

  const setPreviews = (name, value) => {
    dispatch(setPreview({ name, value }));
  };

  const setColor = (value, name) => {
    dispatch(setBorderStyle({ name, value }));
  };

  const handleChange = (e, key) => {
    const { name, value } = e.target;
    if (key === 'border') dispatch(setBorderStyle({ name, value }));
    else if (key === 'borderRadius')
      dispatch(setBorderRadiusStyle({ name, value }));
  };

  const handleSwap = () => {};
  return (
    <div className='Border pb-3'>
      <div className='row px-3'>
        <div className='borderLeft col-12 col-lg-6 bg-white p-4'>
          <h6 className='mb-4'>Config custom border</h6>

          <div className='slider-group mb-4'>
            <div className='slider-item'>
              <Slider
                min='1'
                max='30'
                name='width'
                title='Width'
                value={width}
                handleChange={(e) => handleChange(e, 'border')}
              />
            </div>
          </div>

          <div className='border-color mb-4' style={{ position: 'relative' }}>
            <p className='mb-2'>Color</p>
            <ColorPicker color={color} name='color' setColor={setColor} />
          </div>

          <div className='style mb-4'>
            <p className='mb-2'>Style</p>
            <div className='style-btns'>
              {styles.map((style, index) => {
                const color =
                  style === border.borderStyle.style ? '#b3bcf5' : '#f4f5fa';

                return (
                  <button
                    key={index}
                    style={{
                      border: `5px ${style} rgb(153,212,212)`,
                      background: color,
                      borderRadius: '2px',
                    }}
                    onClick={() =>
                      dispatch(setBorderStyle({ name: 'style', value: style }))
                    }
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='position mb-4'>
            <p className='mb-2'>Position</p>
            <div className='position-btns'>
              {positions.map((p, index) => {
                const key = p === 'All' ? 'border' : `border${p}`;
                const position =
                  p === border.borderStyle.position ? '#b3bcf5' : '#f4f5fa';
                return (
                  <button
                    key={index}
                    style={{
                      [key]: '5px solid rgb(153,212,212)',
                      borderRadius: '2px',

                      background: position,
                    }}
                    onClick={() =>
                      dispatch(setBorderStyle({ name: 'position', value: p }))
                    }
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='radius mb-4'>
            <p className='mb-2'>Border radius</p>

            <div className='slider-group my-3'>
              <div className='slider-item mb-3'>
                <Slider
                  min='1'
                  max='200'
                  name='all'
                  title='All corners'
                  value={all}
                  handleChange={(e) => handleChange(e, 'borderRadius')}
                />
              </div>
              <div className='slider-item mb-3'>
                <Slider
                  min='1'
                  max='200'
                  name='topLeft'
                  title='Top left'
                  value={topLeft}
                  handleChange={(e) => handleChange(e, 'borderRadius')}
                />
              </div>
              <div className='slider-item mb-3'>
                <Slider
                  min='1'
                  max='200'
                  name='topRight'
                  title='Top right'
                  value={topRight}
                  handleChange={(e) => handleChange(e, 'borderRadius')}
                />
              </div>
              <div className='slider-item mb-3'>
                <Slider
                  min='1'
                  max='200'
                  name='bottomRight'
                  title='Bottom right'
                  value={bottomRight}
                  handleChange={(e) => handleChange(e, 'borderRadius')}
                />
              </div>
              <div className='slider-item mb-3'>
                <Slider
                  min='1'
                  max='200'
                  name='bottomLeft'
                  title='Bottom left'
                  value={bottomLeft}
                  handleChange={(e) => handleChange(e, 'borderRadius')}
                />
              </div>
            </div>
          </div>

          <button
            className='btn-main'
            onClick={() => dispatch(resetBorderRadiusStyle())}
          >
            Reset
          </button>
        </div>

        <div className='col-12 col-lg-6'>
          <div className='borderRight'>
            <div className='borderRight__header bg-white mb-3'>
              <div className='d-flex p-4'>
                <h6 className='mr-auto'>Preview</h6>
                <div>
                  <div className='d-flex' style={{ position: 'relative' }}>
                    <div className='mr-3'>
                      <ColorPicker
                        color={background}
                        name='background'
                        setPreviews={setPreviews}
                      />
                    </div>
                    <div>
                      <ColorPicker
                        color={boxColor}
                        name='boxColor'
                        setPreviews={setPreviews}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='boxPreview p-4'
                style={{
                  background: `rgb(${background.r},${background.g},${background.b},${background.a})`,
                }}
              >
                <div
                  style={{
                    background: `rgb(${boxColor.r},${boxColor.g},${boxColor.b},${boxColor.a})`,
                    borderWidth:
                      position == 'All'
                        ? `${width}px`
                        : position == 'Top'
                        ? `${width}px 0 0`
                        : position == 'Right'
                        ? `0 ${width}px 0 0`
                        : position == 'Bottom'
                        ? `0 0 ${width}px  0`
                        : `0 0 0${width}px`,
                    borderStyle: `${style}`,
                    borderColor: `rgba(${color.r},${color.g},${color.b},${color.a})`,
                    borderRadius: `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`,
                    // borderTop: position != 'All' && position != 'Top' && 0,
                  }}
                ></div>
              </div>
            </div>

            <div className='borderRight__footer p-4 bg-white'>
              <h6>CSS Code</h6>
              <div>
                border :{' '}
                <span style={{ fontWeight: '500' }}>
                  {width}px {style} rgb({color.r},{color.g},{color.b},{color.a})
                  ;{' '}
                </span>
              </div>

              <div>
                border-radius :{' '}
                <span style={{ fontWeight: '500' }}>
                  {' '}
                  {topLeft}px {topRight}px {bottomRight}px {bottomLeft}px ;{' '}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Border;
