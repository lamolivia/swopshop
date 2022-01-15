import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';

function Main({}){
	return (
		<SafeAreaView>
			<Image style={{}} source={{uri: "../../../assets/swoplogo.PNG"}}/>
			<Text>HomePage</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Main;