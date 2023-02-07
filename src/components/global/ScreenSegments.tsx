import React, { CSSProperties, useCallback, useMemo } from 'react';
import { SegmentedLabeledOption } from 'antd/es/segmented';
import DynamicIcon from './DynamicIcon';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { DashboardSubpage } from '../../screens/Dashboard/dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { Segmented } from './Segmented';
import { RowGap } from './RowGap';
import styled from 'styled-components';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { COLORS } from '../../styles/CustomStyles';
import { Divider } from 'antd';
import { useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { GroupsOrTasks } from '../../types/GroupsOrTasks';
import { GraphView } from '../../types/GraphView';
import {
  setSegmentGraphView,
  setSegmentGroupsOrTasks,
  setSegmentTask,
  setSegmentTaskGroup,
} from '../../screens/screenSlice';

const segmentedDashboardViewOptions: SegmentedLabeledOption[] = [
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
    value: GroupsOrTasks.GROUPS,
    icon: <DynamicIcon icon="AiOutlineGroup" />,
  },
  {
    label: 'Tasks',
    value: GroupsOrTasks.TASKS,
    icon: <DynamicIcon icon="FaTasks" />,
  },
];

const segmentedGraphViewOptions: SegmentedLabeledOption[] = [
  {
    label: 'Stacked',
    value: GraphView.STACKED,
    icon: <DynamicIcon icon="MdOutlineStackedLineChart" />,
  },
  {
    label: 'Not stacked',
    value: GraphView.NOTSTACKED,
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

interface ScreenSegmentsProps {
  displayDashboardViewOptions?: boolean;
  displayGroupsOrTasks?: boolean;
  displayGraphView?: boolean;
  displayTaskGroups?: boolean;
  displayTasks?: boolean;
}

const ScreenSegments: React.FC<ScreenSegmentsProps> = ({
  displayDashboardViewOptions = false,
  displayGroupsOrTasks = true,
  displayGraphView = true,
  displayTaskGroups = true,
  displayTasks = true,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dashboardSubpage = useSelector((state: ReduxState) => state.dashboard.subpage);
  const segmentTaskGroup = useSelector((state: ReduxState) => state.screen.segmentTaskGroup);
  const segmentTask = useSelector((state: ReduxState) => state.screen.segmentTask);
  const segmentGroupsOrTasks = useSelector(
    (state: ReduxState) => state.screen.segmentGroupsOrTasks,
  );
  const segmentGraphView = useSelector((state: ReduxState) => state.screen.segmentGraphView);

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
      dispatch(setSegmentGroupsOrTasks(value as GroupsOrTasks));
    },
    [dispatch],
  );

  const handleSegmentedGraphView = useCallback(
    (value: SegmentedLabeledOption['value']) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      dispatch(setSegmentGraphView(value as GraphView));
    },
    [dispatch],
  );

  return (
    <>
      <ColOfSegments>
        {((displayDashboardViewOptions && dashboardSubpage) ||
          displayGroupsOrTasks ||
          displayGraphView) && (
          <SegmentedRow>
            {displayDashboardViewOptions && dashboardSubpage && (
              <Segmented
                options={segmentedDashboardViewOptions}
                onChange={handleSegmentedViewChange}
                value={dashboardSubpage}
              />
            )}
            {displayGroupsOrTasks && (
              <Segmented
                options={segmentedGroupsOrTasksOptions}
                onChange={handleSegmentedGroupsOrTasksChange}
                value={segmentGroupsOrTasks}
              />
            )}
            {displayGraphView && (
              <Segmented
                options={segmentedGraphViewOptions}
                onChange={handleSegmentedGraphView}
                value={segmentGraphView}
              />
            )}
          </SegmentedRow>
        )}
        {(displayTaskGroups || displayTasks) && (
          <SegmentedRow>
            {displayTaskGroups && (
              <Segmented
                options={segmentsTaskGroups}
                onChange={handleSegmentedTaskGroupChange}
                value={segmentTaskGroup}
              />
            )}
            {displayTasks && (
              <Segmented
                options={segmentsTasks}
                onChange={handleSegmentedTaskChange}
                value={segmentTask}
              />
            )}
          </SegmentedRow>
        )}
      </ColOfSegments>
      <Divider />
    </>
  );
};

export default ScreenSegments;
