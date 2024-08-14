// UserContext.js

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthorizeModel, setIsAuthorizeModel] = useState(false);
  const [isloadingModel, setIsloadingModel] = useState(false);

  const openAuthorizeModel = () => {
    setIsAuthorizeModel(true);
  };

  const closeAuthorizeModel = () => {
    setIsAuthorizeModel(false);
  };

  const openLoadingModel = () => {
    setIsloadingModel(true);
  };

  const closeLoadingModel = () => {
    setIsloadingModel(false);
  };

  return (
    <UserContext.Provider
      value={{
        isAuthorizeModel,
        isloadingModel,
        openAuthorizeModel,
        closeAuthorizeModel,
        openLoadingModel,
        closeLoadingModel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
