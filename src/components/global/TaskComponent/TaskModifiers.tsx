import React, { ChangeEvent, useCallback } from 'react';
import { Input, Spin, Typography } from 'antd';
import { Task } from '../../../types/Tasks';
import styled from 'styled-components';
import { useCompleteTaskMutation } from '../../../apis/apiTasks';
import { dateBasicFormatFromDayjs } from '../../../helpers/date/dateBasicFormatFromDate';
import { CompletedDayTask } from '../../../helpers/types/CompletedDay';
import { Dayjs } from 'dayjs';
import debounce from 'lodash.debounce';
import { computePoints, ComputePointsResponse } from '../../../helpers/points/computePoints';

const { Text } = Typography;

export const ModifiersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  padding: 0 0.5rem 0.5rem;
`;

const ModifiersTitle = styled(Text)`
  flex-grow: 1;
`;

export const ModifiersInput = styled(Input)`
  width: 4.5rem;
`;

interface TaskModifiersProps {
  percentValue: number;
  task: Task;
  date: Dayjs;
  completedDayTask: CompletedDayTask | undefined;
  isReloading: boolean;
}

const TaskModifiers: React.FC<TaskModifiersProps> = ({
  percentValue,
  task,
  date,
  completedDayTask,
  isReloading,
}) => {
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation();

  const updatePercentageAndPoints = useCallback(
    (p: ComputePointsResponse) => {
      console.log('=========== GOING TO COMPLETE TASK ===========');
      completeTask({
        task,
        points: p.points,
        date: dateBasicFormatFromDayjs(date),
        value: p.value ?? 0,
        usedModifiers: p.usedModifiers,
      });
    },
    [completeTask, date, task],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePointsDebounce = useCallback(
    debounce((p: ComputePointsResponse) => updatePercentageAndPoints(p), 500),
    [updatePercentageAndPoints, completeTask, date],
  );

  const onChangeInputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        const percentage = parseFloat(e.target.value);
        updatePointsDebounce(
          computePoints(task, completedDayTask?.value, percentage, completedDayTask),
        );
      }
    },
    [updatePointsDebounce, completedDayTask, task],
  );

  if (!task.taskModifiers.percentageModifier) return null;

  return (
    <ModifiersWrapper>
      <ModifiersTitle strong> Modifiers: </ModifiersTitle>
      <Spin spinning={isCompleting}>
        {isReloading ? (
          <ModifiersInput
            type="number"
            onChange={onChangeInputHandler}
            defaultValue={percentValue}
            suffix="%"
            size="small"
          />
        ) : (
          <div>
            <ModifiersInput
              type="number"
              onChange={onChangeInputHandler}
              defaultValue={percentValue}
              suffix="%"
              size="small"
            />
          </div>
        )}
      </Spin>
    </ModifiersWrapper>
  );
};

export default TaskModifiers;
