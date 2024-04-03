import {createContext} from 'react';
interface QuerySearch {
  querySearch: string;
  setQuerySearch: React.Dispatch<React.SetStateAction<string>>;
}

export const QueryContext = createContext<QuerySearch>({
  querySearch: '',
  setQuerySearch: () => {},
});
