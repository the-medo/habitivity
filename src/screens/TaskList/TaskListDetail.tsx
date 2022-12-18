import React from 'react';
import { useSelectedTaskList } from '../../hooks/useSelectedTaskList';

const TaskListDetail: React.FC = () => {
  const selectedTaskList = useSelectedTaskList();

  return (
    <div>
      TaskListDetail - {selectedTaskList?.id} - {selectedTaskList?.name}
    </div>
  );
};

export default TaskListDetail;
