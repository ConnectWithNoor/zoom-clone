import React from 'react';
import { EuiProvider, EuiThemeProvider } from '@elastic/eui';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import '@elastic/eui/dist/eui_theme_light.min.css';

const overrides = {
  colors: {
    LIGHT: { primary: '#0b5cff' },
    DARK: { primary: '#0b5cff' },
  },
};

function App() {
  return (
    <EuiProvider>
      <EuiThemeProvider modify={overrides}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
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
