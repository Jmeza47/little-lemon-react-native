import React, {SyntheticEvent} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {
  identityStyle,
  secondaryColor1,
  secondaryColor3,
} from '../utils/constants';

type BasicInputText = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (e: SyntheticEvent) => {};
};

export default function BasicInputText({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChange,
}: BasicInputText) {
  return (
    <View style={style.formSection}>
      <Text style={identityStyle.leadText}>{label}:</Text>
      <TextInput
        clearButtonMode="always"
        placeholder={placeholder}
        style={style.defaultTextInput}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
}

const style = StyleSheet.create({
  defaultTextInput: {
    color: secondaryColor3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: secondaryColor1,
  },
  formSection: {
    marginBottom: 20,
  },
});
