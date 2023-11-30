import {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../context/authentification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroSection from '../components/home/hero-section';
import MenuSection from '../components/home/menu-section';

export default function Home() {
  const {setLoggedUser} = useContext(UserContext);

  const clearUserInformation = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
    >
      <View style={styles.homeHeader}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            height: 60,
            width: 60,
            borderRadius: 25,
          }}
          onPress={() => {
            clearUserInformation();
            setLoggedUser(false);
          }}
        >
          <Text>User</Text>
        </TouchableOpacity>
      </View>
      <HeroSection />

      <MenuSection />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  homeHeader: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  logo: {
    width: 180,
    height: 50,
  },
});
