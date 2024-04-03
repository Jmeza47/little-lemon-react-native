import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MenuItem from './menuItem';
import {useState, useEffect, useCallback, useContext} from 'react';
import type {MenuItems} from '../../utils/types';
import {secondaryColor4} from '../../utils/constants';
import {
  getMenuItems,
  getMenuItemsFromDB,
  insertItemsIntoDB,
  getMenuItemsFromCategory,
} from '../../db/handles';
import {QueryContext} from '../../context/serchBar';

export default function MenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>();
  const [queryItems, setQueryItems] = useState<MenuItems[]>();

  const {querySearch} = useContext(QueryContext);

  const categories = [...new Set(menuItems?.map(item => item.category)), 'all'];

  const handleAddItems = useCallback(async () => {
    try {
      const dataFromDB = await getMenuItemsFromDB();
      const dataFromApi = await getMenuItems();

      if (dataFromDB === undefined || dataFromDB.length < 1) {
        setMenuItems(dataFromApi);
        insertItemsIntoDB(dataFromApi);
      } else {
        setMenuItems(dataFromDB);
      }
    } catch (error) {
      throw new Error('Error Getting Items');
    }
  }, []);

  //unused function, I think that is faster query the categories in the state, that get the results from the table
  const catQuery = async (categorie: string) => {
    const queryResult = await getMenuItemsFromCategory(categorie);
    setQueryItems(queryResult);
  };

  const handleCategoryQuery = (categorie: string) => {
    const queryResult = menuItems?.filter(item => item.category === categorie);
    setQueryItems(categorie === 'all' ? menuItems : queryResult);
  };

  const handleQuerySearch = () => {
    if (querySearch !== null || querySearch !== '') {
      const result = menuItems?.filter(
        item =>
          item.name.includes(querySearch) ||
          item.description.includes(querySearch),
      );
      setQueryItems(result);
    }
  };

  useEffect(() => {
    handleAddItems();
  }, []);

  useEffect(() => {
    handleQuerySearch();
  }, [querySearch]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.menuBreakdown}>
        {categories.map(categorie => (
          <TouchableOpacity
            key={categorie}
            style={styles.categoryItem}
            onPress={() => {
              handleCategoryQuery(categorie);
            }}
          >
            <Text style={styles.categoryItemText}>{categorie}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        style={styles.fList}
        data={!queryItems?.length ? menuItems : queryItems}
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

  fList: {paddingBottom: 20},

  menuBreakdown: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
