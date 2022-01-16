import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";

function SwipePageHeader() {
  return (
    <View style={styles.header}>
      {/* <View style={styles.user}>
        <Image
          style={styles.img}
          source={require("../../../assets/Sample_User_Icon.png")}
        />
      </View> */}

      <Image
        style={styles.logo}
        source={require("../../../assets/swoplogo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "25%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 4,
    borderColor: "#155A81",
    width: "110%",
    left: -4,
  },

  logo: {
    height: 40,
    width: 100,
    marginLeft: 140,
  },

  user: {
    height: 35,
    width: 35,
    borderRadius: 20,
    backgroundColor: "grey",
    margin: 20,
  },
  img: {
    maxWidth: 35,
    maxHeight: 35,
  },
});

export default SwipePageHeader;
