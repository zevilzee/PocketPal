import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { persistStore } from "redux-persist";
import { store } from "./src/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { isEqual } from "lodash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  useUserState,
  initialState as initialUserState,
} from "./src/Slices/userSlice";
import IntroScreen from "./src/Screens/IntroScreen/IntroScreen";

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={IntroScreen} />
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
