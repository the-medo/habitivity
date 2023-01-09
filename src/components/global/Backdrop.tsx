import React, { MouseEventHandler, useCallback } from 'react';
import { PickerType, setPicker } from '../../store/appSlice';
import styled from 'styled-components';
import { Position } from '../../helpers/types/Position';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

const Popover = styled.div<{ $position: Position }>`
  position: fixed;
  z-index: 2;
  left: ${props => (props.$position.x ? `${props.$position.x}px` : `0`)};
  top: ${props => (props.$position.y ? `${props.$position.y}px` : `0`)};
`;

const Cover = styled.div`
  position: fixed;
  background-color: #e3e3e3;
  opacity: 0.2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Backdrop: React.FC = () => {
  const dispatch = useDispatch();
  const pickerOpened = useSelector((state: ReduxState) => state.appReducer.pickerOpened);
  const position = useSelector((state: ReduxState) => state.appReducer.pickerPosition);

  const closePicker: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    dispatch(setPicker(undefined));
  }, [dispatch]);

  if (!position) return null;

  return (
    <Popover $position={position}>
      <Cover onClick={closePicker} />
      {pickerOpened === PickerType.COLOR && <ColorPicker />}
      {pickerOpened === PickerType.ICON && <IconPicker />}
    </Popover>
  );
};

export default Backdrop;
