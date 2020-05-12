import React, { useContext, createContext, useReducer } from "react";
import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "../dbstore";

initDB(DBConfig);
const appContext = createContext({});
const initalState = {
  lists: [],
  list: {},
};
const ContextProvider = appContext.Provider;

export function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "new":
      const { list } = action.payloads;
      return { ...state, list };
    case "delete":
      return state;
    case "fetchAll":
      const { lists } = action.payloads;
      return { ...state, lists };
    default:
      return state;
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const db = useIndexedDB("notes");

  return (
    <ContextProvider value={{ state, dispatch, db }}>
      {children}
    </ContextProvider>
  );
}

export const useAppContext = () => {
  const ctx = useContext(appContext);
  return ctx;
};

export default AppProvider;
