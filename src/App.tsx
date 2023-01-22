import React, { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import GlobalStyleAndTheme from './styles/GlobalStyleAndTheme';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from './store/localStore';
import { firebaseUserToLocalUser, logIn, logOut } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { ReduxDispatch } from './store';
import { auth } from './firebase';
import Helmet from 'react-helmet';
import LogoIcon from './assets/svg/habitivity-logo-favicon.svg';
import dayjs from 'dayjs';

//needed because of Antd datepicker
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(weekday);
dayjs.extend(localeData);

const App: React.FC = () => {
  const dispatch: ReduxDispatch = useDispatch();

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, user => {
      (async () => {
        const appUser = await firebaseUserToLocalUser(user);
        setUser(appUser);
        dispatch(appUser ? logIn(appUser) : logOut());
      })();
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, [dispatch]);

  const helmetLink = useMemo(
    () => [
      {
        rel: 'icon',
        href: LogoIcon,
      },
    ],
    [],
  );

  return (
    <GlobalStyleAndTheme>
      <Helmet title="Habitivity" link={helmetLink} />
      <RouterProvider router={router} />
    </GlobalStyleAndTheme>
  );
};

export default App;
