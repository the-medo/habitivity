import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.TASK_LIST));
  }, [dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TaskList;
