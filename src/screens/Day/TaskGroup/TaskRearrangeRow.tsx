import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReorderTask } from './DayEditMode';
import TaskGroupSelect from '../../../components/global/TaskGroupSelect/TaskGroupSelect';
import { FormItem, validateTriggerDefault } from '../../../components/forms/AntdFormComponents';
import { Button, Input } from 'antd';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { COLORS } from '../../../styles/CustomStyles';
import { useDispatch } from 'react-redux';
import { changeGroupOfEditItem, setEditItemsTask } from '../daySlice';

const StyledInput = styled(Input)``;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem;
  gap: 0.5rem;

  ${FormItem} {
    margin-bottom: 0;
    width: 20rem;
  }

  &:hover {
    background-color: ${COLORS.PRIMARY_LIGHT};
  }
`;

interface TaskRearrangeRowProps {
  taskReorder: ReorderTask;
  taskGroupId: string;
}

const HandleIcon = styled(DynamicIcon).attrs({ icon: 'AiOutlineDrag', small: true })``;

const TaskRearrangeRow: React.FC<TaskRearrangeRowProps> = ({ taskReorder, taskGroupId }) => {
  const dispatch = useDispatch();
  const [initialTaskName] = useState(taskReorder.taskName);

  const onChangeGroupHandler = useCallback(
    (opt: string) => {
      dispatch(
        changeGroupOfEditItem({
          originalTaskGroupId: taskGroupId,
          newTaskGroupId: opt,
          taskId: taskReorder.taskId,
        }),
      );
      console.log(opt);
    },
    [dispatch, taskGroupId, taskReorder],
  );

  const onArchiveHandler = useCallback(() => {
    dispatch(
      setEditItemsTask({
        taskGroupId,
        item: { ...taskReorder, additionalAction: 'archive' },
      }),
    );
  }, [dispatch, taskGroupId, taskReorder]);

  const onDeleteHandler = useCallback(() => {
    dispatch(
      setEditItemsTask({
        taskGroupId,
        item: { ...taskReorder, additionalAction: 'delete' },
      }),
    );
  }, [dispatch, taskGroupId, taskReorder]);

  const onRestoreHandler = useCallback(() => {
    dispatch(
      setEditItemsTask({
        taskGroupId,
        item: { ...taskReorder, additionalAction: false },
      }),
    );
  }, [dispatch, taskGroupId, taskReorder]);

  const handleIcon = useMemo(() => <HandleIcon />, []);
  const deleteOutlinedIcon = useMemo(() => <DynamicIcon icon="AiOutlineDelete" />, []);
  const archiveIcon = useMemo(() => <DynamicIcon icon="GoArchive" />, []);
  const restoreIcon = useMemo(() => <DynamicIcon icon="AiOutlineRest" />, []);
  const initialValue = taskReorder.taskName;
  const rules = useMemo(() => [{ required: true, message: `` }], []);

  return (
    <RowWrapper>
      <FormItem
        name={taskReorder.taskId}
        validateTrigger={validateTriggerDefault}
        colon={false}
        rules={rules}
        initialValue={initialValue}
      >
        <StyledInput
          prefix={handleIcon}
          placeholder={initialTaskName}
          disabled={taskReorder.additionalAction !== false}
        />
      </FormItem>
      <TaskGroupSelect
        isDisabled={taskReorder.additionalAction !== false}
        value={taskGroupId}
        onChangeHandler={onChangeGroupHandler}
      />
      {taskReorder.additionalAction !== 'archive' && (
        <Button icon={archiveIcon} onClick={onArchiveHandler} />
      )}
      {taskReorder.additionalAction === 'archive' && (
        <Button icon={restoreIcon} onClick={onRestoreHandler} />
      )}
      {taskReorder.additionalAction !== 'delete' && (
        <Button icon={deleteOutlinedIcon} onClick={onDeleteHandler} danger />
      )}
      {taskReorder.additionalAction === 'delete' && (
        <Button icon={restoreIcon} onClick={onRestoreHandler} />
      )}
    </RowWrapper>
  );
};

export default TaskRearrangeRow;
