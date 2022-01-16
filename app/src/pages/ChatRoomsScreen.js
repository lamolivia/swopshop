import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ChatRoomPreview from "../components/molecules/ChatRoomPreview";
import { auth, db } from "../utils/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../styles/colors";
import headers from "../styles/headers";

const ChatRoomsScreen = () => {
  const [userChatRooms, setUserChatRooms] = useState([]);
  const [refresh, setRefresh] = useState(true);

  // Get all chat rooms the current user is a part of
  useEffect(() => {
    (async () => {
      if (refresh) {
        setRefresh(false);
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
      }
    })();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={styles.search}>
          <FontAwesome5 name="search" solid size={22} color={colors.darkGray} />
          <Text style={[headers.p, styles.searchText]}>Search</Text>
        </View>
        <TouchableOpacity
          onPress={() => setRefresh(true)}
          style={{
            marginRight: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name="redo-alt" solid size={22} color="black" />
        </TouchableOpacity>
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
    paddingLeft: 15,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
  },
  searchText: { marginLeft: 15, color: colors.darkGray },
  chatRoomsContainer: { paddingTop: 10 },
});
