import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header1 } from '../../components/global/Headers';

const Settings: React.FC = () => {
  return (
    <>
      <Header1>This is page called SETTINGS</Header1>
      <Outlet />
    </>
  );
};

export default Settings;
