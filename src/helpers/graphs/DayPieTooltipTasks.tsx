import React from 'react';
import { PieTooltipProps } from '@nivo/pie';
import { TaskRawData } from '../../screens/Day/TaskGroup/DayPieGraph';
import styled from 'styled-components';
import { COLORS } from '../../styles/CustomStyles';
import SimpleOverviewTask from '../../components/global/SimpleOverviewTask';

const TooltipWrapper = styled.div`
  background-color: #f3f3f3;
  color: ${COLORS.PRIMARY_DARK};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
  min-width: 200px;
`;

const DayPieTooltipTasks: React.FC<PieTooltipProps<TaskRawData>> = e => {
  const t = e.datum;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!t.data?.groupInfo) return null;

  const completedDay = t.data.completedDay;
  const groupInfo = t.data.groupInfo;
  const points = completedDay ? completedDay.tasks[t.id]?.points : 0;

  return (
    <TooltipWrapper>
      <SimpleOverviewTask
        completedDay={completedDay}
        groupColor={groupInfo.color?.toString() ?? 'black'}
        groupIcon={groupInfo.icon}
        label={t.label}
        points={points ?? 0}
        task={t.data.task}
      />
    </TooltipWrapper>
  );
};

export default DayPieTooltipTasks;
