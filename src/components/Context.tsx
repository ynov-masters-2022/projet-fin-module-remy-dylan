import React, { createContext, useReducer, Dispatch } from 'react';
import { KeepNoteActions, KeepNoteType, keepReducer } from '../reducers/KeepReducer';

type InitialStateType = {
    keepNote: KeepNoteType[];
}

const initialState = {
    keepNote: [],
}

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<KeepNoteActions>;
}>({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ keepNote }: InitialStateType, action: KeepNoteActions) => ({
  keepNote: keepReducer(keepNote, action),
});

interface IAppContextProps extends React.PropsWithChildren {

}

const AppProvider = ({ children }: IAppContextProps) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, AppContext };