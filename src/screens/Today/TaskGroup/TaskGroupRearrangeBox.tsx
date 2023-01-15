import React, { useCallback, useEffect } from 'react';
import { ReorderTask } from './TodayEditMode';
import styled from 'styled-components';
import { Reorder } from 'framer-motion';
import { TaskGroup } from '../../../types/TaskGroup';
import TaskRearrangeRow from './TaskRearrangeRow';
import { COLORS } from '../../../styles/CustomStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setEditItemsGroup } from '../todaySlice';
import { ReduxState } from '../../../store';

const StyledReorderGroup = styled(Reorder.Group)`
  list-style-type: none;
  padding: 0.5rem;
  margin: 0.5rem;
  margin-block-start: 0;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
`;

interface TaskGroupRearrangeBoxProps {
  taskGroup: TaskGroup;
}

const TaskGroupRearrangeBox: React.FC<TaskGroupRearrangeBoxProps> = ({ taskGroup }) => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state: ReduxState) =>
      state.todayReducer.editItems[taskGroup.id]?.filter(t => t.additionalAction === false) ?? [],
  );

  useEffect(() => {
    console.log(items);
  }, [items]);

  const onReorder = useCallback(
    (x: ReorderTask[]) => {
      dispatch(
        setEditItemsGroup({
          taskGroupId: taskGroup.id,
          items: x.map((t, i) => ({ ...t, position: i + 1 })),
        }),
      );
    },
    [dispatch, taskGroup.id],
  );

  if (items.length === 0) return null;

  return (
    <StyledReorderGroup values={items} onReorder={onReorder}>
      {items.map(t => (
        <Reorder.Item key={t.initialIndex} value={t}>
          <TaskRearrangeRow taskReorder={t} taskGroupId={taskGroup.id} />
        </Reorder.Item>
      ))}
    </StyledReorderGroup>
  );
};

export default TaskGroupRearrangeBox;
