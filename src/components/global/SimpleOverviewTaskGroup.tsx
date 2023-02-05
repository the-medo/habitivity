import React, { CSSProperties, useMemo } from 'react';
import DynamicIcon from './DynamicIcon';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import { formatUnits } from '../../helpers/numbers/formatUnits';
import styled from 'styled-components';
import { generateColor } from '../../helpers/colors/generateColor';
import { CompletedDay } from '../../helpers/types/CompletedDay';
import { Task } from '../../types/Tasks';
import { chooseColorsBasedOnCount } from '../../helpers/colors/chooseColorsBasedOnCount';
import { DatumId } from '@nivo/pie';

const TooltipRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

const TitleWithColor = styled(TooltipRow)`
  justify-content: flex-start;
`;

const TooltipColumn = styled.div<{ $minWidth?: CSSProperties['minWidth'] }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: ${p => p.$minWidth};
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

interface SimpleOverviewTaskGroupProps {
  completedDay: false | CompletedDay | undefined;
  tasks: Task[];
  groupId: DatumId;
  groupName: DatumId;
  groupColor: string;
  groupIcon: string;
  applyMinWidths?: boolean;
}

const SimpleOverviewTaskGroup: React.FC<SimpleOverviewTaskGroupProps> = ({
  completedDay,
  tasks,
  groupId,
  groupName,
  groupColor,
  groupIcon,
  applyMinWidths = false,
}) => {
  const taskColors = useMemo(
    () => chooseColorsBasedOnCount(groupColor, tasks.length),
    [groupColor, tasks.length],
  );

  return (
    <>
      <TaskGroupHeader $color={groupColor}>
        <TooltipRow>
          <DynamicIcon icon={groupIcon} />
          {groupName}
        </TooltipRow>
        <span>{completedDay ? formatPoints(completedDay.taskGroups[groupId]) : '-'}</span>
      </TaskGroupHeader>
      <TooltipRow>
        <TooltipColumn $minWidth={applyMinWidths ? '10rem' : undefined}>
          {tasks.map((task, i) => (
            <TitleWithColor key={`color-${task.id}`}>
              <ColorCircle $color={taskColors[i]} />
              <ColumnCell>{task.taskName}</ColumnCell>
            </TitleWithColor>
          ))}
        </TooltipColumn>
        <TooltipColumn $minWidth={applyMinWidths ? '3rem' : undefined}>
          {tasks.map(task => (
            <ColumnCellPoints key={`points-${task.id}`}>
              {completedDay ? formatPoints(completedDay.tasks[task.id]?.points) : '-'}
            </ColumnCellPoints>
          ))}
        </TooltipColumn>
        <TooltipColumn $minWidth={applyMinWidths ? '6rem' : undefined}>
          {tasks.map(task => (
            <ColumnCellUnits key={`units-${task.id}`}>
              {formatUnits(task, completedDay ? completedDay.tasks[task.id]?.value : undefined)}
            </ColumnCellUnits>
          ))}
        </TooltipColumn>
      </TooltipRow>
    </>
  );
};

export default SimpleOverviewTaskGroup;
