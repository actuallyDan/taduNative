import React, {Component} from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalMonth = (props)=>{
	 return (
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: 176, justifyContent: 'center'}}> 
      <Text style={{color: "#FFF", fontSize: 30, marginLeft: "5%", fontFamily: 'Rajdhani'}}>{props.monthShowing}</Text>
      </View>
      <View style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="menu" size={35} color="#FFF" style={{textAlign : "center"}}/>
      </View>
      <View style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="view-dashboard" size={35} color="#FFF" style={{textAlign : "center"}}/>
      </View>
      <View style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="plus" size={35} color="#FFF" style={{textAlign : "center"}}/>
      </View>
      </View>
	 	)
}
export default CalMonth;