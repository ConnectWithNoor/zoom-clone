/* eslint-disable no-else-return */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EuiBadge,
  EuiBasicTable,
  EuiButtonIcon,
  EuiCopy,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getDocs, query, where } from 'firebase/firestore';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { meetingCollectionRef } from '../utils/firebaseConfig';
import { MeetingType } from '../utils/types';

function Meeting() {
  useAuth();
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      const getUserMeetings = async () => {
        const getMeetingsQuery = query(meetingCollectionRef);
        const fetchedMeetings = await getDocs(getMeetingsQuery);

        if (fetchedMeetings.docs.length > 0) {
          const myMeetings: MeetingType[] = [];

          fetchedMeetings.forEach((meeting) => {
            const data = meeting.data() as MeetingType;
            if (data.createdBy === userInfo.uid) myMeetings.push(data);
            else if (data.meetingType === 'anyone-can-join')
              myMeetings.push(data);
            else {
              const index = data.invitedUsers.findIndex(
                (user) => user === userInfo.uid
              );

              if (index >= 0) myMeetings.push(data);
            }
          });

          setMeetings(myMeetings);
        }
      };

      getUserMeetings();
    }
  }, [userInfo]);

  const meetingColumns = useMemo(
    () => [
      {
        field: 'meetingName',
        name: 'Meeting Name',
      },
      {
        field: 'meetingType',
        name: 'Meeting Type',
      },
      {
        field: 'meetingDate',
        name: 'Meeting Date',
      },
      {
        field: '',
        name: 'Status',
        // eslint-disable-next-line consistent-return
        render: (meeting: MeetingType) => {
          if (meeting.status) {
            if (meeting.meetingDate === moment().format('L')) {
              return (
                <EuiBadge color="success">
                  <Link
                    to={`/join/${meeting.meetingId}`}
                    style={{ color: 'black' }}
                  >
                    Join Now
                  </Link>
                </EuiBadge>
              );
            } else if (
              moment(meeting.meetingDate).isBefore(moment().format('L'))
            ) {
              return <EuiBadge color="default">Ended</EuiBadge>;
            } else if (moment(meeting.meetingDate).isAfter()) {
              return <EuiBadge color="primary">Upcoming</EuiBadge>;
            }
          } else return <EuiBadge color="danger">Cancelled</EuiBadge>;
        },
      },
      {
        field: 'meetingId',
        name: 'Copy Link',
        render: (meetingId: string) => (
          <EuiCopy
            textToCopy={`${import.meta.env.VITE_APP_HOST}/join/${meetingId}`}
          >
            {(copy) => (
              <EuiButtonIcon
                iconType="copy"
                onClick={copy}
                display="base"
                aria-label="meeting-copy"
              />
            )}
          </EuiCopy>
        ),
      },
    ],
    []
  );

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        style={{ margin: '1rem' }}
      >
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable
              items={meetings}
              columns={meetingColumns}
            />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}

export default Meeting;
