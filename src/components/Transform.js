import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from '../ColorPicker';
import {
  resetValue,
  setPreview,
  setValue,
} from '../redux/features/transformSlice';
import Slider from '../Slider';
function Transform() {
  const dispatch = useDispatch();
  const { transform } = useSelector((state) => state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setValue({ name, data: value }));
  };

  const setPreviews = (name, value) => {
    dispatch(setPreview({ name, value }));
  };

  return (
    <div className='transform pb-3'>
      <div className='row'>
        <div className='col-12 col-lg-6'>
          <div className='transformLeft bg-white'>
            <div className='transformLeft__header p-4'>
              <h6 className='mb-4'>Box-Shadow CSS Generator</h6>
              <div className='slider-group mb-3'>
                <div className='slider-item mb-3'>
                  <Slider
                    min='0'
                    max='2'
                    name='scaleX'
                    title='Scale (x)'
                    step='0.1'
                    value={transform.value.scaleX}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='0'
                    max='360'
                    name='rotate'
                    title='Rotate (deg)'
                    value={transform.value.rotate}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-100'
                    max='100'
                    name='translateX'
                    title='TranslateX (px)'
                    value={transform.value.translateX}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-100'
                    max='100'
                    name='translateY'
                    title='TranslateY (px)'
                    value={transform.value.translateY}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-90'
                    max='90'
                    name='skewX'
                    title='SkewX (deg)'
                    value={transform.value.skewX}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-90'
                    max='90'
                    name='skewY'
                    title='SkewY (deg)'
                    value={transform.value.skewY}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-50'
                    max='150'
                    name='transformOriginX'
                    title='Transform origin X (%)'
                    value={transform.value.transformOriginX}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-50'
                    max='150'
                    name='transformOriginY'
                    title='Transform origin Y (%)'
                    value={transform.value.transformOriginY}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='transformLeft__footer p-4'>
              <button
                className='btn-main'
                onClick={() => dispatch(resetValue())}
              >
                Reset default
              </button>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6'>
          <div className='transformRight'>
            <div className='transformRight__header bg-white mb-3'>
              <div className='d-flex p-4'>
                <h6>Preview</h6>
                <div className='ml-auto'>
                  <div className='d-flex' style={{ position: 'relative' }}>
                    <div className='mr-3'>
                      <ColorPicker
                        color={transform.background}
                        name='background'
                        setPreviews={setPreviews}
                      />
                    </div>
                    <div>
                      <ColorPicker
                        color={transform.boxColor}
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
                  background: `rgb(${transform.background.r},${transform.background.g},${transform.background.b},${transform.background.a})`,
                }}
              >
                <div className='boxWrap'>
                  <div
                    style={{
                      height: '100%',
                      background: `rgb(${transform.boxColor.r},${transform.boxColor.g},${transform.boxColor.b},${transform.boxColor.a})`,
                      transition: 'all .2s linear',
                      transform: `scale(${transform.value.scaleX}) rotate(${transform.value.rotate}) skew(${transform.value.skewX}deg,${transform.value.skewY}deg) translate(${transform.value.translateX}px,${transform.value.translateY}px)`,
                      transformOrigin: `${transform.value.transformOriginX}%  ${transform.value.transformOriginY}%`,
                    }}
                  >
                    <span className='text-muted'>Preview text</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='transformRight__footer p-4 bg-white'>
              <h6 className='mb-4'>CSS Code</h6>

              <div>
                transform :
                <span style={{ fontWeight: '500' }}>
                  {'  '}{' '}
                  {+transform.value.scaleX !== 1 ||
                  +transform.value.rotate !== 0 ||
                  +transform.value.translateX !== 0 ||
                  +transform.value.translateY !== 0 ||
                  +transform.value.skewX !== 0 ||
                  +transform.value.skewY !== 0
                    ? ''
                    : 'none'}
                  {+transform.value.scaleX !== 1 &&
                    `scale(${transform.value.scaleX}) `}
                  {+transform.value.rotate !== 0 &&
                    `rotate(${transform.value.rotate}deg) `}
                  {(+transform.value.translateX !== 0 ||
                    +transform.value.translateY !== 0) &&
                    `translate(${transform.value.translateX}px,${transform.value.translateY}px) `}
                  {(+transform.value.skewX !== 0 ||
                    +transform.value.skewY !== 0) &&
                    `skew(${transform.value.skewX}deg,${transform.value.skewY}deg)`}{' '}
                  ;
                </span>
              </div>
              <div>
                transform-origin :{' '}
                <span style={{ fontWeight: '500' }}>
                  {+transform.value.transformOriginX === 50 &&
                  +transform.value.transformOriginY === 50
                    ? 'none'
                    : `${transform.value.transformOriginX} % ${transform.value.transformOriginY} %`}{' '}
                  ;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transform;
