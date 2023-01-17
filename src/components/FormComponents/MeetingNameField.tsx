import { EuiFieldText, EuiFormRow } from '@elastic/eui';
import React, { memo } from 'react';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
};

function MeetingNameField({
  label,
  placeholder,
  value,
  setMeetingName,
}: Props) {
  return (
    <EuiFormRow label={label}>
      <EuiFieldText
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
      />
    </EuiFormRow>
  );
}

const MemoizedMeetingNameField = memo(MeetingNameField);

export default MemoizedMeetingNameField;
