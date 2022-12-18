import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Header1 } from './components/global/Headers';

interface RouteError {
  statusText?: string;
  message?: string;
}

const ErrorPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <Header1>Oops!</Header1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText ?? error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
