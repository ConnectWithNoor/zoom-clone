import React from 'react';
import useAuth from '../hooks/useAuth';

function Dashboard() {
  useAuth();

  return <div>Dashboard</div>;
}

export default Dashboard;
