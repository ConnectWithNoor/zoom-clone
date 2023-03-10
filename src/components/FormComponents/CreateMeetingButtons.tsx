import React from 'react';
import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

type Props = {
  createMeeting: () => void;
  isEdit?: boolean;
  closeFlyout?: () => void;
};

function CreateMeetingButtons({ createMeeting, isEdit, closeFlyout }: Props) {
  const navigate = useNavigate();
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          fill
          onClick={() =>
            isEdit && closeFlyout ? closeFlyout() : navigate('/')
          }
        >
          Cancel
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          fill
          onClick={createMeeting}
        >
          {isEdit ? 'Edit Meeting' : 'Create Meeting'}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default CreateMeetingButtons;
