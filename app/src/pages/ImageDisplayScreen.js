import React from "react";
import { SafeAreaView, View, StyleSheet, Text, Image } from "react-native";

const ImageDisplayScreen = ({ route }) => {
  const { user, image } = route.params;
  return (
    <SafeAreaView>
      <Image style={styles.image} source={image} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});

export default ImageDisplayScreen;
