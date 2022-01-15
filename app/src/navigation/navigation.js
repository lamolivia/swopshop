import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../authentication/SignupScreen";
import Main from "../components/organisms/Main";
import Signup from "../components/organisms/Signup";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{ cardStyle: { backgroundColor: "#000000" } }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      labeled={false}
      //   activeColor={colors.navbarActive}
      //   inactiveColor={colors.navbarInactive}
      barStyle={{
        position: "absolute",
        left: "50%",
        marginLeft: -175,
        width: 350,
        bottom: 10,
        overflow: "hidden",
        borderRadius: "50%",
        // backgroundColor: colors.navbar,
      }}
    >
      <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
