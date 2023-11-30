import {Dispatch, SetStateAction, createContext} from 'react';

type UserContext = {
  isUserLoggedIn: boolean;
  setLoggedUser: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<UserContext>({
  isUserLoggedIn: false,
  setLoggedUser: () => {},
});
