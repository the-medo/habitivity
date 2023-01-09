import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { STYLE } from '../../styles/CustomStyles';
import { computeOffsetsAfterClick } from '../../helpers/computeOffsetsAfterClick';
import styled from 'styled-components';
import DynamicIcon from './DynamicIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { PickerType, setPicker } from '../../store/appSlice';

interface IconPickerProps {
  title?: string;
  description?: string;
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
}

const PickerWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const IconPickerCircle: React.FC<IconPickerProps> = ({ title, description, icon, setIcon }) => {
  const dispatch = useDispatch();
  const pickerOpened = useSelector((state: ReduxState) => state.appReducer.pickerOpened);
  const globalIcon = useSelector((state: ReduxState) => state.appReducer.icon);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (pickerOpened === undefined) {
      setIsOpened(false);
    }
  }, [pickerOpened]);

  const openIconPicker: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      setIsOpened(true);
      dispatch(
        setPicker({
          pickerOpened: PickerType.ICON,
          pickerPosition: computeOffsetsAfterClick(
            e,
            STYLE.COLORPICKER_WIDTH,
            STYLE.COLORPICKER_HEIGHT,
          ),
          icon: {
            icon,
            title,
            description,
          },
        }),
      );
    },
    [dispatch, icon, title, description],
  );

  useEffect(() => {
    if (globalIcon?.icon && isOpened) {
      setIcon(globalIcon.icon);
    }
  }, [globalIcon?.icon, isOpened, setIcon]);

  return (
    <PickerWrapper>
      <Swatch onClick={openIconPicker}>
        <DynamicIcon icon={icon} />
      </Swatch>
    </PickerWrapper>
  );
};

export default IconPickerCircle;
