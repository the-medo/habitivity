import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useSelectedTaskListId } from '../../../hooks/useSelectedTaskListId';
import { useGetTaskGroupsByTaskListQuery } from '../../../apis/apiTaskGroup';
import { useGetTasksByTaskListQuery, useRearrangeTasksMutation } from '../../../apis/apiTasks';
import TaskGroupRearrangeBox from './TaskGroupRearrangeBox';
import { Button, Form, Spin } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { setEditItems, toggleEditMode } from '../todaySlice';
import { useDispatch } from 'react-redux';
import ButtonWrapper from '../../../components/global/ButtonWrapper';
import AdditionalActionBox from './AdditionalActionBox';

export type AdditionalActionType = 'archive' | 'delete';

export interface ReorderTask {
  initialIndex: number;
  position: number;
  taskId: string;
  taskName: string;
  additionalAction: AdditionalActionType | false;
}

const TaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export type TasksByGroup = Record<string, ReorderTask[] | undefined>;

export type TodayEditModeFormFields = Record<string, string | undefined>;

const TodayEditMode: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm<TodayEditModeFormFields>();
  // const formData = Form.useWatch<FormInstance<FormFields>>([], form);
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [], isFetching: isFetchingTaskGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: existingTasks = [], isFetching: isFetchingTasks } =
    useGetTasksByTaskListQuery(selectedTaskListId);
  const [rearrangeAndUpdateTasks, { isLoading: isCommitting, isSuccess }] =
    useRearrangeTasksMutation();

  const editModeHandler = useCallback(() => dispatch(toggleEditMode()), [dispatch]);
  const isFetched = useMemo(
    () => !isFetchingTaskGroups && !isFetchingTasks,
    [isFetchingTasks, isFetchingTaskGroups],
  );

  useEffect(() => {
    if (isFetched) {
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
            additionalAction: t.isActive ? false : 'archive',
          }));
      });

      dispatch(setEditItems(newItems));
    }
  }, [existingTasks, existingGroups, isFetched, dispatch]);

  const onSubmit = useCallback(
    (values: TodayEditModeFormFields) => {
      if (isFetched) {
        rearrangeAndUpdateTasks({ newNames: values });
      }
    },
    [isFetched, rearrangeAndUpdateTasks],
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleEditMode());
    }
  }, [dispatch, isSuccess]);

  return (
    <TaskGroupWrapper>
      <Spin spinning={isCommitting}>
        <Form onFinish={onSubmit} form={form}>
          {existingGroups.map(g => (
            <TaskGroupRearrangeBox key={g.id} taskGroup={g} />
          ))}
          <AdditionalActionBox action="archive" />
          <AdditionalActionBox action="delete" />
          <ButtonWrapper>
            <Button type="primary" icon={<DynamicIcon icon="AiOutlineCheck" />} htmlType="submit">
              Save and continue
            </Button>
            <Button onClick={editModeHandler} type="default">
              Close
            </Button>
          </ButtonWrapper>
        </Form>
      </Spin>
    </TaskGroupWrapper>
  );
};

export default TodayEditMode;
