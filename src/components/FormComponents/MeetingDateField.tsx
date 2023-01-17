import React from 'react';
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';

type Props = {
  selected: moment.Moment;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
};

function MeetingDateField({ selected, setStartDate }: Props) {
  return (
    <EuiFormRow>
      <EuiDatePicker
        selected={selected}
        onChange={(date) => setStartDate(date!)}
      />
    </EuiFormRow>
  );
}

export default MeetingDateField;
