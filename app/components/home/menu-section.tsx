import {FlatList, StyleSheet, View, Text} from 'react-native';
import MenuItem from './menuItem';
import {useState, useEffect} from 'react';
import type {MenuItems} from '../../utils/types';
import {secondaryColor4} from '../../utils/constants';

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>();

  const getMenuItems = async () => {
    try {
      const data = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
      );
      const {menu} = await data.json();
      setMenuItems(menu);
    } catch (error) {}
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  const categories = [...new Set(menuItems?.map(item => item.category))];
  console.warn(categories);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.menuBreakdown}>
        {categories.map(categorie => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemText}>{categorie}</Text>
          </View>
        ))}
      </View>
      <FlatList
        data={menuItems}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => (
          <MenuItem
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            category={item.category}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  menuSection: {},
  separator: {
    borderWidth: 0.2,
    borderColor: 'lightgray',
  },

  categoryItem: {
    backgroundColor: secondaryColor4,
    width: 'auto',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryItemText: {color: 'white'},

  menuBreakdown: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
