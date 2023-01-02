import React from 'react';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import styled from 'styled-components';
import TodayTaskGroup from './TaskGroup/TodayTaskGroup';

const TodayTaskGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TodayDefault: React.FC = () => {
  const selectedTaskListId = useSelectedTaskList()?.id ?? 'undefined';
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  return (
    <TodayTaskGroupWrapper>
      {existingGroups.map(g => (
        <TodayTaskGroup key={g.id} group={g} />
      ))}
    </TodayTaskGroupWrapper>
  );
};

export default TodayDefault;
