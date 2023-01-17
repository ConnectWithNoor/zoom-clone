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
};

function MeetingUsersField({
  isClearable,
  label,
  onChange,
  options,
  placeholder,
  selectedOptions,
  singleSelection = false,
}: Props) {
  return (
    <EuiFormRow label={label}>
      <EuiComboBox
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
