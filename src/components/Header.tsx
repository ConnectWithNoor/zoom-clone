import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import { signOut } from 'firebase/auth';
import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { firebaseAuth } from '../utils/firebaseConfig';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userName = useAppSelector((state) => state.auth.userInfo?.name);

  const handleLogout = useCallback(() => {
    signOut(firebaseAuth);
  }, []);

  const sections = useMemo(() => {
    return [
      {
        items: [
          <Link
            to="/"
            key="0"
          >
            <EuiText>
              <h2 style={{ padding: '0 1vh' }}>
                <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
              </h2>
            </EuiText>
          </Link>,
        ],
      },
      {
        items: [
          userName ? (
            <EuiText key="1">
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
              </h3>
            </EuiText>
          ) : (
            ''
          ),
        ],
      },
      {
        items: [
          <EuiFlexGroup
            key="2"
            justifyContent="center"
            alignItems="center"
            direction="row"
            style={{ gap: '2vw' }}
          >
            <EuiFlexItem
              grow={false}
              style={{ flexBasis: 'flex-content' }}
            >
              <EuiButton
                onClick={handleLogout}
                style={{
                  backgroundColor: '#0b5cff',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Logout
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>,
        ],
      },
    ];
  }, [userName, handleLogout]);

  const responsiveSection = useMemo(() => {
    return [
      {
        items: [
          <Link
            to="/"
            key="0"
          >
            <EuiText>
              <h2 style={{ padding: '0 1vh' }}>
                <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
              </h2>
            </EuiText>
          </Link>,
        ],
      },
    ];
  }, []);

  const [breadcrumbs, setBreadcrumbs] = useState([{ text: 'Dashboard' }]);
  const [isResponsive, setIsResponsive] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth <= 480) setIsResponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : sections}
      />
      <EuiHeader
        style={{ minHeight: '8vh' }}
        sections={[{ breadcrumbs }]}
      />
    </>
  );
}

export default Header;
