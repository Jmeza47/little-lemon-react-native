import {View, Text, Image, StyleSheet} from 'react-native';
import type {MenuItems} from '../../utils/types';
import {identityStyle} from '../../utils/constants';

export default function MenuItem({name, price, description, image}: MenuItems) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={identityStyle.cardTitle}>{name}</Text>
        <Text style={identityStyle.paragraphText}>{description}</Text>
        <Text style={identityStyle.HighlightText}>{`$${price}`}</Text>
      </View>

      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
        }}
        style={styles.itemImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  itemImage: {
    height: 120,
    width: 100,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 5,
    width: '70%',
  },
  imageContainer: {
    width: '40%',
  },
});
