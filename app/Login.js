import React, {Component} from 'react';

import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Login extends Component {
	render(){
		return(
			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
			<Text style={{"color": "#FFF", fontFamily: "Rajdhani", marginBottom: 10, fontSize: 15}}>Log in to an existing account</Text>
			<View style={styles.pseudoInput}>
				<Icon name="account-circle" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
				<TextInput
				style={{height: 35, color: "#FFF", fontFamily: 'Rajdhani', width: "85%", fontSize: 17}}
				onChangeText={(text) => this.props.updateState({loginUsername : text})}
				value={this.props.loginUsername}
				placeholder="Enter your Username"
				placeholderTextColor="#33FFCC"
				/>
			</View>
			<View style={{height: 25}}/>
			<View style={styles.pseudoInput}>
				<Icon name="lock-outline" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
				<TextInput 
				secureTextEntry={true}
				style={{height: 35, color: "#FFF", fontFamily: 'Rajdhani', width: "85%", fontSize: 17}}
				onChangeText={(text) => this.props.updateState({loginPassword : text})}
				value={this.props.loginPassword}
				placeholder="Enter your Password"
				placeholderTextColor="#33FFCC"
				/>
			</View>
			<TouchableOpacity style={styles.registerButton} onPress={()=>{this.props.tryLogin()}}>
			<Text style={styles.registerButtonColor}>LOGIN</Text>
			</TouchableOpacity>
			</View>
			)
	}
}
const styles = {
	pseudoInput : {
		borderBottomColor: "#FFF", 
		borderBottomWidth: 1, 
		width: "80%", 
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
     	alignItems: 'flex-start',
	},
	registerButton : {
		flex: 1,
		borderColor: "#33FFCC", 
		borderWidth: 1, 
		width: "80%", 
		justifyContent : "center",
		// alignContent: "center",
		alignItems: "center",	
		marginTop: "15%",
		paddingTop: 5,
	},
	registerButtonColor : {
		color : "#33FFCC",
		fontSize: 20,
		fontFamily: 'Rajdhani',
	}
}