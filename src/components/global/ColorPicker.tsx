import React, { CSSProperties, MouseEventHandler, useCallback, useState } from 'react';
import { ColorResult, TwitterPicker } from 'react-color';
import styled from 'styled-components';
import { STYLE } from '../../styles/CustomStyles';
import { Position } from '../../helpers/types/Position';
import { computeOffsetsAfterClick } from '../../helpers/computeOffsetsAfterClick';

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

interface ColorPickerProps {
  color: CSSProperties['color'];
  setColor: (color: CSSProperties['color']) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const toggleDisplayColorPicker: MouseEventHandler<HTMLDivElement> = useCallback(e => {
    setPosition(computeOffsetsAfterClick(e, STYLE.COLORPICKER_WIDTH, STYLE.COLORPICKER_HEIGHT));
    setDisplayColorPicker(p => !p);
  }, []);

  const handleChange = useCallback(
    (color: ColorResult) => {
      setColor(color.hex);
    },
    [setColor],
  );

  return (
    <>
      <ColorPickerWrapper>
        <Swatch onClick={toggleDisplayColorPicker}>
          <Color $color={color} />
        </Swatch>
      </ColorPickerWrapper>
      {displayColorPicker && (
        <Popover $position={position}>
          <Cover onClick={toggleDisplayColorPicker} />
          <TwitterPicker
            width={`${STYLE.COLORPICKER_WIDTH}px`}
            color={color}
            onChange={handleChange}
            triangle="hide"
          />
        </Popover>
      )}
    </>
  );
};

export default ColorPicker;
