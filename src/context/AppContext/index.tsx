import React from 'react';
import { AppProviderProps, AppStateContextProps } from '../../interfaces';
import { initialState } from './initialState';
import { appReducer } from './reducers/appReducer';

export const AppStateContext = React.createContext<
  AppStateContextProps | undefined
>(undefined);

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  const value = { state, dispatch };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

const useAppContext = () => {
  const context = React.useContext(AppStateContext);

  if (context === undefined)
    throw new Error('useAppContext must be used within an AppProvider');

  return context;
};

export { AppProvider, useAppContext };
