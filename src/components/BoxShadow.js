import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColorPicker from '../ColorPicker';
import {
  addLayer,
  removeLayer,
  setActiveLayer,
  setDragItem,
  setDropItemAndSwap,
  setLayer,
  setPreview,
} from '../redux/features/boxShadowSlice';
import Slider from '../Slider';

function BoxShadow() {
  const dispatch = useDispatch();
  const { boxShadow } = useSelector((state) => state);
  const { id, shiftRight, shiftDown, opacity, color, blur, spread, inset } =
    boxShadow.boxShadowArr.find((x, index) => index === boxShadow.active);

  const setPreviews = (name, value) => {
    dispatch(setPreview({ name, value }));
  };

  const setColor = (value, name) => dispatch(setLayer({ id, name, value }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLayer({ id, name, value }));
  };

  const handleDragStart = (e, index) => {
    dispatch(setDragItem(index));
  };

  const handleDragEnter = (e, index) => {
    if (index !== boxShadow.dragLayer) {
      if (boxShadow.dragLayer === boxShadow.active) {
        dispatch(setActiveLayer(index));
        dispatch(setDropItemAndSwap(index));
        dispatch(setDragItem(index));
      } else {
        if (index === boxShadow.active) {
          if (boxShadow.dragLayer > boxShadow.active) {
            dispatch(setActiveLayer(index + 1));
            dispatch(setDropItemAndSwap(index));
            dispatch(setDragItem(index));
          } else {
            dispatch(setActiveLayer(index - 1));
            dispatch(setDropItemAndSwap(index));
            dispatch(setDragItem(index));
          }
        } else {
          dispatch(setDropItemAndSwap(index));
          dispatch(setDragItem(index));
        }
      }
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  return (
    <div className='box-shadow'>
      <div className='row px-3'>
        <div className='col-12 col-lg-6 mb-4'>
          <div className='boxShadowLeft bg-white'>
            <div className='boxShadowLeft__header p-4'>
              <h6 className='mb-4'>Box-Shadow CSS Generator</h6>

              <div className='slider-group mb-3'>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-50'
                    max='50'
                    name='shiftRight'
                    title='Shift right'
                    value={shiftRight}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='-50'
                    max='50'
                    name='shiftDown'
                    title='Shift down'
                    value={shiftDown}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='0'
                    max='100'
                    name='spread'
                    title='Spread'
                    value={spread}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item mb-3'>
                  <Slider
                    min='0'
                    max='100'
                    name='blur'
                    title='Blur'
                    value={blur}
                    handleChange={handleChange}
                  />
                </div>
                <div className='slider-item'>
                  <Slider
                    min='0'
                    max='100'
                    name='opacity'
                    title='Opacity'
                    value={opacity}
                    handleChange={handleChange}
                  />
                </div>
              </div>

              <div className='boxShadowLeft-inset mb-3'>
                <input
                  type='checkbox'
                  name='inset'
                  className='mr-2'
                  checked={inset}
                  name='inset'
                  onChange={(e) => {
                    const { name, checked } = e.target;
                    dispatch(setLayer({ id, name, value: checked }));
                  }}
                />
                <span>Inset</span>
              </div>
              <div
                className='boxShadowLeft-color'
                style={{ position: 'relative' }}
              >
                <ColorPicker color={color} name='color' setColor={setColor} />
              </div>
            </div>
            <div className='boxShadowLeft__footer p-4'>
              <button
                className='btn-main mb-3'
                onClick={() => dispatch(addLayer())}
              >
                Add Layer
              </button>
              <div
                className='boxShadow-layers'
                style={{ position: 'relative' }}
              >
                {boxShadow.boxShadowArr.map((layer, index) => {
                  const {
                    id,
                    shiftRight,
                    shiftDown,
                    blur,
                    opacity,
                    spread,
                    color,
                  } = layer;

                  return (
                    <div
                      key={id}
                      className={`layer d-flex p-2 ${
                        index === boxShadow.active ? 'active' : ''
                      } align-items-center`}
                      key={layer.id}
                      onClick={() => dispatch(setActiveLayer(index))}
                      draggable={true}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                    >
                      <i className='fas fa-gamepad fa-lg mr-2'></i>

                      <span style={{ userSelect: 'none' }}>
                        {shiftRight}px {shiftDown}px {blur}px {spread}px{' '}
                        {`rgba(${color.r},${color.g},${color.b},${
                          opacity / 100
                        })`}
                      </span>
                      <i
                        className='far fa-trash-alt ml-auto fa-lg'
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(removeLayer({ id: layer.id, index }));
                        }}
                      ></i>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-lg-6'>
          <div className='boxShadowRight'>
            <div className='boxShadowRight__header bg-white mb-3'>
              <div className='d-flex p-4'>
                <h6>Preview</h6>
                <div className='ml-auto'>
                  <div className='d-flex' style={{ position: 'relative' }}>
                    <div className='mr-3'>
                      <ColorPicker
                        color={boxShadow.background}
                        name='background'
                        setPreviews={setPreviews}
                      />
                    </div>
                    <div>
                      <ColorPicker
                        color={boxShadow.boxColor}
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
                  background: `rgb(${boxShadow.background.r},${boxShadow.background.g},${boxShadow.background.b},${boxShadow.background.a})`,
                }}
              >
                <div
                  style={{
                    background: `rgb(${boxShadow.boxColor.r},${boxShadow.boxColor.g},${boxShadow.boxColor.b},${boxShadow.boxColor.a})`,
                    transition: 'background .2s linear',
                    boxShadow: boxShadow.boxShadowArr.map((layer, index) => {
                      const {
                        shiftRight,
                        shiftDown,
                        blur,
                        opacity,
                        spread,
                        color,
                        inset,
                      } = layer;
                      const isInset = inset ? 'inset' : '';
                      return (
                        `${shiftRight}px ${shiftDown}px ${blur}px ${spread}px rgba(${
                          color.r
                        },${color.g},${color.b},${opacity / 100})` + isInset
                      );
                    }),
                  }}
                ></div>
              </div>
            </div>

            <div className='boxShadowRight__footer p-4 bg-white'>
              <h6 className='mb-3'>CSS Code</h6>
              box-shadow:{' '}
              <span style={{ fontWeight: '500' }}>
                {boxShadow.boxShadowArr.map((layer, index, _this) => {
                  const {
                    id,
                    shiftRight,
                    shiftDown,
                    blur,
                    opacity,
                    spread,
                    color,
                  } = layer;

                  return (
                    <Fragment key={id}>
                      {' '}
                      {`rgba(${color.r},${color.g},${color.b},${
                        opacity / 100
                      })`}{' '}
                      {shiftRight}px {shiftDown}px {blur}
                      px {spread}px {index !== _this.length - 1 && ','}
                    </Fragment>
                  );
                })}
                ;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxShadow;
