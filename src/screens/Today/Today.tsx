import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';

const Today: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.TODAY));
  }, [dispatch]);

  return <Outlet />;
};

export default Today;
