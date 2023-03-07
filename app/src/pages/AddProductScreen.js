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
  ActionSheetIOS,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";
import headers from "../styles/headers";
import SwopButton from "../components/atoms/SwopButton";
import { auth } from "../utils/firebase";
import SwopApi from "../apis/SwopAPI";
import * as ImagePicker from "expo-image-picker";

const AddProductScreen = ({ route, navigation }) => {
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productImage, setImage] = useState("");
  const { get_all_products } = route.params;
  const user_id = auth.currentUser.uid;

  const uploadProductInfo = async () => {
    return SwopApi.addUserProduct(
      user_id,
      productImage,
      productName,
      productPrice
    );
  };

  const addImgHandler = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Take photo", "Choose from library"],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) navigation.navigate("Camera", { setImage });
        else if (buttonIndex === 2) {
          (async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
              setImage(result.uri);
            }
          })();
        }
      }
    );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.camera} onPress={addImgHandler}>
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
