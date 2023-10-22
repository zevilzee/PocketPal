import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [firebaseApi, setfirebaseApi] = useState("");
  const [userSignUpData, setuserSignUpData] = useState(null);
  const [resetPass, setresetPass] = useState("");
  return (
    <StateContext.Provider
      value={{
        firebaseApi,
        setfirebaseApi,
        userSignUpData,
        setuserSignUpData,
        resetPass,
        setresetPass,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
