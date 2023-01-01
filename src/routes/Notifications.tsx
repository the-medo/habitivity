import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';
import { notification } from 'antd';

const Notifications: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const { notification: n } = useSelector((state: ReduxState) => state.notificationReducer);

  useEffect(() => {
    if (n) api.open(n);
  }, [api, n]);

  return contextHolder;
};

export default Notifications;
