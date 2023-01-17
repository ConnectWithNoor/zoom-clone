import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui';
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';

import MeetingNameField from '../components/FormComponents/MeetingNameField';
import MeetingUsersField from '../components/FormComponents/MeetingUsersField';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import MeetingDateField from '../components/FormComponents/MeetingDateField';
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons';
import { FieldErrorType, UserType } from '../utils/types';
import { meetingCollectionRef } from '../utils/firebaseConfig';
import { generateMeetingID } from '../utils/generateMeetingId';
import { useAppSelector } from '../store/hooks';
import useToast from '../hooks/useToast';

function OneOnOneMeeting() {
  useAuth();
  const users = useFetchUsers();
  const navigate = useNavigate();
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment());
  const [showError, setShowError] = useState<{
    meetingName: FieldErrorType;
    meetingUser: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUser: {
      show: false,
      message: [],
    },
  });

  const onUserChange = useCallback((selectedOption: any) => {
    setSelectedUsers(selectedOption);
  }, []);

  const validateForm = () => {
    let errors = false;
    const clonedShowErrors = { ...showError };
    if (meetingName.trim().length <= 0) {
      clonedShowErrors.meetingName.show = true;
      clonedShowErrors.meetingName.message = ['Please Enter Meeting Name'];
      errors = true;
    } else {
      clonedShowErrors.meetingName.show = false;
      clonedShowErrors.meetingName.message = [];
      errors = false;
    }

    if (selectedUsers.length <= 0) {
      clonedShowErrors.meetingUser.show = true;
      clonedShowErrors.meetingUser.message = ['Please Select a User'];
      errors = true;
    } else {
      clonedShowErrors.meetingUser.show = false;
      clonedShowErrors.meetingUser.message = [];
      errors = false;
    }
    setShowError(clonedShowErrors);
    return errors;
  };

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingID();
      await addDoc(meetingCollectionRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: '1-on-1',
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format('L'),
        maxUsers: 1,
        status: true,
      });
    }
    createToast({
      title: 'One on One Meeting Created Successfully.',
      color: 'success',
    });
    navigate('/');
  };

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
        alignItems="center"
        style={{ margin: '5vh 10vw' }}
      >
        <EuiForm>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showError.meetingName.show}
            error={showError.meetingName.message}
          />
          <MeetingUsersField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showError.meetingUser.show}
            error={showError.meetingUser.message}
          />
          <MeetingDateField
            selected={startDate}
            setStartDate={setStartDate}
          />
          <EuiSpacer />
          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  );
}

export default OneOnOneMeeting;
