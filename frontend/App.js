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

import { ToastProvider } from "react-native-toast-notifications";
import {
  useUserState,
  initialState as initialUserState,
} from "./src/Slices/userSlice";
import IntroScreen from "./src/Screens/IntroScreen/IntroScreen";
import LoginOrSignUpScreen from "./src/Screens/LoginOrSignUpScreen/LoginOrSignUpScreen";
import SignUp from "./src/Screens/SignUpScreen/SignUp";
import OtpScreen from "./src/Screens/OtpScreen/OtpScreen";
import LoginScreen from "./src/Screens/LoginScreen/LoginScreen";
import ForgotPass from "./src/Screens/ForgotPassScreen/ForgotPass";
import VerifyEmail from "./src/Screens/ForgotPassScreen/VerifyEmail";
import ResetPassword from "./src/Screens/ForgotPassScreen/ResetPassword";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import IncomeScreen from "./src/Screens/IncomeScreen/IncomeScreen";
import HistoryScreen from "./src/Screens/HistoryScreen/HistoryScreen";
import CashIn from "./src/Screens/IncomeScreen/CashIn/CashIn";
import ExpenseScreen from "./src/Screens/ExpenseScreen/ExpenseScreen";
import AddExpense from "./src/Screens/ExpenseScreen/AddExpense";
import AddCategory from "./src/Screens/ExpenseScreen/AddCategory";
import { ContextProvider } from "./src/context/ContextProvider";
import UserProfile from "./src/Screens/UserProfile/UserProfile";
import SettingScreen from "./src/Screens/Setting/SettingScreen";
import { PaperProvider } from "react-native-paper";
import PrivacyPolicy from "./src/Components/PrivacyPolicy";
import TermsConditions from "./src/Components/TermsConditions";
import FinanceGoalScreen from "./src/Screens/FinanceGoal/FinanceGoalScreen";
import AddNewGoal from "./src/Screens/FinanceGoal/AddNewGoal";
import EditGoal from "./src/Screens/FinanceGoal/EditGoal";
import AnalyticsScreen from "./src/Screens/Analytics/AnalyticsScreen";
import IncomeReport from "./src/Screens/IncomeReport/IncomeReport";
import SavingReport from "./src/Screens/SavingReport/SavingReport";
import Faq from "./src/Screens/Faqs/Faq";
import AppLockScreen from "./src/Screens/AppLock/AppLockScreen";
import AppLock from "./src/Screens/AppLock/AppLock";
import ExpenseReport from "./src/Screens/ExpenseReport/ExpenseReport";
import EditExpence from "./src/Components/EditExpence";
import EnterPin from "./src/Components/EnterPin";

let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

function Main() {
  const UserState = useUserState();
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
  let initialRouteName = isEqual(initialUserState, UserState)
    ? "Intro"
    : "Home";
  console.log(UserState.pin);
  if (UserState.pin !== null) {
    initialRouteName = "EnterPin";
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen
              name="LoginOrSignUp"
              component={LoginOrSignUpScreen}
            />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Otp" component={OtpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Forgot" component={ForgotPass} />
            <Stack.Screen name="verifyEmail" component={VerifyEmail} />
            <Stack.Screen name="ResetPass" component={ResetPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Income" component={IncomeScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="CashIn" component={CashIn} />
            <Stack.Screen name="Expense" component={ExpenseScreen} />
            <Stack.Screen name="AddExpense" component={AddExpense} />
            <Stack.Screen name="AddCategory" component={AddCategory} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsCondition" component={TermsConditions} />
            <Stack.Screen name="FinanceGoal" component={FinanceGoalScreen} />
            <Stack.Screen name="AddGoal" component={AddNewGoal} />
            <Stack.Screen name="EditGoal" component={EditGoal} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="IncomeReport" component={IncomeReport} />
            <Stack.Screen name="SavingReport" component={SavingReport} />
            <Stack.Screen name="faq" component={Faq} />
            <Stack.Screen name="AppLockScreen" component={AppLockScreen} />
            <Stack.Screen name="AppLock" component={AppLock} />
            <Stack.Screen name="ExpenseReport" component={ExpenseReport} />
            <Stack.Screen name="EditExpence" component={EditExpence} />
            <Stack.Screen name="EnterPin" component={EnterPin} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <ContextProvider>
          <ToastProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Main />
            </PersistGate>
          </ToastProvider>
        </ContextProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}
