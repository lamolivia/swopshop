import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { auth } from "../utils/firebase";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    if (auth.currentUser) navigation.navigate("Home");
    else navigation.navigate("Login");
  }, []);

  return (
    <View>
      <Image source={require("../../assets/swoplogo-removebg.png")} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
