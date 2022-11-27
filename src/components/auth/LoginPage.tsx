import React from "react";
import {GoogleAuthProvider, EmailAuthProvider} from "firebase/auth";
import FirebaseAuth from "react-firebaseui/FirebaseAuth";
import styled from "styled-components";
import img from "../../assets/images/login-bg.jpg";
import { Layout } from "antd";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {useUser} from "../../hooks/useUser";
import {COLORS} from "../../styles/CustomStyles";

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/home',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
    ],
};


const LoginPageBackground = styled(Layout)`
  justify-content: center;
  background: linear-gradient(17deg, rgba(97,159,134,1) 5%, rgba(208,248,255,1) 91%);
`;

const LoginPageLayout = styled(Layout.Content)`
  border-radius: 1rem;
  background-color: ${COLORS.WHITE};
  flex: 0 1 50%;
  width: 50%;
  min-width: 400px;
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  overflow: hidden;
`;

const LoginPageContent = styled.div`
  padding: 2rem;
  flex: 2;
  min-width: 400px;
`;

const LoginPageContentImage = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  min-width: 310px;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: linear-gradient(17deg, rgba(208,248,255,.5) 5%, rgba(97,159,134,.5) 91%);
  
  &::before {
    content: "";
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%; height: 100%;
    background-image: url(${img});
    background-size: cover;
    background-position-x: center;
    filter: grayscale(100%);
    opacity: 30%;
  }
`

function LoginPage() {
    const user = useUser();

    if (!user) {
        return (
            <LoginPageBackground>
                <LoginPageLayout>
                    <LoginPageContent>
                        <h1>Habitivity</h1>
                    </LoginPageContent>
                    <LoginPageContentImage>
                        <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                    </LoginPageContentImage>
                </LoginPageLayout>
            </LoginPageBackground>
        );
    }

    return <a onClick={() => signOut(auth)}>Sign-out</a>;
}


export default LoginPage;