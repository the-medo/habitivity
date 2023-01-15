import React, { useCallback } from 'react';
import { ReorderTask, TasksByGroup } from './TodayEditMode';
import styled from 'styled-components';
import { Reorder } from 'framer-motion';
import { TaskGroup } from '../../../types/TaskGroup';
import TaskRearrangeRow from './TaskRearrangeRow';
import { COLORS } from '../../../styles/CustomStyles';

const StyledReorderGroup = styled(Reorder.Group)`
  list-style-type: none;
  padding: 0.5rem;
  margin: 0.5rem;
  margin-block-start: 0;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
`;

interface TaskGroupRearrangeBoxProps {
  taskGroup: TaskGroup;
  items: ReorderTask[];
  setItems: React.Dispatch<React.SetStateAction<TasksByGroup>>;
}

const TaskGroupRearrangeBox: React.FC<TaskGroupRearrangeBoxProps> = ({
  items,
  setItems,
  taskGroup,
}) => {
  const onReorder = useCallback(
    (x: ReorderTask[]) => {
      console.log(x);
      setItems(i => ({
        ...i,
        [taskGroup.id]: x,
      }));
    },
    [setItems, taskGroup.id],
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
