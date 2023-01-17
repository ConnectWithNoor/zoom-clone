import { getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { meetingCollectionRef } from '../utils/firebaseConfig';
import { MeetingType } from '../utils/types';

function MyMeetings() {
  useAuth();
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);

  useEffect(() => {
    const getMyMeetings = async () => {
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
    };

    if (uid) {
      getMyMeetings();
    }
  }, [uid]);

  return <div>MyMeetings</div>;
}

export default MyMeetings;
