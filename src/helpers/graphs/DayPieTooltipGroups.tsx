import React from 'react';
import { PieTooltipProps } from '@nivo/pie';
import { GroupRawData } from '../../screens/Day/TaskGroup/DayPieGraph';
import styled from 'styled-components';
import { COLORS } from '../../styles/CustomStyles';
import { formatPoints } from '../numbers/formatPoints';
import { generateColor } from '../colors/generateColor';
import { formatUnits } from '../numbers/formatUnits';
import DynamicIcon from '../../components/global/DynamicIcon';

const TooltipWrapper = styled.div`
  background-color: #f3f3f3;
  color: ${COLORS.PRIMARY_DARK};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  align-items: center;
`;

const TooltipRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const TooltipColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ColumnCell = styled.div`
  display: flex;
  height: 1.25rem;
  align-items: center;
`;

const ColumnCellPoints = styled(ColumnCell)`
  padding-left: 0.75rem;
  justify-content: flex-end;
  font-weight: 500;
`;

const ColumnCellUnits = styled(ColumnCell)`
  padding-left: 0.75rem;
  justify-content: flex-end;
  font-style: italic;
  font-size: 80%;
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

const DayPieTooltipGroups: React.FC<PieTooltipProps<GroupRawData>> = e => {
  const t = e.datum;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!t.data?.tasks) return null;

  const completedDay = t.data.completedDay;

  return (
    <TooltipWrapper>
      <TaskGroupHeader $color={t.color}>
        <TooltipRow>
          <DynamicIcon icon={t.data.icon} />
          {t.label}
        </TooltipRow>
        <span>{completedDay ? formatPoints(completedDay.taskGroups[t.id]) : '-'}</span>
      </TaskGroupHeader>
      <TooltipRow>
        <TooltipColumn>
          {t.data.tasks.map((task, i) => (
            <ColorCircle key={`color-${task.id}`} $color={t.data.taskColors[i]} />
          ))}
        </TooltipColumn>
        <TooltipColumn>
          {t.data.tasks.map(task => (
            <ColumnCell key={`name-${task.id}`}>{task.taskName}</ColumnCell>
          ))}
        </TooltipColumn>
        <TooltipColumn>
          {t.data.tasks.map(task => (
            <ColumnCellPoints key={`points-${task.id}`}>
              {completedDay ? formatPoints(completedDay.tasks[task.id]?.points) : '-'}
            </ColumnCellPoints>
          ))}
        </TooltipColumn>
        <TooltipColumn>
          {t.data.tasks.map(task => (
            <ColumnCellUnits key={`units-${task.id}`}>
              {formatUnits(task, completedDay ? completedDay.tasks[task.id]?.value : undefined)}
            </ColumnCellUnits>
          ))}
        </TooltipColumn>
      </TooltipRow>
    </TooltipWrapper>
  );
};

export default DayPieTooltipGroups;
