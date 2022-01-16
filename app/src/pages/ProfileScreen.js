import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SwopApi from "../apis/SwopAPI";
import { useGlobalContext } from "../utils/context";
import { auth } from "../utils/firebase";
import colors from "../styles/colors";
import headers from "../styles/headers";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const stars = [];
  const [products, setProducts] = useState([]);
  const user_id = auth.currentUser.uid;
  const { curUser } = useGlobalContext();

  const get_all_products = async () => {
    console.log("get all products");
    const response = await SwopApi.getUserProducts(user_id);
    setProducts(response);
  };

  useEffect(() => {
    get_all_products();
  }, []);

  for (let i = 0; i < 5; i++) {
    let colour = i < curUser.rating ? "black" : "grey";
    stars.push(<Ionicons key={i} name="star" size={16} color={colour} />);
  }

  return (
    <SafeAreaView>
      <View style={styles.headingView}>
        <View style={styles.header_icons}>
          <TouchableOpacity
            style={styles.settings_icon}
            onPress={() =>
              navigation.navigate("AddProductScreen", { get_all_products })
            }
          >
            <Ionicons name="add-circle-sharp" size={30} color="black" />
          </TouchableOpacity>
          <Text style={[headers.h1, styles.text]}>@{curUser.username}</Text>
          <TouchableOpacity
            style={styles.settings_icon}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-sharp" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.star_view}>{stars}</View>

        <View style={styles.view3}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="map-marker-alt" solid size={17} color="black" />
            <Text style={[headers.p, { marginLeft: 5 }]}>
              {curUser.location}
            </Text>
          </View>

          <Text style={headers.p}>{products.length} items</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.view2}>
          {displayImages(navigation, products, curUser)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const displayImages = (navigation, products, curUser) => {
  return products.map(({ image, price, name }, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.navigate("ImageDisplay", {
          user: curUser.username,
          image: image,
          title: name,
          price: price,
        });
      }}
    >
      <View style={styles.image_view}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: colors.darkGray,
  },
  image_view: {
    width: width / 3,
    height: width / 3,
    marginBottom: 2,
    paddingHorizontal: 1,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  view2: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 35,
  },
  scrollView: {
    borderWidth: 1,
  },
  settings_icon: {
    alignSelf: "flex-end",
  },
  header_icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingView: {
    marginHorizontal: 10,
    paddingBottom: 5,
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  star_view: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 3,
    marginBottom: 15,
  },
});

export default ProfileScreen;
