import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import colors from '../styles/colors';
import headers from '../styles/headers';
import SwopButton from '../components/atoms/SwopButton';
import { auth } from "../utils/firebase";
import SwopApi from '../apis/SwopAPI';

const AddProductScreen = ( { route, navigation } ) => {
    const [productName, setName] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productImage, setImage] = useState("");
    const { get_all_products } = route.params;
    const user_id = auth.currentUser.uid;
    console.log(productImage);

    const uploadProductInfo = async () => {
        return SwopApi.addUserProduct(user_id, productImage, productName, productPrice);
    };
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => {navigation.navigate("Camera", { setImage })}}>    
                <Ionicons name="camera" size={35} color="black" />
            </TouchableOpacity>
            {productImage !== "" ? (
            <Image style={styles.image} source={{uri:productImage}}/>
            ) : (
                null
            )}
            <Text style={headers.h2}>
                Enter Product Name:
            </Text>
            <TextInput
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                placeHolder='Product Name'
                value={productName}
                onChangeText={(newName) => setName(newName)}
            />
            <Text style={headers.h2}>
                Enter Price ($):
            </Text>
            <TextInput
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                placeHolder='Price'
                value={productPrice}
                onChangeText={(newPrice) => setPrice(newPrice)}
            />
            <SwopButton
                title="Submit"
                onPress={async ()=> {
                    uploadProductInfo()
                    .then(() => {
                        get_all_products();
                        navigation.pop();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    image: {
        height:300,
        width:300
    },
    inputStyle: {
        height: 35,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        margin: 7,
        paddingLeft: 5
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 3,
        alignSelf: 'center'
    },
    loginContainer: {
      marginTop: 10,
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "center",
    },
    loginTxt1: {
      fontSize: 15,
    },
    loginTxt2: {
      color: colors.primary,
      fontSize: 15,
    },
    container: { flex: 1, marginHorizontal: 10 }
});

export default AddProductScreen;