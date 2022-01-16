import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ChatRoomPreview from "../components/molecules/ChatRoomPreview";
import { auth, db } from "../utils/firebase";

const ChatRoomsScreen = () => {
  const [userChatRooms, setUserChatRooms] = useState([]);

  // Get all chat rooms the current user is a part of
  useEffect(() => {
    (async () => {
      const buyerChatRoomsQ = query(
        collection(db, "chatRooms"),
        where("buyer", "==", auth.currentUser.uid)
      );
      const buyerChatRoomsSnap = await getDocs(buyerChatRoomsQ);
      const sellerChatRoomsQ = query(
        collection(db, "chatRooms"),
        where("seller", "==", auth.currentUser.uid)
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
    <View style={styles.container}>
      {userChatRooms.map(({ id, buyer, seller, prod_id }, i) => (
        <ChatRoomPreview
          key={id}
          buyerId={buyer}
          sellerId={seller}
          productId={prod_id}
          index={i}
        />
      ))}
    </View>
  );
};

export default ChatRoomsScreen;

const styles = StyleSheet.create({
  container: { width: "100%" },
});
