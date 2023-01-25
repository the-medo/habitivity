import React from 'react';
import { PieTooltipProps } from '@nivo/pie';
import { TaskRawData } from '../../screens/Day/TaskGroup/DayPieGraph';
import styled from 'styled-components';
import { COLORS } from '../../styles/CustomStyles';
import { formatPoints } from '../numbers/formatPoints';
import { generateColor } from '../colors/generateColor';
import { formatUnits } from '../numbers/formatUnits';
import DynamicIcon from '../../components/global/DynamicIcon';
import { countableString, pointCountable } from '../unitSyntaxHelpers';

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

const TooltipRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
`;

const ColumnCell = styled.div`
  display: flex;
  height: 1.25rem;
  align-items: center;
  justify-content: flex-end;
`;

const ColumnCellUnits = styled(ColumnCell)`
  font-style: italic;
`;

const ColumnCellPoints = styled(ColumnCell)`
  font-weight: 500;
`;

const ColorCircle = styled.div<{ $color: string }>`
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid black;
  border-radius: 50%;
  background-color: ${p => p.$color};
`;

const TaskGroupHeader = styled.div<{ $color: string }>`
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${p => p.$color};
  background-color: ${p => generateColor(p.$color, 0)};
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.25rem;
  align-items: center;
  justify-content: space-between;
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
      <TaskGroupHeader $color={groupInfo.color?.toString() ?? 'black'}>
        <TooltipRow>
          <DynamicIcon icon={groupInfo.icon} />
          {t.label}
        </TooltipRow>
      </TaskGroupHeader>
      <TooltipRow>
        <ColorCircle $color={t.data.color ?? 'black'} />
        <ColumnCellUnits>
          {formatUnits(t.data.task, completedDay ? completedDay.tasks[t.id]?.value : undefined)}
        </ColumnCellUnits>
        <ColumnCellPoints>
          {completedDay
            ? formatPoints(points) + ' ' + countableString(points, pointCountable)
            : '-'}
        </ColumnCellPoints>
      </TooltipRow>
    </TooltipWrapper>
  );
};

export default DayPieTooltipTasks;
