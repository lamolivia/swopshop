import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import colors from "../../styles/colors";
import headers from "../../styles/headers";
import { auth, db } from "../../utils/firebase";

const ChatRoomPreview = ({ id, buyerId, sellerId, productId, index }) => {
  const [buyer, setBuyer] = useState();
  const [seller, setSeller] = useState();
  const [product, setProduct] = useState();

  const selling = auth.currentUser.uid === sellerId;

  useEffect(() => {
    (async () => {
      const buyerSnap = await getDoc(doc(db, "users", buyerId));
      setBuyer(buyerSnap.data());
      const sellerSnap = await getDoc(doc(db, "users", sellerId));
      setSeller(sellerSnap.data());
      const productSnap = await getDoc(doc(db, "product", productId));
      setProduct(productSnap.data());
      console.log(buyerSnap.data(), sellerSnap.data(), productSnap.data());
    })();
  }, []);

  return (
    <View
      style={[
        styles.container,
        index % 2 ? null : { backgroundColor: colors.lightGray },
      ]}
    >
      <Image
        style={styles.img}
        source={require("../../../assets/macbook.jpg")}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={[headers.p]}>MacBook Air</Text>
        <View
          style={[
            styles.tradeIcon,
            { backgroundColor: selling ? "green" : "red" },
          ]}
        >
          <Text style={{ color: "white" }}>
            {selling ? "Selling" : "Buying"}
          </Text>
        </View>
      </View>
      <Text>Ok deal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
  },
  tradeIcon: {
    width: 15,
    height: 10,
    borderRadius: 10,
    bottom: -45,
    alignItems: "center",
  },
});

export default ChatRoomPreview;
