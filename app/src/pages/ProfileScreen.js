import React from "react";
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

const { width, height } = Dimensions.get("window");

const user = {
  name: "mason_wong",
  products: [
    { image: require("../../assets/macbook.jpg"), id: 1, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 2, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 3, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 4, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 5, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 6, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 7, name: "MacBook"},
    { image: require("../../assets/macbook.jpg"), id: 8, name: "MacBook"},
  ],
  rating: 4,
  location: "Vancouver, Canada",
};

const ProfileScreen = ({ navigation }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    let colour = i < user.rating ? "black" : "grey";
    stars.push(<Ionicons name="star" size={14} color={colour} />);
  }

  return (
    <SafeAreaView>
      <View style={styles.headingView}>
        <View style={styles.header_icons}>
          <TouchableOpacity
            style={styles.settings_icon}
            onPress={() => navigation.navigate("Camera")}
          >
            <Ionicons name="add-circle-sharp" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settings_icon}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings-sharp" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>@{user.name}</Text>

        <View style={styles.star_view}>{stars}</View>

        <View style={styles.view3}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location" size={14} color="black" />
            <Text style={({ fontSize: 17 }, { fontWeight: "bold" })}>
              {user.location}
            </Text>
          </View>

          <Text style={({ fontSize: 17 }, { fontWeight: "bold" })}>
            {user.products.length} items
          </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.view2}>{displayImages(navigation)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const displayImages = (navigation) => {
  return user.products.map(({ image, id }) => (
    <TouchableOpacity
      key={user.id}
      onPress={() => {
        navigation.navigate("ImageDisplay", { user: user.name, image: image });
      }}
    >
      <View style={styles.image_view}>
        <Image style={styles.image} source={image} />
      </View>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
    fontSize: 17,
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
  },
  headingView: {
    marginHorizontal: 10,
    paddingBottom: 5,
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  star_view: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 3,
  },
});

export default ProfileScreen;
