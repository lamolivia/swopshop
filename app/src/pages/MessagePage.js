import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button, 
  Image, 
} from 'react-native';

import Chat from '../molecules/Chat'

db = [{
    product: 'MacBook Air',
    selling: false,
}, 

{
    product: 'Samsung TV',
    selling: true
}

]


function MessagePage({}){

	return (
		<SafeAreaView>
            <Text>Your Chats</Text>



            <Text>Other Chats</Text>
	
      
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
 

});


export default MessagePage;