import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuLeftItem } from '../../components/menu/MenuLeft/MenuLeft';
import { useDispatch } from 'react-redux';
import { setMenuLeftItems } from '../../store/menuSlice';
import { Header1 } from '../../components/global/Headers';

export const settingsMenuLeftItems: MenuLeftItem[] = [];

const Settings: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Setting menu left..');
    dispatch(setMenuLeftItems(settingsMenuLeftItems));
  }, [dispatch]);

  return (
    <>
      <Header1>This is page called SETTINGS</Header1>
      <Outlet />
    </>
  );
};

export default Settings;
