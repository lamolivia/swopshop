import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from "react-native";
import ChatRoomPreview from "../components/molecules/ChatRoomPreview";
import { auth, db } from "../utils/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/colors";
import headers from "../styles/headers";

const ChatRoomsScreen = () => {
  const [userChatRooms, setUserChatRooms] = useState([]);

  // Get all chat rooms the current user is a part of
  useEffect(() => {
    (async () => {
      const buyerChatRoomsQ = query(
        collection(db, "chatRooms"),
        where("buyer_id", "==", auth.currentUser.uid)
      );
      const buyerChatRoomsSnap = await getDocs(buyerChatRoomsQ);
      const sellerChatRoomsQ = query(
        collection(db, "chatRooms"),
        where("seller_id", "==", auth.currentUser.uid)
      );
      const sellerChatRoomsSnap = await getDocs(sellerChatRoomsQ);
      let chatRooms = [];
      buyerChatRoomsSnap.forEach((buyerChatRoomSnap) =>
        chatRooms.push({
          ...buyerChatRoomSnap.data(),
          id: buyerChatRoomSnap.id,
        })
      );
      sellerChatRoomsSnap.forEach((sellerChatRoomSnap) =>
        chatRooms.push({
          ...sellerChatRoomSnap.data(),
          id: sellerChatRoomSnap.id,
        })
      );
      setUserChatRooms(chatRooms);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <FontAwesome5 name="search" solid size={22} color={colors.darkGray} />
        <Text style={[headers.p, styles.searchText]}>Search</Text>
      </View>
      <ScrollView style={styles.chatRoomsContainer}>
        {userChatRooms.map(({ id, buyer_id, seller_id, prod_id }, i) => (
          <ChatRoomPreview
            key={id}
            id={id}
            buyerId={buyer_id}
            sellerId={seller_id}
            productId={prod_id}
            index={i}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatRoomsScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    flexDirection: "row",
    margin: 10,
    marginBottom: 0,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
  },
  searchText: { marginLeft: 20, color: colors.darkGray },
  chatRoomsContainer: { paddingTop: 10 },
});
