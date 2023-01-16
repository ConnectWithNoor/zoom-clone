import React, { useCallback, useEffect } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { addDoc, getDocs, query, where } from 'firebase/firestore';

import { firebaseAuth, userCollectionRef } from '../utils/firebaseConfig';
import { useAppDispatch } from '../store/hooks';
import { setUser } from '../store/slices/AuthSlice';
import useAuth from '../hooks/useAuth';

const animationUrl = new URL('../assets/animation.gif', import.meta.url).href;
const logoUrl = new URL('../assets/logo.png', import.meta.url).href;

function Login() {
  useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(async () => {
    // get google login popup
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    // checking if user already exists in database
    if (email) {
      const getUsersQuery = query(userCollectionRef, where('uid', '==', uid));
      const fetchedUsers = await getDocs(getUsersQuery);

      // store the new user (first time user) in database
      if (fetchedUsers.docs.length <= 0) {
        await addDoc(userCollectionRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({ uid, name: displayName!, email: email! }));
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <EuiProvider colorMode="DARK">
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: '100vw', height: '100vh' }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup
              justifyContent="center"
              alignItems="center"
            >
              <EuiFlexItem>
                <EuiImage
                  src={animationUrl}
                  alt="animation"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage
                  src={logoUrl}
                  alt="logo"
                  size="16.5rem"
                />
                <EuiSpacer size="xs" />
                <EuiText
                  textAlign="center"
                  grow={false}
                >
                  <h3>
                    <EuiTextColor>One Platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> Connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size="l" />
                <EuiButton
                  fill
                  style={{ fontWeight: 'bold' }}
                  onClick={handleLogin}
                >
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
}

export default Login;
