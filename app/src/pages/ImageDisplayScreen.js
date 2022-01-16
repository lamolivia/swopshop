import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

const ImageDisplayScreen = ({ route }) => {
  const { user, image, title, price } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 30, marginBottom: 20, marginTop: 20}}>{title} - ${price}</Text>
      <Image style={styles.image} source={{uri:image}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{

    flex: 1,
    justifyContent: "flex-start",
    alignItems:"center"

  },
  image: {
    height: "85%",
    width: "90%",
  },
});

export default ImageDisplayScreen;
