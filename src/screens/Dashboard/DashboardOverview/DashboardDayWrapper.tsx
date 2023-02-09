import React, { useMemo } from 'react';
import { OverviewBoxColumn } from '../../../components/global/OverviewBox';
import DayStats from '../../../components/global/DayStats';
import styled from 'styled-components';
import DayPieGraph from '../../Day/TaskGroup/DayPieGraph';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { DayPieGraphDisplayType } from '../../Day/TaskGroup/DayPieGraphWrapper';
import { useGetCompletedDaysQuery } from '../../../apis/apiTasks';
import { GroupsOrTasks } from '../../../types/GroupsOrTasks';

const TaskInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
`;

const DateWrapper = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
`;

const DayGraphWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

const DashboardDayWrapper: React.FC = () => {
  const date = useSelector((state: ReduxState) => state.screen.selectedDay);
  const groupsOrTasks = useSelector((state: ReduxState) => state.screen.segmentGroupsOrTasks);

  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const { data: lastWeekData } = useGetCompletedDaysQuery(dateRange);

  const dayjsDate = useMemo(() => dayjs(date), [date]);

  const completedDayData = useMemo(() => {
    if (lastWeekData) return lastWeekData[date];
    return undefined;
  }, [date, lastWeekData]);

  const dayPieGraphDisplayType = useMemo(
    () =>
      groupsOrTasks === GroupsOrTasks.TASKS
        ? DayPieGraphDisplayType.TASKS
        : DayPieGraphDisplayType.GROUPS,
    [groupsOrTasks],
  );

  return (
    <OverviewBoxColumn>
      <DateWrapper>{dayjsDate.format('dddd, MMMM D, YYYY')}</DateWrapper>
      <TaskInfoWrapper>
        <DayStats date={date} completedDayData={completedDayData} />
        <DayGraphWrapper>
          <DayPieGraph
            dayPieGraphDisplayType={dayPieGraphDisplayType}
            selectedDate={dayjsDate}
            completedDayData={completedDayData}
          />
        </DayGraphWrapper>
      </TaskInfoWrapper>
    </OverviewBoxColumn>
  );
};

export default DashboardDayWrapper;
