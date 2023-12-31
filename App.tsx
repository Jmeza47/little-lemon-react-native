import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SplashScreen} from './app/screens/splash-screen';
import {UserContext} from './app/context/authentification';

import SignUp from './app/screens/auth/sign-up';
import Home from './app/screens/home';

function App(): JSX.Element {
  const [isUserLoggedIn, setLoggedUser] = useState(false);

  const value = {isUserLoggedIn, setLoggedUser};
  console.warn(isUserLoggedIn);
  const Stack = createNativeStackNavigator();
  return (
    <UserContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator>
          {isUserLoggedIn ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={SplashScreen}
            />
          )}

          <Stack.Screen name="Sign-Up" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    fontFamily: 'MarkaziText-Regular',
  },
});

export default App;
