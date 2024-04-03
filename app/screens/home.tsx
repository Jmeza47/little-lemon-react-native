import {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroSection from '../components/home/hero-section';
import MenuSection from '../components/home/menu-section';
import {QueryContext} from '../context/serchBar';
import {useLinkTo} from '@react-navigation/native';

export default function Home() {
  const [querySearch, setQuerySearch] = useState<string>('');

  const clearUserInformation = async () => {
    try {
      return await AsyncStorage.clear();
    } catch (error) {}
  };

  const navigate = useLinkTo();

  return (
    <QueryContext.Provider value={{querySearch, setQuerySearch}}>
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
              navigate('/User');
            }}
          ></TouchableOpacity>
        </View>
        <HeroSection />

        <MenuSection />
      </KeyboardAvoidingView>
    </QueryContext.Provider>
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
