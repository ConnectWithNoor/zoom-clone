import React from 'react';
import { EuiProvider } from '@elastic/eui';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <EuiProvider>
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
    </EuiProvider>
  );
}

export default App;
