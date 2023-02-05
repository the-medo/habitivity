import React, { useMemo } from 'react';
import { OverviewBoxColumn } from '../../../components/global/OverviewBox';
import DayStats from '../../../components/global/DayStats';
import styled from 'styled-components';
import DayPieGraph from '../../Day/TaskGroup/DayPieGraph';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { DashboardGroupsOrTasks } from '../dashboardSlice';
import { DayPieGraphDisplayType } from '../../Day/TaskGroup/DayPieGraphWrapper';

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
  align-items: center;
  justify-content: center;
`;

interface DashboardDayWrapperProps {
  date: string;
}

const DashboardDayWrapper: React.FC<DashboardDayWrapperProps> = ({ date }) => {
  const groupsOrTasks = useSelector((state: ReduxState) => state.dashboard.segmentGroupsOrTasks);
  const dayjsDate = useMemo(() => dayjs(date), [date]);
  const dayPieGraphDisplayType = useMemo(
    () =>
      groupsOrTasks === DashboardGroupsOrTasks.TASKS
        ? DayPieGraphDisplayType.TASKS
        : DayPieGraphDisplayType.GROUPS,
    [groupsOrTasks],
  );

  return (
    <OverviewBoxColumn>
      <DateWrapper>{dayjsDate.format('dddd, MMMM D, YYYY')}</DateWrapper>
      <TaskInfoWrapper>
        <DayStats date={date} />
        <DayGraphWrapper>
          <DayPieGraph dayPieGraphDisplayType={dayPieGraphDisplayType} selectedDate={dayjsDate} />
        </DayGraphWrapper>
      </TaskInfoWrapper>
    </OverviewBoxColumn>
  );
};

export default DashboardDayWrapper;
