import { EuiFieldNumber, EuiFormRow } from '@elastic/eui';
import React from 'react';

type Props = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

function MeetingMaximumUserField({ value, setValue }: Props) {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        placeholder="Maximum People"
        min={1}
        max={50}
        value={value}
        onChange={(e) => {
          const size = Number(e.target.value);
          if (size <= 0) setValue(1);
          else if (size >= 50) setValue(50);
          else setValue(size);
        }}
      />
    </EuiFormRow>
  );
}

export default MeetingMaximumUserField;
