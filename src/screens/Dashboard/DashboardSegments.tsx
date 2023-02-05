import React, { CSSProperties, useCallback, useMemo } from 'react';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import DynamicIcon from '../../components/global/DynamicIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import {
  DashboardGraphView,
  DashboardGroupsOrTasks,
  DashboardSubpage,
  setSegmentGraphView,
  setSegmentGroupsOrTasks,
  setSegmentTask,
  setSegmentTaskGroup,
} from './dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { Segmented } from '../../components/global/Segmented';
import { RowGap } from '../../components/global/RowGap';
import styled from 'styled-components';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { COLORS } from '../../styles/CustomStyles';
import { Divider } from 'antd';
import { useGetTasksByTaskListQuery } from '../../apis/apiTasks';

const segmentedViewOptions: SegmentedLabeledOption[] = [
  {
    label: 'Overview',
    value: DashboardSubpage.OVERVIEW,
    icon: <DynamicIcon icon="AiOutlineLineChart" />,
  },
  {
    label: 'Month',
    value: DashboardSubpage.MONTH,
    icon: <DynamicIcon icon="AiOutlineCalendar" />,
  },
  /*{
    label: 'Targets',
    value: DashboardSubpage.TARGETS,
    icon: <DynamicIcon icon="BiTask" />,
  },*/
];

const segmentedGroupsOrTasksOptions: SegmentedLabeledOption[] = [
  {
    label: 'Task groups',
    value: DashboardGroupsOrTasks.GROUPS,
    icon: <DynamicIcon icon="AiOutlineGroup" />,
  },
  {
    label: 'Tasks',
    value: DashboardGroupsOrTasks.TASKS,
    icon: <DynamicIcon icon="FaTasks" />,
  },
];

const segmentedGraphViewOptions: SegmentedLabeledOption[] = [
  {
    label: 'Stacked',
    value: DashboardGraphView.STACKED,
    icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
  {
    label: 'Not stacked',
    value: DashboardGraphView.NOTSTACKED,
    icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
];

const ColOfSegments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SegmentedRow = styled(RowGap)`
  align-items: center;
  font-weight: 500;
  flex-wrap: wrap;
`;

const ColoredSegmentedOption = styled.div<{ $color: CSSProperties['color'] }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${p => p.$color};
  font-size: 1rem;
`;

const allSegment: SegmentedLabeledOption = {
  label: (
    <ColoredSegmentedOption $color={COLORS.PRIMARY_DARK}>
      <DynamicIcon icon="IoApps" />
      ALL
    </ColoredSegmentedOption>
  ),
  value: 'all',
};

const DashboardSegments: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subpage = useSelector((state: ReduxState) => state.dashboard.subpage);
  const segmentTaskGroup = useSelector((state: ReduxState) => state.dashboard.segmentTaskGroup);
  const segmentTask = useSelector((state: ReduxState) => state.dashboard.segmentTask);
  const segmentGroupsOrTasks = useSelector(
    (state: ReduxState) => state.dashboard.segmentGroupsOrTasks,
  );
  const segmentGraphView = useSelector((state: ReduxState) => state.dashboard.segmentGraphView);

  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [] } = useGetTaskGroupsByTaskListQuery(selectedTaskListId);
  const { data: existingTasks = [] } = useGetTasksByTaskListQuery(selectedTaskListId);

  const segmentsTaskGroups = useMemo(() => {
    const segments: SegmentedLabeledOption[] = [allSegment];

    existingGroups.forEach(taskGroup => {
      segments.push({
        label: (
          <ColoredSegmentedOption $color={taskGroup.color}>
            &nbsp;
            <DynamicIcon icon={taskGroup.icon ?? 'AiOutlineRightCircle'} />
            &nbsp;
          </ColoredSegmentedOption>
        ),
        value: taskGroup.id,
      });
    });

    return segments;
  }, [existingGroups]);

  const segmentsTasks = useMemo(() => {
    if (segmentTaskGroup === 'all') return [];

    const g = existingGroups.find(g => g.id === segmentTaskGroup);
    const segments: SegmentedLabeledOption[] = [allSegment];
    if (g) {
      const tasks = existingTasks.filter(t => t.taskGroupId === g.id);

      tasks.forEach(t => {
        segments.push({
          label: <ColoredSegmentedOption $color={g.color}>{t.taskName}</ColoredSegmentedOption>,
          value: t.id,
        });
      });
    }

    return segments;
  }, [segmentTaskGroup, existingTasks, existingGroups]);

  const handleSegmentedViewChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      navigate(`${value}`);
    },
    [navigate],
  );

  const handleSegmentedTaskGroupChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      dispatch(setSegmentTaskGroup(`${value}`));
    },
    [dispatch],
  );

  const handleSegmentedTaskChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      dispatch(setSegmentTask(`${value}`));
    },
    [dispatch],
  );

  const handleSegmentedGroupsOrTasksChange = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      dispatch(setSegmentGroupsOrTasks(value as DashboardGroupsOrTasks));
    },
    [dispatch],
  );

  const handleSegmentedGraphView = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      dispatch(setSegmentGraphView(value as DashboardGraphView));
    },
    [dispatch],
  );

  return (
    <>
      <ColOfSegments>
        <SegmentedRow>
          {subpage && (
            <Segmented
              options={segmentedViewOptions}
              onChange={handleSegmentedViewChange}
              value={subpage}
            />
          )}
          <Segmented
            options={segmentedGroupsOrTasksOptions}
            onChange={handleSegmentedGroupsOrTasksChange}
            value={segmentGroupsOrTasks}
          />
          <Segmented
            options={segmentedGraphViewOptions}
            onChange={handleSegmentedGraphView}
            value={segmentGraphView}
          />
        </SegmentedRow>
        <SegmentedRow>
          <Segmented
            options={segmentsTaskGroups}
            onChange={handleSegmentedTaskGroupChange}
            value={segmentTaskGroup}
          />
          <Segmented
            options={segmentsTasks}
            onChange={handleSegmentedTaskChange}
            value={segmentTask}
          />
        </SegmentedRow>
      </ColOfSegments>
      <Divider />
    </>
  );
};

export default DashboardSegments;
