import {
  EuiFlexGroup,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
} from '@elastic/eui';
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
import MeetingMaximumUserField from '../components/MeetingMaximumUserField';

function VideoConference() {
  useAuth();
  const users = useFetchUsers();
  const navigate = useNavigate();
  const [createToast] = useToast();
  const uid = useAppSelector((state) => state.auth.userInfo?.uid);
  const [meetingName, setMeetingName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment());
  const [size, setSize] = useState(1);
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false);
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
        meetingType: anyoneCanJoin ? 'anyone-can-join' : 'video-conference',
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUsers.map((user) => user.uid),
        meetingDate: startDate.format('L'),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true,
      });
    }
    createToast({
      title: `${
        anyoneCanJoin ? 'Anyone Can Join' : 'Video Conference'
      } Meeting Created Successfully.`,
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
          <EuiFormRow
            display="columnCompressedSwitch"
            label="Anyone Can Join"
          >
            <EuiSwitch
              showLabel={false}
              label="Anyone Can Join"
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameField
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showError.meetingName.show}
            error={showError.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaximumUserField
              value={size}
              setValue={setSize}
            />
          ) : (
            <MeetingUsersField
              label="Invite User"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Select a user"
              isInvalid={showError.meetingUser.show}
              error={showError.meetingUser.message}
            />
          )}

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

export default VideoConference;
