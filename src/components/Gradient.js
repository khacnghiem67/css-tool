import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPickerGradient from '../ColorPickerGradient';
import { setGradient } from '../redux/features/gradientSlice';

const hexAscii = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const converDecimalToHex = (decimal) => {
  const lastIndex = decimal.indexOf(')');
  const decimalString = decimal.slice(5, lastIndex).split(',');
  let result = '';
  for (let i = 0; i < decimalString.length - 1; i++) {
    let value = Number.parseInt(decimalString[i]);
    let resultSub = '';
    while (value != 0) {
      let remainder = value % 16;
      resultSub = hexAscii[remainder] + resultSub;
      value = Number.parseInt(value / 16);
    }
    if (resultSub.length == 1) resultSub = '0' + resultSub;
    result += resultSub;
  }
  return '#' + result;
};

function Gradient() {
  const dispatch = useDispatch();
  const { gradient } = useSelector((state) => state);
  const { color, style, colorFormat, direction, pallet, angle } = gradient;

  const setColorAndAngleAndPalette = ({ name, value }) =>
    dispatch(setGradient({ name, value }));

  const colorLinearGradient =
    `linear-gradient(${angle}deg,` +
    pallet
      .map(
        (x) =>
          (colorFormat === 'hex' ? converDecimalToHex(x.color) : x.color) +
          ` ${Math.round(x.offset, 0) * 100}%`
      )
      .join(',') +
    ')';

  const colorRadialGradient =
    `radial-gradient(at ${direction},` +
    pallet
      .map((x) => x.color + ` ${Math.round(x.offset, 0) * 100}%`)
      .join(',') +
    ')';

  return (
    <div className='gradient px-4 pb-2'>
      <div className='row'>
        <div className='gradientLeft col-md-4'>
          <div className='gradientLeft-header bg-white p-3 mb-4'>
            <h6 className='mb-4'>CSS Gradient Generator</h6>
            <div className='style mb-3'>
              <p className='mb-2'>Style</p>
              {['linear', 'radial'].map((s, index) => {
                return (
                  <button
                    key={index}
                    className={s === style ? 'active' : ''}
                    onClick={(e) => {
                      dispatch(setGradient({ name: 'style', value: s }));
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {style === 'radial' && (
              <div className='direction mb-4'>
                <p className='mb-2'>Direction</p>
                <div className='direction-btns'>
                  {[
                    { name: 'left top', deg: '-45' },
                    { name: 'center top', deg: '0' },
                    { name: 'right top', deg: '45' },
                    { name: 'left center', deg: '-90' },
                    {
                      name: 'center center',
                      element: true,
                      deg: '0',
                    },
                    { name: 'right center', deg: '90' },
                    { name: 'left bottom', deg: '-135' },
                    { name: 'center bottom', deg: '-180' },
                    { name: 'right bottom', deg: '135' },
                  ].map((s, index) => {
                    const { element, name, deg } = s;
                    const symbol = element ? (
                      <i className='far fa-circle'></i>
                    ) : (
                      <i
                        className='fas fa-arrow-up'
                        style={{ transform: `rotate(${deg}deg)` }}
                      ></i>
                    );

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          dispatch(
                            setGradient({ name: 'direction', value: name })
                          );
                        }}
                        className={name === direction ? 'active' : ''}
                      >
                        {symbol}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className='color'>
              <p className='mb-2'>Colors</p>
              <div
                className='color-preview p-1 mb-2'
                onClick={() => document.querySelector('.gpw .trigger').click()}
              >
                <div
                  style={{
                    height: '100%',
                    backgroundImage: colorLinearGradient,
                  }}
                ></div>
              </div>
              <div className='mb-2'>
                <ColorPickerGradient
                  initialPallet={pallet}
                  myAngle={angle}
                  setColorAndAngleAndPalette={setColorAndAngleAndPalette}
                  myColor={color}
                />
              </div>
              <button className='btn-main mb-3'>Random color</button>

              <div className='color-format'>
                <p className='mb-2'>Color format</p>
                {['hex', 'rgba'].map((s, index) => {
                  return (
                    <button
                      key={index}
                      className={s === colorFormat ? 'active' : ''}
                      onClick={(e) => {
                        dispatch(
                          setGradient({ name: 'colorFormat', value: s })
                        );
                      }}
                    >
                      hex
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='gradientLeft-footer p-3 bg-white mb-4'>
            <h6 className='mb-4'>CSS code</h6>
            background :{' '}
            <span style={{ fontWeight: '500' }}>
              {style === 'linear' ? colorLinearGradient : colorRadialGradient};
            </span>
          </div>
        </div>

        <div className='gradientRight col-md-8'>
          <div
            className='gradientRight-boxPreview'
            style={{
              backgroundImage:
                style === 'linear' ? colorLinearGradient : colorRadialGradient,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Gradient;
