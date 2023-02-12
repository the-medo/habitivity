import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import styled from 'styled-components';
import { ReduxState } from '../../store';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import dayjs, { Dayjs } from 'dayjs';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import DayOverview from './DashboardOverview/DayOverview';
import { RowGapCentered, RowGapWrap } from '../../components/global/RowGap';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';
import { getDateRange } from '../../helpers/date/getDateRange';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { Segmented } from '../../components/global/Segmented';
import StatisticBox from '../../components/global/StatisticBox';
import { Button } from 'antd';
import { GraphView } from '../../types/GraphView';
import { setDateRange, setSelectedDay } from '../screenSlice';
import DashboardDayWrapper from './DashboardOverview/DashboardDayWrapper';
import { WrapperColumn } from '../../components/global/Wrapper';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const segmentedAverageOptions: SegmentedLabeledOption[] = [
  {
    label: 'Daily trend',
    value: 'daily-trend',
  },
  {
    label: 'Average',
    value: 'average',
  },
];

const segmentedUnitOptions: SegmentedLabeledOption[] = [
  {
    label: 'Points',
    value: 'points',
  },
  {
    label: 'Values',
    value: 'units',
  },
];

const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTaskListId = useSelectedTaskListId();

  const { data: existingTasks } = useGetTasksByTaskListQuery(selectedTaskListId);
  const { data: existingGroups } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const [displayAverage, setDisplayAverage] = useState(false);
  const [showAllDays, setShowAllDays] = useState(false);

  useEffect(() => {
    dispatch(setSubpage(DashboardSubpage.OVERVIEW));
    dispatch(
      setDateRange({
        startDate: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
      }),
    );
  }, [dispatch]);

  const displayUnits = useSelector((state: ReduxState) => state.screen.displayUnits);
  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const taskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const task = useSelector((state: ReduxState) => state.screen.segmentTask);
  const groupsOrTasks = useSelector((state: ReduxState) => state.screen.segmentGroupsOrTasks);
  const stacked = useSelector(
    (state: ReduxState) => state.screen.segmentGraphView === GraphView.STACKED,
  );
  const selectedDay = useSelector((state: ReduxState) => state.screen.selectedDay);
  const { data: lastWeekData } = useGetCompletedDaysQuery(dateRange);

  const days: Dayjs[] = useMemo(() => {
    const dates = getDateRange(dateRange).reverse();
    dates.pop();
    return dates;
  }, [dateRange]);

  const handleSegmentedAverage = useCallback(
    (value: SegmentedLabeledOption['value']) => setDisplayAverage(value === 'average'),
    [],
  );

  const showWholeWeekHandler = useCallback(() => setShowAllDays(p => !p), []);
  const setSelectedDayHandler = useCallback(
    (x: string) => {
      dispatch(setSelectedDay(x));
    },
    [dispatch],
  );

  return (
    <RowGapWrap $gap="1rem">
      <WrapperColumn $grow={1} $basis="45rem">
        <LineDashboardOverview
          taskGroup={taskGroup}
          task={task}
          groupsOrTasks={groupsOrTasks}
          dateRange={dateRange}
          completedDaysData={lastWeekData}
          taskInfo={existingTasks}
          taskGroupInfo={existingGroups}
          stacked={stacked}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDayHandler}
        />
        <StatisticBox
          description="Data for last 7 days, up until yesterday"
          includeLastDay={false}
        />
        <RowGapCentered>
          <Segmented
            options={segmentedAverageOptions}
            onChange={handleSegmentedAverage}
            value={displayAverage ? 'average' : 'daily-trend'}
            block
          />
        </RowGapCentered>
        {days.map(
          (day, i) =>
            (showAllDays || i < 3) && (
              <DayOverview
                key={day.toString()}
                date={day}
                completedDaysData={lastWeekData}
                selectedTaskListId={selectedTaskListId}
                displayAverage={displayAverage}
                displayUnits={displayUnits}
              />
            ),
        )}
        <ButtonWrapper>
          <Button onClick={showWholeWeekHandler}>
            {showAllDays ? 'Hide last 4 days' : 'Show whole week'}
          </Button>
        </ButtonWrapper>
      </WrapperColumn>
      <WrapperColumn $basis="20rem" $grow={15}>
        <DashboardDayWrapper />
      </WrapperColumn>
    </RowGapWrap>
  );
};

export default DashboardOverview;
