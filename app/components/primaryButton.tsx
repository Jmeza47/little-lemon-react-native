import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {primaryColor1, primaryColor2} from '../utils/constants';

type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export default function PrimaryButton({
  title,
  size,
  onPress,
  disabled,
}: {
  title: string;
  size: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={
        (disabled && [style.primaryButton, style.disabledStyle]) ||
        (size === 'full' && [style.primaryButton, style.fullSizeButton])
      }
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={style.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  primaryButton: {
    backgroundColor: primaryColor2,
    color: primaryColor1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  smallSizeButton: {
    width: '40%',
  },
  mediumSizeButton: {
    width: '60%',
  },
  largeSizeButton: {
    width: '80%',
  },
  fullSizeButton: {
    width: '100%',
  },

  buttonTitle: {
    fontFamily: 'Karla',
    fontWeight: 'bold',
    fontSize: 18,
  },

  disabledStyle: {
    backgroundColor: 'red',
  },
});
