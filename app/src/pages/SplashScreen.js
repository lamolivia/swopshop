import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useGlobalContext } from "../utils/context";

const SplashScreen = ({ navigation }) => {
  const [timer, setTimer] = useState();

  const { curUser } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);
    setTimer(timeout);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (curUser) {
      clearTimeout(timer);
      navigation.navigate("Home");
    }
  }, [curUser]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', justifyContent:'center', alignItems: 'center'}}>
      <Image style={{height: 40, width: 100}} source={require("../../assets/swoplogo.png")} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
