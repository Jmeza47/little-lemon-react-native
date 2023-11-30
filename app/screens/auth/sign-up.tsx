import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BasicInputText from '../../components/inputText';
import {identityStyle, primaryColor1} from '../../utils/constants';
import PrimaryButton from '../../components/primaryButton';

export default function SignUp() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}
    >
      <Text style={identityStyle.displayTitle}>Sign up</Text>
      <View>
        <BasicInputText label="Name" placeholder="Place your name..." />
        <BasicInputText label="E-mail" placeholder="Your E-mail" />
        <BasicInputText
          label="Password"
          placeholder="Place your password"
          secureTextEntry
        />
      </View>
      <PrimaryButton title="Sign Up" size="full" onPress={() => {}} />
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor1,
    padding: 20,
    justifyContent: 'space-evenly',
  },
});
