import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardSubpage, setSubpage } from './dashboardSlice';
import styled from 'styled-components';
import { ReduxState } from '../../store';
import { useGetCompletedDaysQuery, useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import dayjs, { Dayjs } from 'dayjs';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import DayOverview from './DashboardOverview/DayOverview';
import { RowGap } from '../../components/global/RowGap';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import LineDashboardOverview from './DashboardOverview/LineDashboardOverview';
import { getDateRange } from '../../helpers/date/getDateRange';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import { Segmented } from '../../components/global/Segmented';
import { RowGapCentered } from '../../components/global/RowGapCentered';
import DashboardStatisticBox from './DashboardStatisticBox';
import { Button } from 'antd';
import { GraphView } from '../../types/GraphView';
import { setDateRange, setSelectedDay } from '../screenSlice';

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-basis: 20rem;
  flex-grow: 1;
`;

const Row1 = styled(RowGap)`
  gap: 1rem;
  flex-wrap: wrap;
`;

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
  const [displayUnits, setDisplayUnits] = useState(false);
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

  const handleSegmentedUnits = useCallback(
    (value: SegmentedLabeledOption['value']) => setDisplayUnits(value === 'units'),
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
    <Row1>
      <OverviewWrapper>
        <RowGapCentered>
          <Segmented
            options={segmentedAverageOptions}
            onChange={handleSegmentedAverage}
            value={displayAverage ? 'average' : 'daily-trend'}
            block
          />
          {task !== 'all' && (
            <Segmented
              options={segmentedUnitOptions}
              onChange={handleSegmentedUnits}
              value={displayUnits ? 'units' : 'points'}
              block
            />
          )}
        </RowGapCentered>
        <DashboardStatisticBox
          dateRange={dateRange}
          completedDaysData={lastWeekData}
          taskGroup={taskGroup}
          task={task}
          isUnits={displayUnits}
          description="Data for last 7 days, up until yesterday"
        />
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
      </OverviewWrapper>
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
    </Row1>
  );
};

export default DashboardOverview;
