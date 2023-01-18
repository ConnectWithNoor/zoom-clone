import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDocs, query, where } from 'firebase/firestore';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

import useToast from '../hooks/useToast';

import { firebaseAuth, meetingCollectionRef } from '../utils/firebaseConfig';
import { MeetingType } from '../utils/types';
import { generateMeetingID } from '../utils/generateMeetingId';

function JoinMeeting() {
  const { id: paramsId } = useParams();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const [isAllowed, setIsAllowed] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getMeetingData = async () => {
      if (paramsId && userLoaded) {
        const getMeetingsQuery = query(
          meetingCollectionRef,
          where('meetingId', '==', paramsId)
        );
        const fetchedMeetings = await getDocs(getMeetingsQuery);

        if (fetchedMeetings.docs.length) {
          const meeting = fetchedMeetings.docs[0].data() as MeetingType;
          const isCreator = meeting.createdBy === user?.uid;
          if (meeting.meetingType === '1-on-1') {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                createToast({ title: 'Meeting has ended.', color: 'danger' });
                navigate(user ? '/' : '/login');
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  color: 'warning',
                });
                navigate(user ? '/' : '/login');
              }
            } else navigate(user ? '/' : '/login');
          } else if (meeting.meetingType === 'video-conference') {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            );
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true);
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                createToast({ title: 'Meeting has ended.', color: 'danger' });
                navigate(user ? '/' : '/login');
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  color: 'warning',
                });
              }
            } else {
              createToast({
                title: `You are not invited to the meeting.`,
                color: 'danger',
              });
              navigate(user ? '/' : '/login');
            }
          } else {
            setIsAllowed(true);
          }
        }
      }
    };

    getMeetingData();
  }, [paramsId, navigate, userLoaded, createToast, user]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser({ ...currentUser! });
    setUserLoaded(true);
  });

  const myMeeting = async (element: any) => {
    console.log(element);
    const appId = import.meta.env.VITE_ZEGO_CLOUD_APP_ID;
    const serverSecret = import.meta.env.VITE_ZEGO_CLOUD_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      paramsId!,
      user?.uid ? user.uid : generateMeetingID(),
      user?.displayName ? user.displayName : 'New User'
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: 'Personal Link',
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div>
      {isAllowed && (
        <div
          className="myCallContainer"
          ref={myMeeting}
          style={{ width: '100%', height: '100vh' }}
        />
      )}
    </div>
  );
}

export default JoinMeeting;
