import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from '@elastic/eui';

import useAuth from '../hooks/useAuth';
import useFetchUsers from '../hooks/useFetchUsers';
import useToast from '../hooks/useToast';
import { FieldErrorType, MeetingType, UserType } from '../utils/types';
import { firebaseDB } from '../utils/firebaseConfig';

import MemoizedMeetingNameField from './FormComponents/MeetingNameField';
import MeetingMaximumUserField from './MeetingMaximumUserField';
import MeetingUsersField from './FormComponents/MeetingUsersField';
import MeetingDateField from './FormComponents/MeetingDateField';
import CreateMeetingButtons from './FormComponents/CreateMeetingButtons';

type Props = {
  closeFlyout: (dataChange?: boolean) => void;
  meeting: MeetingType;
};

function EditFlyOut({ closeFlyout, meeting }: Props) {
  useAuth();
  const users = useFetchUsers();
  const [createToast] = useToast();

  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [startDate, setStartDate] = useState(moment(meeting.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);
  const [showError] = useState<{
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

  useEffect(() => {
    if (users) {
      const foundUsers: UserType[] = [];
      meeting.invitedUsers.forEach((user) => {
        const findUser = users.find((tempUser) => tempUser.uid === user);

        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUsers(foundUsers);
    }
  }, [users, meeting.invitedUsers]);

  const onUserChange = useCallback((selectedOption: any) => {
    setSelectedUsers(selectedOption);
  }, []);

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType: meeting.meetingType,
      invitedUsers: selectedUsers.map((user) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format('L'),
      status: !status,
    };

    const { docId, ...rest } = editedMeeting;

    const docRef = doc(firebaseDB, 'meeting', meeting.docId!);
    await updateDoc(docRef, rest);
    createToast({ title: 'Meeting updated Successfully', color: 'success' });
    closeFlyout(true);
  };

  return (
    <EuiFlyout
      ownFocus
      onClose={() => closeFlyout()}
    >
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meeting.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MemoizedMeetingNameField
            label="Meeting name"
            isInvalid={showError.meetingName.show}
            error={showError.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meeting.meetingType === 'anyone-can-join' ? (
            <MeetingMaximumUserField
              value={size}
              setValue={setSize}
            />
          ) : (
            <MeetingUsersField
              label="Invite Users"
              isInvalid={showError.meetingUser.show}
              error={showError.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={
                meeting.meetingType === '1-on-1' ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDateField
            selected={startDate}
            setStartDate={setStartDate}
          />
          <EuiFormRow
            display="columnCompressedSwitch"
            label="Cancel Meeting"
          >
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButtons
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}

export default EditFlyOut;
