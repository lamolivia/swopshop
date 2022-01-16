import { signOut } from "firebase/auth";
import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { auth } from "../utils/firebase";

const SettingScreen = ({ navigation }) => {
  const logout = () => {
    signOut(auth).then(navigation.navigate("Login"));
  };
  return (
    <SafeAreaView>
      <Text>Hello Settings</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingScreen;
