import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
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
  const { chatRoomId } = route.params;

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
    Keyboard.dismiss();
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
        style={[
          styles.flexMax,
          { justifyContent: "space-between", flexGrow: 1 },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={(styles.flexMax, { backgroundColor: "white", flexGrow: 1 })}
        >
          <View>
            <Text style={headers.h2}>MacBook Air</Text>
          </View>
          <ScrollView
            style={{zIndex: 0, height: '80%', backgroundColor: "white", flexGrow: 1, top: 5}}
          >
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
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <TextInput
            placeholder="Aa"
            style={[headers.p, styles.textInput]}
            value={input}
            onChangeText={(text) => setInput(text)}
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
  container: { flex: 1, marginHorizontal: 10 },
  flexMax: { height: "100%" },
  sender: {
    padding: 10,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  reciever: {
    padding: 10,
    backgroundColor: "#2C6BED",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "80%",
  },
  senderText: {
    color: "black",
  },
  recieverText: {
    color: "white",
  },
  footer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 3
  },
  textInput: { flex: 1 },
});
