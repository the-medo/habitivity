import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { setMenuLeftItems } from '../../store/menuSlice';
import { useDispatch } from 'react-redux';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMenuLeftItems([]));
  }, [dispatch]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TaskList;
