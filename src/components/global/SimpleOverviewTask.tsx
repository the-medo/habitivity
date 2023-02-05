import React from 'react';
import styled from 'styled-components';
import { generateColor } from '../../helpers/colors/generateColor';
import DynamicIcon from './DynamicIcon';
import { formatUnits } from '../../helpers/numbers/formatUnits';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import { countableString, pointCountable } from '../../helpers/unitSyntaxHelpers';
import { CompletedDay } from '../../helpers/types/CompletedDay';
import { Task } from '../../types/Tasks';

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

interface TaskGroupOverviewProps {
  completedDay: false | CompletedDay | undefined;
  label: string | number;
  groupColor: string;
  groupIcon: string;
  points: number;
  task: Task;
}

const SimpleOverviewTask: React.FC<TaskGroupOverviewProps> = ({
  completedDay,
  label,
  groupColor,
  groupIcon,
  points,
  task,
}) => {
  return (
    <>
      <TaskGroupHeader $color={groupColor}>
        <TooltipRow>
          <DynamicIcon icon={groupIcon} />
          {label}
        </TooltipRow>
      </TaskGroupHeader>
      <TooltipRow>
        <ColorCircle $color={groupColor} />
        <ColumnCellUnits>
          {formatUnits(task, completedDay ? completedDay.tasks[task.id]?.value : undefined)}
        </ColumnCellUnits>
        <ColumnCellPoints>
          {completedDay
            ? formatPoints(points) + ' ' + countableString(points, pointCountable)
            : '-'}
        </ColumnCellPoints>
      </TooltipRow>
    </>
  );
};

export default SimpleOverviewTask;
