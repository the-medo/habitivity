import React, { useMemo } from 'react';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { Select, Spin } from 'antd';
import { defaultSelectStyle } from '../../forms/AntdFormComponents';
import styled from 'styled-components';
import DynamicIcon from '../DynamicIcon';

interface TaskGroupSelectOptionProps {
  $color: string;
}

const TaskGroupSelectOption = styled.div<TaskGroupSelectOptionProps>`
  color: ${p => p.$color};
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
`;

interface TaskGroupSelectProps {
  isDisabled: boolean;
  value: string | undefined;
  onChangeHandler: (opt: string) => void;
}

const TaskGroupSelect: React.FC<TaskGroupSelectProps> = ({
  isDisabled,
  value,
  onChangeHandler,
}) => {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [], isLoading: isTaskGroupsLoading } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const options = useMemo(() => {
    return existingGroups.map(g => ({
      value: g.id,
      label: (
        <TaskGroupSelectOption $color={g.color ?? 'black'}>
          <IconWrapper>
            <DynamicIcon icon={g.icon ?? 'AiOutlineRightCircle'} />
          </IconWrapper>
          {g.name}
        </TaskGroupSelectOption>
      ),
    }));
  }, [existingGroups]);

  return (
    <Spin spinning={isTaskGroupsLoading}>
      <Select
        disabled={isDisabled}
        value={value}
        onChange={onChangeHandler}
        options={options}
        style={defaultSelectStyle}
        dropdownMatchSelectWidth={false}
      />
    </Spin>
  );
};

export default TaskGroupSelect;
