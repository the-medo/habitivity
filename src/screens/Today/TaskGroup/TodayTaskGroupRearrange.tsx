import React, { useCallback, useEffect, useState } from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import styled from 'styled-components';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import { Reorder } from 'framer-motion';

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
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
`;

const StyledReorderGroup = styled(Reorder.Group)`
  list-style-type: none;
  margin: 0;
  margin-block-start: 0;
  padding: 0;
`;

interface TodayTaskGroupRearrangeProps {
  group: TaskGroup;
}

const TodayTaskGroupRearrange: React.FC<TodayTaskGroupRearrangeProps> = ({ group }) => {
  const taskInfo = useTasksByGroup(group.id);
  const [items, setItems] = useState<ReorderTask[]>([]);

  useEffect(() => {
    setItems(
      taskInfo.tasks.map(t => ({
        initialIndex: t.position,
        position: t.position,
        taskId: t.id,
        taskName: t.taskName,
      })),
    );
  }, [taskInfo.tasks]);

  const onReorder = useCallback(
    (x: ReorderTask[]) => setItems(x.map((g, i) => ({ ...g, position: i }))),
    [],
  );

  if (items.length === 0) return null;

  return (
    <TaskGroupWrapper>
      <StyledReorderGroup values={items} onReorder={onReorder}>
        {items.map(t => (
          <Reorder.Item key={t.initialIndex} value={t}>
            {t.taskName}
          </Reorder.Item>
        ))}
      </StyledReorderGroup>
    </TaskGroupWrapper>
  );
};

export default TodayTaskGroupRearrange;
