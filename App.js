import React from 'react';
import { StyleSheet, Text, View, StatusBar, AsyncStorage } from 'react-native';

import { Font } from 'expo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import store from 'react-native-simple-store';

import ViewContainer from './app/components/ViewContainer.js';
import MainLayout from './app/MainLayout.js';
import EntryPortal from './app/EntryPortal.js';
import Loader from './app/components/Loader.js';

import DDPClient from 'ddp-client';

let ddpclient = new DDPClient({
  // All properties optional, defaults shown 
  host : "localhost",
  port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 1000,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available 
  // Change this depending on location (use ipconfig getifaddr en1 in Unix terminal)
  url: 'ws://10.0.0.93:3000/websocket',
  socketConstructor: WebSocket // Another constructor to create new WebSockets 
});
process.nextTick = setImmediate;

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      user : null,
      appReady: false,
      fontLoaded: false,
    }
  }
  componentWillMount(){
    ddpclient.connect((error, wasReconnect)=>{
      // If autoReconnect is true, this callback will be invoked each time 
      // a server connection is re-established 
      if (error) {
        console.log('DDP connection error!', error);
        return;
      }
      if (wasReconnect) {
        console.log('Reestablishment of a connection.');
      }
      console.log('connected!');
      this.checkIfLoggedIn();
    });
    /* Load in a stupid font beacuse React Native is built by fascists */

  }
  async componentDidMount(){
    await Font.loadAsync({
      'Rajdhani': require('./assets/fonts/Rajdhani.ttf'),
    });
    this.setState({
      fontLoaded: true
    })
  }
  /* While app is getting ready, see if the user is already logged in on this device and has their info in AyncStorage */
  checkIfLoggedIn(){
    try {
      const user = store.get('taduUserObj');
      if (user !== null){
        /* User is logged in on this device */
        console.log(user.username);

        this.setState({
          user: JSON.parse(user),
          appReady: true
        });
      } else {
        /* User is not logged in on this device take them to the login screen */
        this.setState({
          appReady: true
        });
      }
    } catch (error) {
      /* Error retrieving data */
      console.log(error);
      this.setState({
          appReady: true
      });
    }
  }
  changeLoginState(user){
    this.setState({
      user: user
    })
  }
  render() {
    return (
      <ViewContainer>
      {!this.state.appReady || !this.state.fontLoaded ? <Loader /> : this.state.user === null ? <EntryPortal style={{fontFamily: 'Rajdhani'}} changeLoginState={this.changeLoginState.bind(this)} ddp={ddpclient}/> : <MainLayout changeLoginState={this.changeLoginState.bind(this)} user={this.state.user} ddp={ddpclient}/>}
      </ViewContainer>
      );
  }
}
