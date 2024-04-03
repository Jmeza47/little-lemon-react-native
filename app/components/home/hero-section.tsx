import {useState, useContext} from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {identityStyle, secondaryColor4} from '../../utils/constants';
import {QueryContext} from '../../context/serchBar';
export default function HeroSection() {
  const [queryTextValue, setQueryTextValue] = useState('');
  const {setQuerySearch} = useContext(QueryContext);

  return (
    <View style={{height: '35%'}}>
      <ImageBackground
        source={require('../../assets/Hero-image.png')}
        style={styles.heroSectionBackground}
      >
        <LinearGradient
          colors={['rgba(73,94,87,0.8)', 'rgba(73,94,87,0.8)']}
          locations={[0.15, 0.6]}
        >
          <View style={styles.heroContainer}>
            <Text style={identityStyle.sectionDisplayTitle}>Chicago</Text>
            <Text style={identityStyle.leadText}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <TextInput
              style={styles.inputs}
              placeholder="Search"
              clearButtonMode="while-editing"
              value={queryTextValue}
              onChange={e => setQueryTextValue(e.nativeEvent.text)}
              onSubmitEditing={() => {
                setQuerySearch(queryTextValue);
                setQueryTextValue('');
              }}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSectionBackground: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  heroContainer: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },

  heroImage: {
    width: 120,
    height: 160,
    resizeMode: 'cover',
  },

  inputs: {
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 10,
    color: secondaryColor4,
  },
  leadTextCenter: {
    textAlign: 'center',
  },
});
