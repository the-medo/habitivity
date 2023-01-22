import React from 'react';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import styled from 'styled-components';
import img from '../../assets/images/login-bg.jpg';
import { Layout } from 'antd';
import { auth } from '../../firebase';
import { useUser } from '../../hooks/useUser';
import { COLORS } from '../../styles/CustomStyles';
import { LogoBig } from '../../assets/svg';
import Svg from '../../assets/svg/Svg';
import { getItem, LSKey } from '../../store/localStore';

// Configure FirebaseUI.
const uiConfig = {
  // Popup sign in flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: `/${getItem(LSKey.SELECTED_TASK_LIST_ID) ?? ''}`,
  // We will display Google and Facebook as auth providers.
  signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
};

const LoginPageBackground = styled(Layout)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(17deg, ${COLORS.BLUE_GREY_DARK} 11%, ${COLORS.PRIMARY_LIGHT} 95%);
    opacity: 20%;
  }
`;

const LoginPageLayout = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  margin: 3rem;
  align-items: center;
  justify-content: center;
`;

const LoginPageContentImage = styled.div`
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-width: 310px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(
    17deg,
    ${COLORS.PRIMARY_LIGHT} 5%,
    ${COLORS.BLUE_GREY_DARK} 91%
  );
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3);

  &::before {
    border-radius: 1rem;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${img});
    background-size: cover;
    background-position-x: center;
    filter: grayscale(100%);
    opacity: 30%;
  }
`;

const LoginPage: React.FC = () => {
  const user = useUser();

  if (user) return null;

  return (
    <LoginPageBackground>
      <LoginPageLayout>
        <LoginPageContentImage>
          <Svg
            svgImage={LogoBig}
            height="12rem"
            $colorPrimary={COLORS.PRIMARY_LIGHT}
            $colorSecondary={COLORS.BLUE_GREY_DARK}
          />
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </LoginPageContentImage>
      </LoginPageLayout>
    </LoginPageBackground>
  );
};

export default LoginPage;
