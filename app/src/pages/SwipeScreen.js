import React, { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import Match from "../components/molecules/Match"
import SwipePageHeader from "../components/molecules/SwipePageHeader";
import TinderCard from "react-tinder-card";
import SwopApi from "../apis/SwopAPI";
import { auth } from "../utils/firebase";

function SwipeScreen({}) {

  const [products, setProducts] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [degreeMatch, setDegreeMatch] = useState((0));
  const user_id = auth.currentUser.uid;

  const onShowPopup = () => {
    popupRef.show()
  }

  const onClosePopup = () => {
    popupRef.close()
  }

  // TODO: call when products.length is 0
  const getProducts = async () => {
    const data = await SwopApi.getSwipeProducts(user_id);
    setProducts(data);
  }

  useEffect(() => getProducts(), [])

  const swiped = async (user_id, product_id, direction) => {
    products.pop();
    setLastDirection(direction);
    if (direction == 'right') {
      const data = await SwopApi.getRightSwiped(user_id, product_id)
      if (data.length > 0) {
        console.log('match')
        setDegreeMatch(data.length);
        onShowPopup();
      }
    }
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "whitesmoke" }}>
      <View style={{height: 30, backgroundColor: "whitesmoke"}} />
      <View style={styles.cardContainer}>
        <Text style={{ zIndex: 0, bottom: -200, marginLeft: 30, fontSize: 15 }}>
          No more items available right now
        </Text>

        <View style={{ flex: 1, flexDirection: "row" }}></View>

        {products.length > 0 && products.map((product) => (
          <TinderCard
            key={product.product_id}
            onSwipe={(dir) => swiped(user_id, product.product_id, dir)}
            onCardLeftScreen={() => outOfFrame(product.product_id)}
          >
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={{ uri: product.image }}
                name={product.name}
              ></Image>
              <Text style={styles.cardTitle}>{product.name.toUpperCase()}</Text>
            </View>
          </TinderCard>
        ))}
      </View>

      {/* {lastDirection ? (
        <Text style={styles.notif}>You swiped {lastDirection}</Text>
      ) : (
        <Text style={styles.notif} />
      )} */}

    <Match
      matchDegree={degreeMatch}
      ref={(target) => popupRef = target}
      onTouchOutside = {onClosePopup}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 40,
    marginTop: 0,
  },

  card: {
    position: "absolute",
    backgroundColor: "white",
    width: 300,
    height: 600,
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 20,
    resizeMode: "cover",
  },

  cardTitle: {
    position: "absolute",
    bottom: 0,
    margin: 15,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 },
  },

  image: {
    height: 600,
    width: 300,
    borderRadius: 20,
    overflow: "hidden",
  },

  notif: {
    bottom: -470,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "35%",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default SwipeScreen;
