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
import EditFlyOut from '../components/EditFlyOut';

function MyMeetings() {
  useAuth();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [showEditFlyout, setShowEditFlyout] = useState(false);
  const [editMeeting, setEditMeeting] = useState<MeetingType | null>(null);
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);

  const getMyMeetings = useCallback(async () => {
    if (uid) {
      const meetingQuery = query(
        meetingCollectionRef,
        where('createdBy', '==', uid)
      );

      const fetchedMeetings = await getDocs(meetingQuery);
      const myMeetings: MeetingType[] = [];

      if (fetchedMeetings.docs.length > 0) {
        fetchedMeetings.forEach((meeting) => {
          myMeetings.push({
            docId: meeting.id,
            ...(meeting.data() as MeetingType),
          });
        });
      }
      setMeetings(myMeetings);
    }
  }, [uid]);

  useEffect(() => {
    getMyMeetings();
  }, [getMyMeetings]);

  const openEditFlyOut = (meeting: MeetingType) => {
    setShowEditFlyout(true);
    setEditMeeting(meeting);
  };

  const closeEditFlyOut = (dataChanged = false) => {
    setShowEditFlyout(false);
    setEditMeeting(null);

    if (dataChanged) getMyMeetings();
  };

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
        field: '',
        name: 'Edit',
        render: (meeting: MeetingType) => {
          return (
            <EuiButtonIcon
              aria-label="meeting-edit"
              iconType="indexEdit"
              color="danger"
              display="base"
              isDisabled={
                moment(meeting.meetingDate).isBefore(moment().format('L')) ||
                !meeting.status
              }
              onClick={() => openEditFlyOut(meeting)}
            />
          );
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
      {showEditFlyout && (
        <EditFlyOut
          closeFlyout={closeEditFlyOut}
          meeting={editMeeting!}
        />
      )}
    </div>
  );
}

export default MyMeetings;
