import { Input, InputProps } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Mask, Masks, useMaskedInputProps } from 'react-native-mask-input';

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
  mask: Mask;
}

export default function InputMaskField({
  name,
  control,
  label,
  caption,
  mask,
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

  const [value, setValue] = useState(field.value ? field.value : '');

  const maskedInputProps = useMaskedInputProps({
    value,
    onChangeText: (maskedValue, unmaskedValue) => {
      setValue(maskedValue);

      let valueToSet;

      if (mask === Masks.BRL_CURRENCY) {
        valueToSet = parseFloat(unmaskedValue) / 100;
      } else {
        valueToSet = unmaskedValue;
      }

      field.onChange(valueToSet);
    },
    mask,
  });

  return (
    <FieldWrapper label={label} caption={caption} fieldState={fieldState}>
      {({ status }) => (
        <>
          <Input
            {...maskedInputProps}
            status={status}
            onBlur={field.onBlur}
            disabled={disabled}
            {...rest}
          />
        </>
      )}
    </FieldWrapper>
  );
}