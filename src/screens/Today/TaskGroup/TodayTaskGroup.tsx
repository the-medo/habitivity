import React from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import styled from 'styled-components';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import EmptyGroupMessage from './EmptyGroupMessage';
import { icons, IconType } from '../../../components/icons/icons';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TaskComponent, {
  TaskDisplayMode,
} from '../../../components/global/TaskComponent/TaskComponent';

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
  margin-left: 0.5rem;
  padding: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
`;

const HeaderPart = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const TodayTaskGroup: React.FC<TodayTaskGroupProps> = ({ group }) => {
  const taskInfo = useTasksByGroup(group.id);

  return (
    <TaskGroupWrapper>
      <TaskGroupHeader>
        <HeaderPart>
          <HeaderTitle>{group.name}</HeaderTitle>
          <HeaderPoints>20</HeaderPoints>
        </HeaderPart>
        <HeaderPart>
          {taskInfo.tasks.length === 0 && <EmptyGroupMessage taskGroupId={group.id} />}
          {taskInfo.tasks.length > 0 && (
            <Tooltip title="New task">
              <Link to={`/new-task/${group.id}`}>
                <Button icon={icons[IconType.PLUS_OUTLINED]} />
              </Link>
            </Tooltip>
          )}
        </HeaderPart>
      </TaskGroupHeader>
      <TaskGroupContent>
        {taskInfo.tasks.map(t => (
          <TaskComponent key={t.id} task={t} displayMode={TaskDisplayMode.BOXES} />
        ))}
      </TaskGroupContent>
    </TaskGroupWrapper>
  );
};

export default TodayTaskGroup;
