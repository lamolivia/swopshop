import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import headers from "../../styles/headers";
import { auth, db } from "../../utils/firebase";

const ChatRoomPreview = ({ id, buyerId, sellerId, productId, index }) => {
  const [buyer, setBuyer] = useState();
  const [seller, setSeller] = useState();
  const [product, setProduct] = useState();

  const navigation = useNavigation();

  const selling = auth.currentUser.uid === sellerId;

  useEffect(() => {
    (async () => {
      const buyerSnap = await getDoc(doc(db, "users", buyerId));
      setBuyer(buyerSnap.data());
      const sellerSnap = await getDoc(doc(db, "users", sellerId));
      setSeller(sellerSnap.data());
      const productSnap = await getDoc(doc(db, "products", productId));
      setProduct(productSnap.data());
    })();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatRoom", {
          chatRoomId: id,
          product,
          friend: selling ? buyer : seller,
        });
      }}
      style={[
        styles.container,
        index % 2
          ? null
          : { backgroundColor: colors.lightGray, borderRadius: 10 },
      ]}
    >
      <Image
        source={{
          uri: product?.image,
        }}
        style={styles.img}
      />
      <View style={styles.rightContainer}>
        <View style={styles.top}>
          <Text style={[headers.p, styles.productName]}>{product?.name}</Text>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  rightContainer: { justifyContent: "space-between" },
  top: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: { marginRight: 10 },
  tradeIcon: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 15,
  },
});

export default ChatRoomPreview;
