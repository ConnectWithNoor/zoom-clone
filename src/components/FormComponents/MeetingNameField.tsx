import { EuiFieldText, EuiFormRow } from '@elastic/eui';
import React, { memo } from 'react';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  setMeetingName: React.Dispatch<React.SetStateAction<string>>;
  isInvalid: boolean;
  error: string[];
};

function MeetingNameField({
  label,
  placeholder,
  value,
  setMeetingName,
  isInvalid,
  error,
}: Props) {
  return (
    <EuiFormRow
      label={label}
      isInvalid={isInvalid}
      error={error}
    >
      <EuiFieldText
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  );
}

const MemoizedMeetingNameField = memo(MeetingNameField);

export default MemoizedMeetingNameField;
