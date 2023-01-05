import React from 'react';
import { Task, TaskType } from '../../../types/Tasks';
import TaskUserInputDuration from './TaskUserInput/TaskUserInputDuration';
import TaskUserInputUnits from './TaskUserInput/TaskUserInputUnits';
import TaskUserInputUnitCheckpoints from './TaskUserInput/TaskUserInputUnitCheckpoints';
import TaskUserInputCheckbox from './TaskUserInput/TaskUserInputCheckbox';
import TaskUserInputTime from './TaskUserInput/TaskUserInputTime';
import TaskUserInputOptions from './TaskUserInput/TaskUserInputOptions';

interface TaskUserInputProps {
  task: Task;
}

const TaskUserInput: React.FC<TaskUserInputProps> = ({ task }) => {
  switch (task.taskType) {
    case TaskType.DURATION:
      return <TaskUserInputDuration value={0} units={task.taskUnits} />;
    case TaskType.TIME: {
      return <TaskUserInputTime value="" />;
    }
    case TaskType.CHECKBOX: {
      return <TaskUserInputCheckbox value={0} />;
    }
    case TaskType.UNITS: {
      return <TaskUserInputUnits value={0} units={task.taskUnits} />;
    }
    case TaskType.UNIT_CHECKPOINTS: {
      return <TaskUserInputUnitCheckpoints value={0} units={task.taskUnits} />;
    }
    case TaskType.OPTIONS: {
      return <TaskUserInputOptions value={0} options={task.taskCheckpoints} />;
    }
  }
};

export default TaskUserInput;
