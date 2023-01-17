import React, { useEffect, useState } from 'react';
import {
  EuiGlobalToastList,
  EuiProvider,
  EuiThemeColorMode,
  EuiThemeProvider,
} from '@elastic/eui';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import '@elastic/eui/dist/eui_theme_light.min.css';
import '@elastic/eui/dist/eui_theme_dark.min.css';
import CreateMeeting from './pages/CreateMeeting';
import OneOnOneMeeting from './pages/OneOnOneMeeting';
import { setToasts } from './store/slices/MeetingSlice';
import VideoConference from './pages/VideoConference';
import MyMeetings from './pages/MyMeetings';

const overrides = {
  colors: {
    LIGHT: { primary: '#0b5cff' },
    DARK: { primary: '#0b5cff' },
  },
};

function App() {
  const isDarkTheme = useAppSelector((state) => state.auth.isDarkTheme);
  const toasts = useAppSelector((state) => state.meetings.toasts);
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  const [isInitialTheme, setisInitialTheme] = useState(true);

  const removeToast = ({ id: removeToastId }: { id: string }) => {
    dispatch(setToasts(toasts.filter((toast) => toast.id !== removeToastId)));
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('zoom-theme');

    if (localTheme) {
      setTheme(localTheme as EuiThemeColorMode);
    } else {
      localStorage.setItem('zoom-theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (isInitialTheme) {
      setisInitialTheme(false);
    } else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  return (
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/create-meeting"
              element={<CreateMeeting />}
            />

            <Route
              path="/create-1-on-1"
              element={<OneOnOneMeeting />}
            />

            <Route
              path="/video-conference"
              element={<VideoConference />}
            />

            <Route
              path="/my-meetings"
              element={<MyMeetings />}
            />

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="*"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
