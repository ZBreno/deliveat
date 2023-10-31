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
  const { error } = fieldState;
  const isError = error;
  const status = isError ? 'danger' : 'basic';

  return (
    <View>
      {label && (
        <Text category="label" style={{marginBottom: 4, fontSize: 13}} status={status}>
          {label}
        </Text>
      )}

      {typeof children === 'function' ? children({ status }) : children}

      {isError && <Text status="danger" style={{fontSize: 12}}>{error.message}</Text>}
      {caption && <Text appearance="hint">{caption}</Text>}
    </View>
  );
}