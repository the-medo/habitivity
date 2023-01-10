import React from 'react';
import { Outlet } from 'react-router-dom';

const TaskList: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TaskList;
