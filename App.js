import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { base_url } from "./utils/url";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderTitle,
  HeaderBackButton,
} from "@react-navigation/stack";
import HomeScreen from "./screen/HomeScreen";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Splashscreen from "./screen/Splashscreen";

const Stack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Splashscreen"
        component={Splashscreen}
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default App = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <StatusBar hidden />
          <MainStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <MainStack.Screen
              name="MainStackScreen"
              component={MainStackScreen}
            />
          </MainStack.Navigator>
        </View>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};


