import {
  connectToDataBase,
  deleteAllMenuItems,
  getAllMenuItems,
  saveMenuItems,
  getDishByCategory,
} from './db';
import {MenuItems} from '../utils/types';

export const deleteAllItemsInTable = async () => {
  try {
    await deleteAllMenuItems();
  } catch (error) {
    console.error('eeee', error);
  }
};

export const getMenuItems = async () => {
  try {
    const data = await fetch(
      'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
    );
    const {menu} = await data.json();
    return menu;
  } catch (error) {}
};

export const insertItemsIntoDB = async (menuItems: MenuItems[]) => {
  try {
    const db = await connectToDataBase();
    menuItems && (await saveMenuItems(db, menuItems));
  } catch (error) {
    console.error('eeee', error);
  }
};

export const getMenuItemsFromDB = async () => {
  try {
    const db = await connectToDataBase();
    const data = await getAllMenuItems(db);
    return data;
  } catch (error) {
    throw new Error('Error Getting Items');
  }
};

export const getMenuItemsFromCategory = async (category: string) => {
  try {
    const db = await connectToDataBase();
    const items = await getDishByCategory(db, category);
    return items;
  } catch (error) {
    throw new Error('Error Getting Items');
  }
};
