import React, { MouseEventHandler, useCallback, useState } from 'react';
import { STYLE } from '../../styles/CustomStyles';
import { computeOffsetsAfterClick } from '../../helpers/computeOffsetsAfterClick';
import { Position } from '../../helpers/types/Position';
import styled from 'styled-components';
import DynamicIcon from './DynamicIcon';
import { Input } from 'antd';

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

const Picker = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
  z-index: 1;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 11px rgba(0, 0, 0, 0.1);
`;

const InputAndPreview = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
`;

const PreviewLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 2rem;
  align-items: center;
`;

const LinkWrapper = styled.a`
  font-weight: bold;
`;

const IconPicker: React.FC<IconPickerProps> = ({ title, description, icon, setIcon }) => {
  const [displayPicker, setDisplayPicker] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const toggleDisplayPicker: MouseEventHandler<HTMLDivElement> = useCallback(e => {
    setPosition(computeOffsetsAfterClick(e, STYLE.COLORPICKER_WIDTH, STYLE.COLORPICKER_HEIGHT));
    setDisplayPicker(p => !p);
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIcon(e.target.value);
    },
    [setIcon],
  );

  return (
    <>
      <PickerWrapper>
        <Swatch onClick={toggleDisplayPicker}>
          <DynamicIcon icon={icon} />
        </Swatch>
      </PickerWrapper>
      {displayPicker && (
        <Popover $position={position}>
          <Cover onClick={toggleDisplayPicker} />
          <Picker>
            {title && <h2>{title}</h2>}
            <span>
              Choose any icon from these{' '}
              <LinkWrapper
                href="https://react-icons.github.io/react-icons/icons?name=fa"
                rel="noreferrer"
                target="_blank"
              >
                icon sets [<DynamicIcon icon="AiOutlineLink" small />]
              </LinkWrapper>{' '}
              and copy-paste its name here.
            </span>
            <InputAndPreview>
              <input onChange={onChange} />
              <Preview>
                <PreviewLabel>Preview</PreviewLabel>
                <DynamicIcon icon={icon} fallback={<DynamicIcon icon="AiOutlineRightCircle" />} />
              </Preview>
            </InputAndPreview>
            {description && <span>{description}</span>}
          </Picker>
        </Popover>
      )}
    </>
  );
};

export default IconPicker;
