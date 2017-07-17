import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ViewContainer from './components/ViewContainer.js';
import store from 'react-native-simple-store';


export default class AddTask extends Component {
	constructor(props){
		super(props);

		this.state = {
			message: "",
			awaitingConfirmation: false,
			messagesList: [],
			recipient: "tadu",
			user: null
		}
	}
	componentDidMount(){
		this.setState({
			user : this.props.user
		})
	}
	updateMessage(obj){
		this.setState(obj);
	}
	submitMessage(){
		if(this.state.message.trim() === ""){
			return false;
		}
		// let protoTask = process();
		// addTask(protoTask);
		let newMessage = {
		"text" : this.state.message,
		sender: this.state.user.username,
		timestamp: new Date().getTime()
		}
		let messagesList = this.state.messagesList;
		messagesList.push(newMessage);
		this.setState({
			messagesList: messagesList,
			message : ""
		})
	}
	addTask(task){
		let task  = {
			text: task.text,
			dateStart: task.dateStart,
			timeStart: task.timeStart,
			dateEnd: task.dateEnd,
			timeEnd: task.timeEnd,
			tag: task.tagType,
			completed: false,
			createdAt: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).getTime(),
			userId : this.state.user._id,
			desc : task.desc || null,
			alarm: task.alarm || null,
			timeUTC: task.timeUTC,
			timeUTCEnd: task.timeUTCEnd,
			sharingWith: task.sharingWith || []
		}
		this.props.ddp.call("addTask", [task, JSON.parse(store.get("taduUserObj"))], (err, res)=>{
			if(err){
				Alert(err);
				return false;
			}
			Alert("Task Added");
		});
	}
	render(){
		return(
			<ViewContainer>
			<View style={styles.nav}>
			<Icon name="chevron-left" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
			<Text style={styles.navText}>@{this.state.recipient}</Text>
			<Icon name="lock-outline" size={30} style={{"height" : 30, width: "15%", color: '#FFF'}}/>
			</View>
			<View style={styles.chatWrapper}>
			{this.state.messagesList.length < 1 ? 
				<Text>Start a conversation with @{this.state.recipient}</Text> 
			:  <View style={styles.messagesWrapper}>
			{this.state.messagesList.map((message)=>{
				return <View>{message.text}</View>
			})}
			</View>
			}
			</View>
			<View style={styles.inputWrapper}>
			<TextInput 
			placeholder="Enter your Password"
			placeholderTextColor="#33FFCC"
			onChange
			/>
			<TouchableOpacity style={styles.submitButton}>
			<Icon name="chevron-right" size={30} style={{"height" : 30, width: "15%", color: this.state.message.trim() === "" ? '#424242' : '#33FFCC'}}/>
			</TouchableOpacity>
			</View>

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