import React, { useCallback } from 'react';
import styled from 'styled-components';
import DynamicIcon from './DynamicIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { setIcon } from '../../store/appSlice';
import { Input } from 'antd';

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

const IconPicker: React.FC = () => {
  const dispatch = useDispatch();
  const globalIcon = useSelector((state: ReduxState) => state.appReducer.icon);
  const iconName = globalIcon?.icon ?? 'AiOutlineRightCircle';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setIcon({
          ...globalIcon,
          icon: e.target.value,
        }),
      );
    },
    [dispatch, globalIcon],
  );

  return (
    <Picker>
      {globalIcon?.title && <h2>{globalIcon.title}</h2>}
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
        <Input onChange={handleChange} />
        <Preview>
          <PreviewLabel>Preview</PreviewLabel>
          <DynamicIcon icon={iconName} fallback={<DynamicIcon icon="AiOutlineRightCircle" />} />
        </Preview>
      </InputAndPreview>
      {globalIcon?.description && <span>{globalIcon.description}</span>}
    </Picker>
  );
};

export default IconPicker;
