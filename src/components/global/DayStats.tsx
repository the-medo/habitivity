import React, { useMemo } from 'react';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { useGetCompletedDayQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import SimpleOverviewTaskGroup from './SimpleOverviewTaskGroup';
import { COLORS } from '../../styles/CustomStyles';
import styled from 'styled-components';
import { CompletedDay } from '../../helpers/types/CompletedDay';
import { skipToken } from '@reduxjs/toolkit/query';

const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  gap: 0.5rem;
  padding: 0.5rem;
  flex-basis: 10rem;
`;

interface DayStatsProps {
  date: string;
  completedDayData?: false | CompletedDay;
}

const DayStats: React.FC<DayStatsProps> = ({ date, completedDayData }) => {
  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingTasks } = useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const { data: completedDayResult } = useGetCompletedDayQuery(
    completedDayData ? skipToken : { date },
  );

  const completedDay = useMemo(
    () => completedDayData ?? completedDayResult,
    [completedDayData, completedDayResult],
  );

  return (
    <GroupWrapper>
      {existingGroups.map(group => {
        return (
          <SimpleOverviewTaskGroup
            key={group.id}
            groupName={group.name}
            groupColor={group.color ?? COLORS.PRIMARY_DARK}
            groupIcon={group.icon ?? 'AiOutlineRightCircle'}
            groupId={group.id}
            tasks={existingTasks?.filter(task => task.taskGroupId === group.id) ?? []}
            completedDay={completedDay}
            applyMinWidths={true}
          />
        );
      })}
    </GroupWrapper>
  );
};

export default DayStats;
