import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ViewContainer from './components/ViewContainer.js';


export default class AddTask extends Component {
	render(){
	return(
		<ViewContainer>
			<View style={styles.nav}>
				<Icon name="chevron-left" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
				<Text style={styles.navText}>@tadu</Text>
				<Icon name="lock-outline" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
			</View>
			<View style={styles.chatWrapper}>

			</View>
			<View style={styles.inputWrapper}>
							<TextInput 

placeholder="Enter your Password"
				placeholderTextColor="#33FFCC"
				/></View>

		</ViewContainer>
	)
	}
}
const styles = {
	nav : {
		// flex: 1,
		height: "8%",
		backgroundColor: "#242424",
		borderBottomColor: "#424242",
		borderBottomWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	navText :{
		color: "#FFF",
		fontSize: 15,
		fontFamily: "Rajdhani"
	},
	chatWrapper : {
		flex: 1,
		height: "84%",
		backgroundColor: "#fff"
	},
	inputWrapper : {
		backgroundColor: "#242424",
		borderTopColor: "#424242",
		borderTopWidth: 1,
		height: "8%",
	}
}