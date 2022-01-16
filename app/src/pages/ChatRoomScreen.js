import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../styles/colors";
import { auth, db } from "../utils/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import headers from "../styles/headers";

const ChatRoomScreen = ({ route }) => {
  const { chatRoomId, product, friend } = route.params;
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState();

  useEffect(() => {
    // create userProducts onSnapshot listener
    const messagesQ = query(
      collection(doc(collection(db, "chatRooms"), chatRoomId), "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(messagesQ, (snap) => {
      setMessages(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return unsubscribe;
  }, [route]);

  const sendMessage = () => {
    addDoc(
      collection(doc(collection(db, "chatRooms"), chatRoomId), "messages"),
      {
        timestamp: Timestamp.fromDate(new Date()),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
      }
    );
    setInput("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ justifyContent: "space-between", flexGrow: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={(styles.flexMax, { backgroundColor: "white", flexGrow: 1 })}
        >
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="chevron-left" size={22} color="black" />
              <View style={{ justifyContent: "space-between", marginLeft: 20 }}>
                <Text style={[headers.h2, styles.prodName]}>
                  {product.name}
                </Text>
                <Text style={[headers.p, styles.userame]}>
                  @{friend.username}
                </Text>
              </View>
            </View>
            <View style={styles.descisionCont}>
              <TouchableOpacity
                style={[styles.descisionBtn, { backgroundColor: "#FF6961" }]}
              >
                <FontAwesome5 name="times" solid size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.descisionBtn, { backgroundColor: "#77dd77" }]}
              >
                <FontAwesome5 name="check" solid size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            // automaticallyAdjustContentInsets={false}
            style={{
              // zIndex: 0,
              height: Dimensions.get("window").height - 150,
              //   flex: 1,
              paddingHorizontal: 10,
              backgroundColor: "#f0f0f0",
              flexGrow: 0,
            }}
          >
            {/* <View style={{ flexGrow: 1 }}> */}
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.sender}>
                  <Text style={[headers.p, styles.senderText]}>
                    {data.message}
                  </Text>
                </View>
              ) : (
                <View key={id} style={styles.reciever}>
                  <Text style={[headers.p, styles.recieverText]}>
                    {data.message}
                  </Text>
                </View>
              )
            )}
            {/* </View> */}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <TextInput
            blurOnSubmit={false}
            placeholder="Aa"
            placeholderTextColor={colors.darkGray}
            style={[headers.p, styles.textInput]}
            value={input}
            onChangeText={(text) => setInput(text)}
            onFocus={() => {
              scrollViewRef.current.scrollToEnd({ animated: true });
            }}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
            <FontAwesome5
              name="paper-plane"
              solid
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexMax: { height: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderRadius: 20,
  },
  username: { marginBottom: 10 },
  descisionCont: { flexDirection: "row" },
  descisionBtn: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sender: {
    padding: 10,
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  reciever: {
    padding: 10,
    backgroundColor: colors.darkGray,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  senderText: {
    color: "white",
  },
  recieverText: {
    color: "white",
  },
  footer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 3,
    marginHorizontal: 10,
  },
  textInput: { flex: 1 },
});
