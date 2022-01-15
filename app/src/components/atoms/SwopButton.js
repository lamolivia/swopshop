import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const SwopButton = ({title, onPress}) => {
	return (
		<TouchableOpacity onPress={()=>{onPress()}} style={styles.button}>
			<View style={{alignItems: "center", flex: 1, justifyContent: "center", width: "100%", height: "100%"}}>
				<Text style={{color: "white", fontSize: 20}}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 250,
		height: 50,
		backgroundColor: "#155A81",
		borderRadius: 30
	}
});


export default SwopButton;