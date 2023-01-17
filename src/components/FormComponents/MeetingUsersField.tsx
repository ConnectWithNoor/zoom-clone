import { EuiComboBox, EuiFormRow } from '@elastic/eui';
import React from 'react';

type Props = {
  label: string;
  options: any;
  onChange: any;
  selectedOptions: any;
  isClearable: boolean;
  placeholder: string;
  singleSelection: any;
  isInvalid: boolean;
  error: string[];
};

function MeetingUsersField({
  isClearable,
  label,
  onChange,
  options,
  placeholder,
  selectedOptions,
  singleSelection = false,
  isInvalid,
  error,
}: Props) {
  return (
    <EuiFormRow
      label={label}
      isInvalid={isInvalid}
      error={error}
    >
      <EuiComboBox
        isInvalid={isInvalid}
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
      />
    </EuiFormRow>
  );
}

export default MeetingUsersField;
