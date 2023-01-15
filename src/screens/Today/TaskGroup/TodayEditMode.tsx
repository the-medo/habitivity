import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../styles/CustomStyles';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { useGetTasksByTaskListQuery } from '../../../apis/apiTasks';
import TaskGroupRearrangeBox from './TaskGroupRearrangeBox';
import { Button, Form } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { toggleEditMode } from '../todaySlice';
import { useDispatch } from 'react-redux';
import ButtonWrapper from '../../../components/global/ButtonWrapper';

export interface ReorderTask {
  initialIndex: number;
  position: number;
  taskId: string;
  taskName: string;
}

const TaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export type TasksByGroup = Record<string, ReorderTask[] | undefined>;

const TodayEditMode: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [], isFetching: isFetchingTaskGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const [items, setItems] = useState<TasksByGroup>({});
  const editModeHandler = useCallback(() => dispatch(toggleEditMode()), [dispatch]);

  useEffect(() => {
    if (!isFetchingTaskGroups && !isFetchingTasks) {
      const newItems: TasksByGroup = {};

      existingGroups.forEach(g => {
        newItems[g.id] = existingTasks
          .filter(t => t.taskGroupId === g.id)
          .map(t => ({
            initialIndex: t.position,
            position: t.position,
            taskId: t.id,
            taskName: t.taskName,
            taskGroup: t.taskGroupId,
          }));
      });

      setItems(newItems);
    }
  }, [existingTasks, existingGroups, isFetchingTaskGroups, isFetchingTasks]);

  return (
    <TaskGroupWrapper>
      <Form>
        {existingGroups.map(g => (
          <TaskGroupRearrangeBox
            key={g.id}
            taskGroup={g}
            items={items[g.id] ?? []}
            setItems={setItems}
          />
        ))}
        <ButtonWrapper>
          <Button
            onClick={editModeHandler}
            type="primary"
            icon={<DynamicIcon icon="AiOutlineCheck" />}
          >
            Save and continue
          </Button>
          <Button onClick={editModeHandler} type="default">
            Close
          </Button>
        </ButtonWrapper>
      </Form>
    </TaskGroupWrapper>
  );
};

export default TodayEditMode;
