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
  setSegmentTaskGroup,
} from './dashboardSlice';
import { useNavigate } from 'react-router-dom';
import { Segmented } from '../../components/global/Segmented';
import { RowGap } from '../../components/global/RowGap';
import styled from 'styled-components';
import { useGetTaskGroupsByTaskListQuery } from '../../apis/apiTaskGroup';
import { useSelectedTaskListId } from '../../hooks/useSelectedTaskListId';
import { COLORS } from '../../styles/CustomStyles';

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
  {
    label: 'Targets',
    value: DashboardSubpage.TARGETS,
    icon: <DynamicIcon icon="BiTask" />,
  },
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

const Wrapper = styled(RowGap)`
  align-items: center;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled.span`
  font-size: 120%;
`;

const ColoredSegmentedOption = styled.div<{ $color: CSSProperties['color'] }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${p => p.$color};
  font-size: 1rem;
`;

const DashboardSegments: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subpage = useSelector((state: ReduxState) => state.dashboard.subpage);
  const segmentTaskGroup = useSelector((state: ReduxState) => state.dashboard.segmentTaskGroup);
  const segmentGroupsOrTasks = useSelector(
    (state: ReduxState) => state.dashboard.segmentGroupsOrTasks,
  );
  const segmentGraphView = useSelector((state: ReduxState) => state.dashboard.segmentGraphView);

  const selectedTaskListId = useSelectedTaskListId();
  const { data: existingGroups = [], isFetching: isFetchingTaskGroups } =
    useGetTaskGroupsByTaskListQuery(selectedTaskListId);

  const segmentsTaskGroups = useMemo(() => {
    const segments: SegmentedLabeledOption[] = [
      {
        label: (
          <ColoredSegmentedOption $color={COLORS.PRIMARY}>
            <DynamicIcon icon="IoApps" />
            ALL
          </ColoredSegmentedOption>
        ),
        value: 'all',
      },
    ];

    existingGroups.forEach(taskGroup => {
      segments.push({
        label: (
          <ColoredSegmentedOption $color={taskGroup.color}>
            &nbsp;
            <DynamicIcon icon={taskGroup.icon ?? 'AiOutlineRightCircle'} />
            {/*{taskGroup.name}*/}
            &nbsp;
          </ColoredSegmentedOption>
        ),
        value: taskGroup.id,
      });
    });

    return segments;
  }, [existingGroups]);

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
    <Wrapper>
      <Title>View:</Title>
      {subpage && (
        <Segmented
          options={segmentedViewOptions}
          onChange={handleSegmentedViewChange}
          value={subpage}
        />
      )}
      <Segmented
        options={segmentsTaskGroups}
        onChange={handleSegmentedTaskGroupChange}
        value={segmentTaskGroup}
      />
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
    </Wrapper>
  );
};

export default DashboardSegments;
