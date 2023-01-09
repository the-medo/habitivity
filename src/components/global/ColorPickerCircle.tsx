import React, { CSSProperties, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { STYLE } from '../../styles/CustomStyles';
import { computeOffsetsAfterClick } from '../../helpers/computeOffsetsAfterClick';
import { useDispatch, useSelector } from 'react-redux';
import { PickerType, setPicker } from '../../store/appSlice';
import { ReduxState } from '../../store';

const ColorPickerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Color = styled.div<{ $color: CSSProperties['color'] }>`
  height: 100%;
  border-radius: 100%;
  background-color: ${props => props.$color};
`;

const Swatch = styled.div`
  padding: 0.15rem;
  height: 1.75rem;
  width: 1.75rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  background: #fff;
  border-radius: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

interface ColorPickerCircleProps {
  color: CSSProperties['color'];
  setColor: (color: CSSProperties['color']) => void;
}

const ColorPickerCircle: React.FC<ColorPickerCircleProps> = ({ color, setColor }) => {
  const dispatch = useDispatch();
  const pickerOpened = useSelector((state: ReduxState) => state.appReducer.pickerOpened);
  const globalColor = useSelector((state: ReduxState) => state.appReducer.color);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (pickerOpened === undefined) {
      setIsOpened(false);
    }
  }, [pickerOpened]);

  const openColorPicker: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      setIsOpened(true);
      dispatch(
        setPicker({
          pickerOpened: PickerType.COLOR,
          pickerPosition: computeOffsetsAfterClick(
            e,
            STYLE.COLORPICKER_WIDTH,
            STYLE.COLORPICKER_HEIGHT,
          ),
          color: color,
        }),
      );
    },
    [color, dispatch],
  );

  useEffect(() => {
    if (globalColor && isOpened) {
      setColor(globalColor);
    }
  }, [globalColor, isOpened, setColor]);

  return (
    <ColorPickerWrapper>
      <Swatch onClick={openColorPicker}>
        <Color $color={color} />
      </Swatch>
    </ColorPickerWrapper>
  );
};

export default ColorPickerCircle;
