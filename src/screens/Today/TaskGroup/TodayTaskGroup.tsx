import React, { useCallback, useState } from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import styled from 'styled-components';
import TodayTask from './TodayTask';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import EmptyGroupMessage from './EmptyGroupMessage';
import { icons, IconType } from '../../../components/icons/icons';
import { Button, Tooltip } from 'antd';

interface TodayTaskGroupProps {
  group: TaskGroup;
}

const TaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
`;

const TaskGroupHeader = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
`;

const TaskGroupContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderTitle = styled.h2`
  margin-bottom: 0;
`;

const HeaderPoints = styled.div`
  background-color: ${COLORS.PRIMARY_LIGHT};
  padding: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
`;

const HeaderPart = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const EditModeButton = styled(Button)``;

const TodayTaskGroup: React.FC<TodayTaskGroupProps> = ({ group }) => {
  const taskInfo = useTasksByGroup(group.id);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    setEditMode(p => !p);
  }, []);

  return (
    <TaskGroupWrapper>
      <TaskGroupHeader>
        <HeaderPart>
          <HeaderTitle>{group.name}</HeaderTitle>
          <HeaderPoints>20</HeaderPoints>
        </HeaderPart>
        <HeaderPart>
          {taskInfo.tasks.length === 0 && <EmptyGroupMessage taskGroupId={group.id} />}
          {group.position === 0 && !editMode && (
            <Tooltip title="Edit mode">
              <EditModeButton
                onClick={toggleEditMode}
                type="primary"
                icon={icons[IconType.EDIT_OUTLINED]}
              />
            </Tooltip>
          )}
        </HeaderPart>
      </TaskGroupHeader>
      <TaskGroupContent>
        {taskInfo.tasks.map(t => (
          <TodayTask key={t.id} task={t} />
        ))}
      </TaskGroupContent>
    </TaskGroupWrapper>
  );
};

export default TodayTaskGroup;
