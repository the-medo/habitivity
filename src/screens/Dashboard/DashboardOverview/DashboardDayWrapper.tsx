import React, { useCallback, useMemo } from 'react';
import { OverviewBoxColumn } from '../../../components/global/OverviewBox';
import DayStats from '../../../components/global/DayStats';
import styled from 'styled-components';
import DayPieGraph from '../../Day/TaskGroup/DayPieGraph';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import { DayPieGraphDisplayType } from '../../Day/TaskGroup/DayPieGraphWrapper';
import { useGetCompletedDaysQuery } from '../../../apis/apiTasks';
import { GroupsOrTasks } from '../../../types/GroupsOrTasks';
import JournalEditor from '../../Journal/JournalEditor';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import DynamicIcon from '../../../components/global/DynamicIcon';
import { Segmented } from '../../../components/global/Segmented';
import { setSegmentOverviewOrJournal, setSegmentTaskGroup } from '../../screenSlice';

export enum OverviewOrJournal {
  OVERVIEW = 'overview',
  JOURNAL = 'journal',
}

const segmentedOverviewOrJournalOptions: SegmentedLabeledOption[] = [
  {
    label: 'Overview',
    value: OverviewOrJournal.OVERVIEW,
    icon: <DynamicIcon icon="AiOutlinePieChart" />,
  },
  {
    label: 'Journal',
    value: OverviewOrJournal.JOURNAL,
    icon: <DynamicIcon icon="BsJournalText" />,
  },
];

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
  const dispatch = useDispatch();
  const date = useSelector((state: ReduxState) => state.screen.selectedDay);
  const groupsOrTasks = useSelector((state: ReduxState) => state.screen.segmentGroupsOrTasks);
  const taskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const dateRange = useSelector((state: ReduxState) => state.screen.dateRange);
  const segmentOverviewOrJournal = useSelector(
    (state: ReduxState) => state.screen.segmentOverviewOrJournal,
  );
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

  const handleSegmentedOverviewOrJournalChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      dispatch(setSegmentOverviewOrJournal(value as OverviewOrJournal));
    },
    [dispatch],
  );

  return (
    <OverviewBoxColumn>
      <DateWrapper>{dayjsDate.format('dddd, MMMM D, YYYY')}</DateWrapper>
      <Segmented
        options={segmentedOverviewOrJournalOptions}
        onChange={handleSegmentedOverviewOrJournalChange}
        value={segmentOverviewOrJournal}
      />
      <TaskInfoWrapper>
        {segmentOverviewOrJournal === OverviewOrJournal.JOURNAL && (
          <JournalEditor selectedDate={date} />
        )}
        {segmentOverviewOrJournal === OverviewOrJournal.OVERVIEW && (
          <>
            <DayGraphWrapper>
              <DayPieGraph
                dayPieGraphDisplayType={dayPieGraphDisplayType}
                selectedDate={dayjsDate}
                completedDayData={completedDayData}
                taskGroup={taskGroup}
              />
            </DayGraphWrapper>
            <DayStats date={date} completedDayData={completedDayData} />
          </>
        )}
      </TaskInfoWrapper>
    </OverviewBoxColumn>
  );
};

export default DashboardDayWrapper;
