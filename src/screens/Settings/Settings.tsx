import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header1 } from '../../components/global/Headers';
import { useDispatch } from 'react-redux';
import { AvailablePages, setOpenedPage } from '../../routes/routerSlice';

const Settings: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOpenedPage(AvailablePages.SETTINGS));
  }, [dispatch]);

  return (
    <>
      <Header1>This is page called SETTINGS</Header1>
      <Outlet />
    </>
  );
};

export default Settings;
