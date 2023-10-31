import { Text } from '@ui-kitten/components';
import React from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { View } from 'react-native';

type RenderProp = ({ status }: { status: string }) => React.ReactNode;

interface Props {
  label?: string;
  caption?: string;
  fieldState: ControllerFieldState;
  children: React.ReactNode | RenderProp;
}

export default function FieldWrapper({ label, caption, fieldState, children }: Props) {
  const { isTouched, error } = fieldState;
  const isError = isTouched && error;
  const status = isError ? 'danger' : 'basic';

  return (
    <View>
      {label && (
        <Text category="label" status={status}>
          {label}
        </Text>
      )}

      {typeof children === 'function' ? children({ status }) : children}

      {isError && <Text status="danger">{error.message}</Text>}
      {caption && <Text appearance="hint">{caption}</Text>}
    </View>
  );
}