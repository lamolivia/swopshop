import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, Button } from 'react-native';
import { useState, useContext} from 'react';
import SwopTextInput from '../atoms/TextInput';
import SwopButton from '../atoms/SwopButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContext } from '@react-navigation/native';

function Main({}){
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useContext(NavigationContext);
	const handlePress = () => {

	};

	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={require('../../../assets/swoplogo-removebg.png')}></Image>
			<View style={{height: 120}}/>
			<SwopTextInput value={username} onChange={(e)=>{setUsername(e)}} placeholder="Email"/>
			<SwopTextInput value={password} onChange={(e)=>{setPassword(e)}} placeholder="Password" hidden/>
			<View style={{height: 50}}/>
			<SwopButton title={"Login"} onPress={handlePress}/>
			<View style={{height: 15}}/>
			<View style={{flex: 1, flexDirection: "row"}}>
				<Text style={styles.signuptext}>
					Don't have an account? {" "}
				</Text>
				<TouchableOpacity onPress={()=>{navigation.navigate("Signup")}}>
					<Text style={styles.signup}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 80,
	},
	logo: {
		width: 330,
		height: 160,
		marginTop: 40
	},
	signup:{
		fontSize: 18,
		color: "#155A81",
		fontWeight: "600",
	},
	signuptext:{
		fontSize: 18,
		fontWeight: "600",
	}
});


export default Main;