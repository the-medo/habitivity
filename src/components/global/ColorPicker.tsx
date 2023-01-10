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
      colors={[
        '#006d75',
        '#08979c',
        '#0958d9',
        '#1d39c4',
        '#531dab',
        '#c41d7f',
        '#cf1322',
        '#d4380d',
        '#d46b08',
        '#d48806',
        '#d4b106',
        '#7cb305',
        '#389e0d',
        '#237804',
      ]}
    />
  );
};

export default ColorPicker;
