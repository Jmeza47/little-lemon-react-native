import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
  deleteDatabase,
} from 'react-native-sqlite-storage';
import type {MenuItems} from '../utils/types';

enablePromise(true);

export const connectToDataBase = async () => {
  return openDatabase(
    {name: 'menuItems.db', location: 'default'},
    () => {},
    error => {
      throw new Error(`Failed to connect to DB ${error}`);
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS menuItems(
        id INTEGER PRIMARY KEY NOT NULL, name TEXT, price INTEGER, description TEXT, image TEXT, category TEXT
    );`;
  try {
    db.executeSql(query);
  } catch (error) {
    throw new Error('Failed to create tables');
  }
};

export const saveMenuItems = async (
  db: SQLiteDatabase,
  menuItems: MenuItems[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO menuItems (name, price, description, image, category) values` +
    menuItems
      .map(
        item =>
          `("${item.name}", ${item.price}, "${item.description}", "${item.image}", "${item.category}")`,
      )
      .join(',');
  try {
    db.executeSql(insertQuery);
  } catch (error) {
    throw new Error('Failed to create the record');
  }
};

export const getAllMenuItems = async (
  db: SQLiteDatabase,
): Promise<MenuItems[]> => {
  try {
    const menuItems: MenuItems[] = [];
    const results = await db.executeSql(`SELECT * FROM menuItems`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        menuItems.push(result.rows.item(index));
      }
    });
    return menuItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get menuItems !!!');
  }
};

export const deleteAllMenuItems = async () => {
  try {
    deleteDatabase({name: 'menuItems.db'});
  } catch (error) {
    throw new Error('Failed to delete the database');
  }
};

export const getDishByCategory = async (
  db: SQLiteDatabase,
  category: string,
): Promise<MenuItems[]> => {
  try {
    const menuItems: MenuItems[] = [];
    const getDishesQuery = `SELECT * FROM menuItems WHERE category = '${category}'`;
    const getAllDishesQuery = `SELECT * FROM menuItems`;
    const results = await db.executeSql(
      category === 'All' ? getAllDishesQuery : getDishesQuery,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        menuItems.push(result.rows.item(index));
      }
    });
    return menuItems;
  } catch (error) {
    throw new Error('Failed to get The Dishes in that category');
  }
};
