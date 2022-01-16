import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
} from 'react-native'

function SellIcon() {
    return (
        <View style={[styles.tradeIcon, {backgroundColor: 'green'}]}>
            <Text style={{color: 'white'}}>Selling</Text>
        </View>
    )
}

function BuyIcon() {

    return (
        <View style={[styles.tradeIcon, {backgroundColor: 'red'}]}>
            <Text style={{color: 'white'}}>Buying</Text>
        </View>
    )

}

function TitleRow(isSelling) {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text>MacBook Air</Text>
            {isSelling? <SellIcon></SellIcon> : <BuyIcon></BuyIcon>}
        </View>

    )
}

function Chat({isSelling, user}) {

    // Theoretically takes user from db and fills info like that.

    return (
        <View style={styles.chatContainer}>

            <View style={styles.user}>
                <Image style={styles.img} source={require('../../../assets/Sample_User_Icon.png')}/>
            </View>

            <View>
                <TitleRow isSelling={isSelling}></TitleRow>
                <Text>Ok deal</Text>
            </View>

        </View>
    )


}

const styles = StyleSheet.create({
    tradeIcon: {
        width: 15,
        height: 10,
        borderRadius: 10,
        bottom: -45,
        alignItems: 'center',
        
    },

    chatContainer: {
        height: 50,
        width: '100%',
        margin: 10,
        flexDirection = 'row'
    },

    user: {
        height: 35,
        width: 35,
        borderRadius: 20,
        backgroundColor: 'grey',
        margin: 20,
    },
    img: {
      maxWidth: 35,
      maxHeight:35
    }





})

export default Chat
