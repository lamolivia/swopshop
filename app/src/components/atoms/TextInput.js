import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const SwopTextInput = ({value, onChange, placeholder, hidden}) => {
	return (
		<TextInput
      		style={styles.input}
      		onChangeText={onChange}
      		value={value}
      		placeholder={placeholder}
			placeholderTextColor={"#A0A0A0"}
			secureTextEntry={hidden}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="next"
      	/>
	);
}

export default SwopTextInput;

const styles = StyleSheet.create({
	input: {
		width: "80%",
		height: 40,
		backgroundColor: "#E0E0E0",
		margin: 10,
		color: "black",
		paddingLeft: 15,
		borderRadius: 20,
	}
})
