import React, { useEffect, useState } from 'react';
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import '@elastic/eui/dist/eui_theme_light.min.css';
import '@elastic/eui/dist/eui_theme_dark.min.css';
import { switchDarkTheme } from './store/slices/AuthSlice';
import CreateMeeting from './pages/CreateMeeting';
import OneOnOneMeeting from './pages/OneOnOneMeeting';

const overrides = {
  colors: {
    LIGHT: { primary: '#0b5cff' },
    DARK: { primary: '#0b5cff' },
  },
};

function App() {
  const isDarkTheme = useAppSelector((state) => state.auth.isDarkTheme);
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  const [isInitialTheme, setisInitialTheme] = useState(true);

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
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="*"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
      </EuiThemeProvider>
    </EuiProvider>
  );
}

export default App;
