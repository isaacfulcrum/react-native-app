// React imports
import React, { useReducer, createContext } from 'react';

const MarathonContext = createContext();

const actionTypes = {
  login: 'LOGGED_IN',
  logout: 'LOGGED_OUT',
  updateUser: 'UPDATE_USER',
};

const reducer = (state, action) => {
  let _state = { ...state };
  switch (action.type) {
    case actionTypes.login: {
      _state.loggedIn = true;
      return _state;
    }
    case actionTypes.logout: {
      _state.loggedIn = false;
      return _state;
    }
    case actionTypes.updateUser: {
      _state.user = action.payload;
      return _state;
    }
  }
};

const initialValues = {
  loggedIn: null,
  user: {},
};

const MarathonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  return (
    <MarathonContext.Provider value={{ state, dispatch }}>
      {children}
    </MarathonContext.Provider>
  );
};
export { MarathonContext, MarathonProvider, actionTypes };
