import React, {Component} from 'react';

import {View, StyleSheet, Text, Image, TouchableOpacity, AsyncStorage, Alert} from 'react-native';

import ViewContainer from './components/ViewContainer.js';
import Loader from './components/Loader.js';
import Login from './Login.js';
import Register from './Register.js';

import store from 'react-native-simple-store';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

export default class EntryPortal extends Component {
	constructor(props){
		super();
		this.state = {
			showLogin : false,
			registerUsername : "",
			registerPassword: "",
			registerBedHour: "",
			loginUsername : "",
			loginPassword: "",
			showLoader : false
		}
	}
	toggleShowLogin(){
		this.refs[this.state.showLogin ? "login" : "register"].fadeOut(300);
		this.setState({
			showLogin: !this.state.showLogin
		}, ()=>{
			this.refs[this.state.showLogin ? "login" : "register"].fadeIn(300);
		})
	}
	updateState(obj){
		this.setState(obj);
	}
	tryLogin(){
		this.setState({showLoader: true}, ()=>{
			console.log("Attempting to log in");
			this.props.ddp.call("login", [{ user : { username : this.state.loginUsername }, password : this.state.loginPassword } ], (err, res)=>{
				/* Make sure there weren't any errors */
				if(err || res.reason !== undefined){
					Alert.alert(
						'Oops!',
						err.reason || "Error Logging In",
						[
						{text: 'OK', onPress: () => console.log('OK Pressed')},
						])
					return false;
				} else {
					console.log("Login success, setting up user for this device");
					/* Log the user in after writing them into Async Storage */
					this.props.ddp.call("getUserByName", [this.state.loginUsername], (err, res)=>{
						this.setState({showLoader: false}, ()=>{
							if(err){
								console.log("Pt 2: " + err)
							} else {
								store.save("taduUserObj", JSON.stringify(res));
								this.props.changeLoginState(res)
							}
						});
					});
				}
			});
		});
	}
	tryRegister(){
		this.setState({showLoader : true}, ()=>{
			console.log("trying to register!");
			let user = {
				username: this.state.registerUsername,
				password: this.state.registerPassword,
				// email: this.state.registerStateData.registerEmail,
				profile: {
					pic: null,
					bedHour: moment().add(9, 'hours').format("HH:mm"),
					tut : {
						'login' : false,
						'schedule' : false,
						'addTasks': false,
					}
				}
			};
			this.props.ddp.call("registerRemote", [user], (err, res)=>{
				this.setState({showLoader: false}, ()=>{
					if(err || res.reason !== undefined){

						Alert.alert(
							'Oops!',
							res.reason || "Error Logging In",
							[
							{text: 'OK', onPress: () => console.log('OK Pressed')},
							])
						return false;
					} else if(res !== null){
						console.log("Changing State", res);
						user._id = res;
						store.save("taduUserObj", JSON.stringify(user));
						this.props.changeLoginState(res)
					} else {
						console.log("Something has gone horribly wrong")
					}
				});
			})
		});
	}
	render(){
		return (
			<ViewContainer style={{flex: 1, flexDirection: "column", justifyContent: "center"}}>
			<View style={{justifyContent: "center", alignItems: 'center'}}>
			<Image
			source={require('./img/tadu-icon-master.png')}
			style={{width: 50, height: 50}}
			resizeMode="contain"
			/>
			<Image
			source={require('./img/tadu-brand-white-medium.png')}
			style={{width: 50, height: 50}}
			resizeMode="contain"
			/>
			</View>
			{
				this.state.showLoader ? 
				<Loader />
				:
				this.state.showLogin ?
				<Animatable.View ref="login" style={{flex: 1}}>
				<Login 
				updateState={this.updateState.bind(this)}  
				loginUsername={this.state.loginUsername} 
				loginPassword={this.state.loginPassword} 
				tryLogin={this.tryLogin.bind(this)}
				style={this.props.style}
				/>
				</Animatable.View>
				:
				<Animatable.View ref="register" style={{flex: 1}}>
				<Register 
				updateState={this.updateState.bind(this)}  
				registerUsername={this.state.registerUsername} 
				registerPassword={this.state.registerPassword} 
				registerBedHour={this.state.registerBedHour}
				tryRegister={this.tryRegister.bind(this)}
				style={this.props.style}
				/>
				</Animatable.View>
			}
			<TouchableOpacity onPress={this.toggleShowLogin.bind(this)} style={styles.toggleShowLoginText}>
			<Text style={[styles.white, this.props.style || {}]}>{this.state.showLogin ? "Need to register?" : "Already Registered?" } <Text style={styles.green}>{this.state.showLogin ? "Get Started" : "Log in" }</Text></Text>
			</TouchableOpacity>
			</ViewContainer>
			)
	}
}

const styles = {
	toggleShowLoginText : {
		flex: 1, 
		justifyContent : 'flex-end', 
		alignItems: "center", 
		marginBottom: "5%",
	},
	white : {
		color: "#FFF",
	},
	green : {
		color: "#33FFCC",
	}
}
