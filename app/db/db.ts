import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectToDataBase = async () => {
  return openDatabase(
    {name: 'menuItems.db', location: 'default'},
    () => {},
    error => {
      throw new Error('Failed to connect to DB');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS menuItems(
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT, price INTEGER, description TEXT, image TEXT, category TEXT
    );`;
  try {
    db.executeSql(query);
  } catch (error) {
    throw new Error('Failed to create tables');
  }
};
