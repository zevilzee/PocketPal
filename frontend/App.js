import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { persistStore } from "redux-persist";
import { store } from "./src/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { isEqual } from "lodash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  useUserState,
  initialState as initialUserState,
} from "./src/Slices/userSlice";
import IntroScreen from "./src/Screens/IntroScreen/IntroScreen";
import LoginOrSignUpScreen from "./src/Screens/LoginOrSignUpScreen/LoginOrSignUpScreen";
import SignUp from "./src/Screens/SignUpScreen/SignUp";

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

function Main() {
  const [fontsLoaded, error] = useFonts({
    Regular: require("./assets/fonts/Gantari-Regular.ttf"),
    Bold: require("./assets/fonts/Gantari-Bold.ttf"),
    Medium: require("./assets/fonts/Gantari-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !error) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded || error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginOrSignUp"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen
              name="LoginOrSignUp"
              component={LoginOrSignUpScreen}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
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
