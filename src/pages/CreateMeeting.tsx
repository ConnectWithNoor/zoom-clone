import React from 'react';
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import useAuth from '../hooks/useAuth';

const meeting1Url = new URL('../assets/meeting1.png', import.meta.url).href;
const meeting2Url = new URL('../assets/meeting2.png', import.meta.url).href;

function CreateMeeting() {
  useAuth();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        height: '10vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ margin: '5vh 10vw' }}
      >
        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage
                size="100%"
                alt="icon"
                src={meeting1Url}
              />
            }
            title="Create 1 on 1 Meeting"
            description="Create a personal single person meeting."
            onClick={() => navigate('/create-1-on-1')}
            paddingSize="xl"
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
            icon={
              <EuiImage
                size="100%"
                alt="icon"
                src={meeting2Url}
              />
            }
            title="Video Conference"
            description="Invite many people in the meeting."
            onClick={() => navigate('/video-conference')}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default CreateMeeting;
