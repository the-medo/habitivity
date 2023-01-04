import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import TaskTypeItem, { TaskTypeItemWrapper } from './TaskType/TaskTypeItem';
import { taskTypesWithDescription } from './taskTypesWithDescription';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { Select, Spin } from 'antd';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { defaultSelectStyle } from '../../components/forms/AntdFormComponents';
import { RowGap } from '../../components/global/RowGap';
import { useNavigate, useParams } from 'react-router-dom';

interface TaskTypeWrapperProps {
  $isTaskTypeSelected: boolean;
}

export const TaskTypeWrapper = styled.div<TaskTypeWrapperProps>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  flex-basis: ${({ $isTaskTypeSelected }) => ($isTaskTypeSelected ? '20%' : '100%')};

  min-width: 250px;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 2rem;

  ${TaskTypeItemWrapper} {
    max-width: 15%;
  }
`;

const TaskTypeSelector: React.FC = () => {
  const { taskGroupId } = useParams();
  const selectedTaskListId = useSelectedTaskListId();
  const { selectedTaskType } = useSelector((state: ReduxState) => state.taskCreationReducer);
  const { data: existingGroups = [], isLoading: isTaskGroupsLoading } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const navigate = useNavigate();
  const [taskGroupValue, setTaskGroupValue] = useState<string>();

  const handleTaskGroupChange = useCallback((opt: string) => {
    navigate(`/new-task/${opt}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (taskGroupId && existingGroups.length > 0) {
      const defaultVal = existingGroups.find(g => g.id === taskGroupId);
      if (defaultVal) {
        setTaskGroupValue(defaultVal.id);
      }
    }
  }, [taskGroupId, taskGroupValue, existingGroups]);

  const options = useMemo(() => {
    return existingGroups.map(g => ({
      value: g.id,
      label: g.name,
    }));
  }, [existingGroups]);

  return (
    <>
      <RowGap>
        <h2>Choose task group:</h2>
        <Spin spinning={isTaskGroupsLoading}>
          <Select
            value={taskGroupValue}
            onChange={handleTaskGroupChange}
            options={options}
            style={defaultSelectStyle}
            dropdownMatchSelectWidth={false}
          />
        </Spin>
      </RowGap>
      <h2>Choose task type:</h2>
      <TaskTypeWrapper $isTaskTypeSelected={!!selectedTaskType}>
        {taskTypesWithDescription.map(tt => (
          <Fragment key={tt.id}>
            <TaskTypeItem taskType={tt} />
          </Fragment>
        ))}
      </TaskTypeWrapper>
    </>
  );
};

export default TaskTypeSelector;
