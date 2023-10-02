import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { isEqual } from "lodash";

import {
  useUserState,
  initialState as initialUserState,
} from "./src/slices/userSlice.js";

let persistor = persistStore(store);

function Main() {
  const UserState = useUserState();
  const initialRouteName = isEqual(initialUserState, UserState)
    ? "SignIn"
    : "Home";
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"/"}
        screenOptions={{ headerShown: false }}
      >  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Main />
      </PersistGate>
    </ReduxProvider>
  );
}
