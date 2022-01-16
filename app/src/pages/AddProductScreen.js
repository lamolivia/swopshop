import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const AddProductScreen = ( route, navigation ) => {
    const [productName, setName] = useState("");
    const [productPrice, setPrice] = useState("");
    const { get_all_products } = route.params;

    return (
        <SafeAreaView>
            <Text>Add more here</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("Cameara", { get_all_products })}}>
                
                <Ionicons name="camera" size={24} color="black" />
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({});

export default AddProductScreen;