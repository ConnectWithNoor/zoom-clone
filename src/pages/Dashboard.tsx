import React from 'react';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const dashboard1Url = new URL('../assets/dashboard1.png', import.meta.url).href;
const dashboard2Url = new URL('../assets/dashboard1.png', import.meta.url).href;
const dashboard3Url = new URL('../assets/dashboard1.png', import.meta.url).href;

function Dashboard() {
  useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <Header />

      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: '5vh 10w' }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage
                size="5rem"
                alt="icon"
                src={dashboard1Url}
              />
            }
            title="Create Meeting"
            description="Create a new meeting and invite participants."
            onClick={() => navigate('/create')}
            paddingSize="xl"
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage
                size="100%"
                alt="icon"
                src={dashboard2Url}
              />
            }
            title="My Meetings"
            description="View your created meetings."
            onClick={() => navigate('/my-meetings')}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage
                size="5rem"
                alt="icon"
                src={dashboard3Url}
              />
            }
            title="Meetings"
            description="View the meetings that you are invited to."
            onClick={() => navigate('/create')}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default Dashboard;
