import React from 'react';
import { TaskGroup } from '../../../types/TaskGroup';
import styled from 'styled-components';
import { useTasksByGroup } from '../../../hooks/useTasksByGroup';
import { COLORS } from '../../../styles/CustomStyles';
import EmptyGroupMessage from './EmptyGroupMessage';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TaskComponent from '../../../components/global/TaskComponent/TaskComponent';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import TaskComponentWrapper from '../../../components/global/TaskComponent/TaskComponentWrapper';
import DynamicIcon from '../../../components/global/DynamicIcon';

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
  const displayMode = useSelector((state: ReduxState) => state.todayReducer.displayMode);

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
                <Button icon={<DynamicIcon icon="AiOutlinePlus" />} />
              </Link>
            </Tooltip>
          )}
        </HeaderPart>
      </TaskGroupHeader>
      <TaskComponentWrapper displayMode={displayMode}>
        {taskInfo.tasks.map(t => {
          console.log('WTF', t.id);
          return <TaskComponent key={t.id} task={t} displayMode={displayMode} />;
        })}
      </TaskComponentWrapper>
    </TaskGroupWrapper>
  );
};

export default TodayTaskGroup;
