import { Input, InputProps } from '@ui-kitten/components';
import React from 'react';
import { Control, useController } from 'react-hook-form';

import FieldWrapper from './FieldWrapper';

interface Props extends InputProps {
  name: string;
  control: Control<any>;
  label?: string;
  caption?: string;
  transform?: {
    input: (value: unknown) => string;
    output: (value: string) => unknown;
  };
}

export default function InputField({
  name,
  control,
  label,
  caption,
  transform = {
    input: (value) => (value ?? '').toString(),
    output: (value) => value,
  },
  disabled,
  ...rest
}: Props) {
  const { field, fieldState } = useController({
    name,
    control,
    disabled,
  });

  return (
    <FieldWrapper label={label} caption={caption} fieldState={fieldState}>
      {({ status }) => (
        <>
          <Input
            status={status}
            value={transform.input(field.value)}
            onChangeText={(value) => field.onChange(transform.output(value))}
            onBlur={field.onBlur}
            disabled={disabled}
            {...rest}
            
          />
        </>
      )}
    </FieldWrapper>
  );
}