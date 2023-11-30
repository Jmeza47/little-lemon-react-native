import React, {useContext} from 'react';
import {Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {primaryColor1, identityStyle} from '../../utils/constants';
import PrimaryButton from '../../components/primaryButton';
import {UserContext} from '../../context/authentification';
import BasicInputText from '../../components/inputText';

export default function SignIn() {
  const {LogUser} = useContext(UserContext);
  const handleSetUser = () => {
    LogUser(true);
  };

  return (
    <KeyboardAvoidingView style={style.container}>
      <Text style={identityStyle.titleText}>Sign In</Text>
      <BasicInputText label="Username" placeholder="Type your username..." />
      <BasicInputText label="Password" placeholder="Type your password..." />
      <PrimaryButton
        title="Log in"
        size="full"
        onPress={() => {
          handleSetUser();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: primaryColor1,
  },
});
