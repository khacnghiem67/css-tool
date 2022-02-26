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
} from '../redux/features/textShadowSlice';
import Slider from '../Slider';
function TextShadow() {
  const dispatch = useDispatch();
  const { textShadow } = useSelector((state) => state);
  const { id, shiftRight, shiftDown, opacity, color, blur } =
    textShadow.textShadowArr.find((x, index) => index === textShadow.active);

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
    if (index !== textShadow.dragLayer) {
      if (textShadow.dragLayer === textShadow.active) {
        dispatch(setActiveLayer(index));
        dispatch(setDropItemAndSwap(index));
        dispatch(setDragItem(index));
      } else {
        if (index === textShadow.active) {
          if (textShadow.dragLayer > textShadow.active) {
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
    <div className='text-shadow'>
      <div className='row px-3'>
        <div className='col-12 col-lg-6 mb-4'>
          <div className='textShadowLeft bg-white'>
            <div className='textShadowLeft__header p-4'>
              <h6 className='mb-4'>Text-Shadow CSS Generator</h6>

              <div className='slider-group mb-4'>
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

              <div
                className='textShadow-color'
                style={{ position: 'relative' }}
              >
                <ColorPicker color={color} name='color' setColor={setColor} />
              </div>
            </div>
            <div className='textShadowLeft__footer p-4'>
              <button
                className='btn-main mb-3'
                onClick={() => dispatch(addLayer())}
              >
                Add Layer
              </button>
              <div
                className='textShadow-layers'
                style={{ position: 'relative' }}
              >
                {textShadow.textShadowArr.map((layer, index) => {
                  const { id, shiftRight, shiftDown, blur, opacity, color } =
                    layer;

                  return (
                    <div
                      key={id}
                      className={`layer d-flex p-2 ${
                        index === textShadow.active ? 'active' : ''
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
                        {shiftRight}px {shiftDown}px {blur}px
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
          <div className='textShadowRight'>
            <div className='textShadowRight__header bg-white mb-3'>
              <div className='d-flex p-4'>
                <h6>Preview</h6>
                <div className='ml-auto'>
                  <div className='d-flex' style={{ position: 'relative' }}>
                    <div className='mr-3'>
                      <ColorPicker
                        color={textShadow.background}
                        name='background'
                        setPreviews={setPreviews}
                      />
                    </div>
                    <div>
                      <ColorPicker
                        color={textShadow.textColor}
                        name='textColor'
                        setPreviews={setPreviews}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='textPreview p-4'
                style={{
                  background: `rgb(${textShadow.background.r},${textShadow.background.g},${textShadow.background.b},${textShadow.background.a})`,
                }}
              >
                <div
                  style={{
                    fontSize: '5rem',
                    color: `rgb(${textShadow.textColor.r},${textShadow.textColor.g},${textShadow.textColor.b},${textShadow.textColor.a})`,
                    textShadow: textShadow.textShadowArr.map((layer, index) => {
                      const {
                        id,
                        shiftRight,
                        shiftDown,
                        opacity,
                        color,
                        blur,
                      } = layer;
                      return `rgba(${color.r},${color.g},${color.b},${
                        opacity / 100
                      }) ${shiftRight}px ${shiftDown}px ${blur}px`;
                    }),
                  }}
                >
                  Hello SC
                </div>
              </div>
            </div>

            <div className='textShadowRight__footer p-4 bg-white'>
              <h6 className='mb-3'>CSS Code</h6>
              text-shadow:{' '}
              <span style={{ fontWeight: '500' }}>
                {textShadow.textShadowArr.map((layer, index, _this) => {
                  const { id, shiftRight, shiftDown, opacity, color, blur } =
                    layer;

                  return (
                    <Fragment key={id}>
                      {' '}
                      {`rgba(${color.r},${color.g},${color.b},${
                        opacity / 100
                      })`}{' '}
                      {shiftRight}px {shiftDown}px {blur}
                      px {index !== _this.length - 1 && ','}
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

export default TextShadow;
