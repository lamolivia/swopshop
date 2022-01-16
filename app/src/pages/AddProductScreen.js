import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import headers from "../styles/headers";
import SwopButton from "../components/atoms/SwopButton";
import { auth } from "../utils/firebase";
import SwopApi from "../apis/SwopAPI";
import { useGlobalContext } from "../utils/context";

const AddProductScreen = ({ route, navigation }) => {
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const { get_all_products } = route.params;
  const user_id = auth.currentUser.uid;

  const { productImage } = useGlobalContext();

  const uploadProductInfo = async () => {
    return SwopApi.addUserProduct(
      user_id,
      productImage,
      productName,
      productPrice
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.camera}
            onPress={() => navigation.navigate("Camera")}
          >
            {productImage ? (
              <Image style={styles.image} source={{ uri: productImage }} />
            ) : (
              <Ionicons name="camera" size={35} color={colors.darkGray} />
            )}
          </TouchableOpacity>
          <TextInput
            style={[headers.p, styles.inputStyle]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Product name"
            placeholderTextColor={colors.darkGray}
            value={productName}
            onChangeText={(newName) => setName(newName)}
          />
          <TextInput
            style={[headers.p, styles.inputStyle]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Price"
            placeholderTextColor={colors.darkGray}
            keyboardType="decimal-pad"
            value={productPrice}
            onChangeText={(newPrice) => setPrice(newPrice)}
          />
          <SwopButton
            title="Submit"
            onPress={async () => {
              uploadProductInfo()
                .then(() => {
                  get_all_products();
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  inputStyle: {
    backgroundColor: colors.lightGray,
    color: "black",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 3,
    alignSelf: "center",
  },
  container: { flex: 1, marginHorizontal: 10 },
  camera: {
    height: 150,
    width: 150,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
  },
});

export default AddProductScreen;
