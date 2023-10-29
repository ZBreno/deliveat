import { Icon as UIKittenIcon, useTheme } from '@ui-kitten/components';
import React from 'react';

interface IconPros {
  name: string;
  size?: number;
  themeFillColor?: string;
}

export default function Icon({ name, size = 18, themeFillColor = 'color-text' }: IconPros) {
  const theme = useTheme();
  return (
    <UIKittenIcon name={name} fill={theme[themeFillColor]} style={{ width: size, height: size }} />
  );
}