import React from 'react';
import { Select, SelectProps } from 'antd';
import { UserInputWrapper } from './TaskUserInputComponents';
import styled from 'styled-components';
import { icons, IconType } from '../../../icons/icons';
import { COLORS } from '../../../../styles/CustomStyles';

interface TaskUserInputCheckboxProps {
  value: number;
}

const OptionWrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  font-weight: bold;
  align-items: center;
  color: ${({ $checked }) => ($checked ? COLORS.PRIMARY : `darkred`)};
  width: 100%;
`;

const OptionIcon = styled.div`
  flex-basis: 10%;
  text-align: right;
  padding-right: 0.25rem;
`;

const OptionTitle = styled.div`
  padding-left: 0.25rem;
`;

const checkboxSelectOptions: SelectProps['options'] = [
  {
    value: 1,
    label: (
      <OptionWrapper $checked={true}>
        <OptionIcon>{icons[IconType.CHECK_OUTLINED]}</OptionIcon>
        <OptionTitle>Done</OptionTitle>
      </OptionWrapper>
    ),
  },
  {
    value: 0,
    label: (
      <OptionWrapper $checked={false}>
        <OptionIcon>{icons[IconType.CLOSE_OUTLINED]}</OptionIcon>
        <OptionTitle>No :(</OptionTitle>
      </OptionWrapper>
    ),
  },
];

const TaskUserInputCheckbox: React.FC<TaskUserInputCheckboxProps> = ({ value }) => {
  return (
    <UserInputWrapper>
      <Select defaultValue={0} options={checkboxSelectOptions} style={{ width: '100%' }} />
    </UserInputWrapper>
  );
};

export default TaskUserInputCheckbox;
