import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {UserContext} from '../context/authentification';

import LinearGradient from 'react-native-linear-gradient';
import {identityStyle, secondaryColor4} from '../utils/constants';
import PrimaryButton from '../components/primaryButton';
import {useNavigation, Link} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type userInformation = {
  userName: string;
  userEmail: string;
};

export function SplashScreen() {
  const [userInformation, setUserInformation] = useState<userInformation>({
    userName: '',
    userEmail: '',
  });

  const {setLoggedUser} = useContext(UserContext);
  const navigate = useNavigation();

  const handleStoreUserData = async () => {
    const {userName, userEmail} = userInformation;
    const name = ['userName', userName];
    const email = ['userEmail', userEmail];
    try {
      await AsyncStorage.multiSet([name, email]);
      setLoggedUser(true);
      console.warn(userName, userEmail);
    } catch (err) {}
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      enabled={false}
      behavior="height"
    >
      <ImageBackground source={require('../assets/splash-screen.jpg')}>
        <LinearGradient
          colors={['rgba(0,255,94,0.5)', 'rgba(73,94,87,1)']}
          style={styles.gradientContainer}
        >
          <Image
            style={styles.mainlogo}
            source={require('../assets/Logo-White.png')}
          />
          <View style={styles.loginFormContainer}>
            <Text style={identityStyle.secondaryTitle}>
              Please login to your account
            </Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.inputs}
              onChangeText={text =>
                setUserInformation(prev => ({...prev, userName: text}))
              }
            />
            <TextInput
              placeholder="Enter your email"
              style={styles.inputs}
              onChangeText={text =>
                setUserInformation(prev => ({...prev, userEmail: text}))
              }
            />
            <PrimaryButton
              title="Login"
              size="full"
              onPress={handleStoreUserData}
            />
          </View>

          <View style={styles.loginFormContainer}>
            <Text
              style={[
                identityStyle.secondaryTitle,
                styles.centeredSecondaryTitle,
              ]}
            >
              Don't have an account?
            </Text>
            <PrimaryButton
              title="Sign Up"
              size="full"
              onPress={() => navigate.navigate('Sign-Up' as never)}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  mainlogo: {
    width: 360,
    height: 100,
  },

  centeredSecondaryTitle: {
    textAlign: 'center',
  },
  gradientContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  inputs: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    color: secondaryColor4,
  },
  loginFormContainer: {
    width: '100%',
    paddingVertical: 10,
  },
});
