import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../authentication/SignupScreen";
import LoginScreen from "../authentication/LoginScreen";
import colors from "../styles/colors";
import TestProfileScreen from "../pages/TestProfileScreen";
import TestSwipeScreen from "../pages/TestSwipeScreen";
import TestChatScreen from "../pages/TestChatScreen";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "#ffffff" },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen name="Home" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      activeColor={colors.primary}
      inactiveColor={colors.darkGray}
      barStyle={{
        position: "absolute",
        left: "50%",
        marginLeft: -175,
        width: 350,
        bottom: 10,
        overflow: "hidden",
        borderRadius: "50%",
        backgroundColor: colors.lightGray,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={TestProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" solid color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Swipe"
        component={TestSwipeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="sync-alt" solid color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={TestChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="comments" solid color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
