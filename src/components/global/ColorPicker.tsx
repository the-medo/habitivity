import React, { useCallback } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import { STYLE } from '../../styles/CustomStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../../store/appSlice';
import { ReduxState } from '../../store';

const ColorPicker: React.FC = () => {
  const dispatch = useDispatch();
  const globalColor = useSelector((state: ReduxState) => state.appReducer.color);

  const handleChange = useCallback(
    (color: ColorResult) => {
      dispatch(setColor(color.hex));
    },
    [dispatch],
  );

  return (
    <TwitterPicker
      width={`${STYLE.COLORPICKER_WIDTH}px`}
      color={globalColor}
      onChange={handleChange}
      triangle="hide"
    />
  );
};

export default ColorPicker;
