import React from 'react';
import styled from 'styled-components';
import { SimpleOverviewTaskGroupHeader, SimpleOverviewTooltipRow } from './SimpleOverviewTaskGroup';
import { Task } from '../../types/Tasks';
import { CompletedDay } from '../../helpers/types/CompletedDay';
import { formatPoints } from '../../helpers/numbers/formatPoints';
import { formatUnits } from '../../helpers/numbers/formatUnits';
import { StyledStatistic } from './StyledStatistic';

const SingleTaskHeader = styled(SimpleOverviewTaskGroupHeader)`
  font-size: 1.25rem;
  padding: 0.25rem;
`;

const SingleTaskRow = styled(SimpleOverviewTooltipRow)`
  justify-content: space-evenly;
`;

interface SimpleOverviewSingleTaskProps {
  singleTask?: Task;
  groupColor: string;
  completedDay: false | CompletedDay | undefined;
}

const SimpleOverviewSingleTask: React.FC<SimpleOverviewSingleTaskProps> = ({
  singleTask,
  groupColor,
  completedDay,
}) => {
  if (singleTask === undefined) return null;

  return (
    <>
      <SingleTaskHeader $color={groupColor}>{singleTask.taskName}</SingleTaskHeader>
      <SingleTaskRow>
        <StyledStatistic
          title="Points"
          value={completedDay ? formatPoints(completedDay.tasks[singleTask.id]?.points) : '-'}
        />
        <StyledStatistic
          title="Units"
          value={formatUnits(
            singleTask,
            completedDay ? completedDay.tasks[singleTask.id]?.value : undefined,
          )}
        />
      </SingleTaskRow>
    </>
  );
};

export default SimpleOverviewSingleTask;
