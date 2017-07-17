import React, {Component} from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalYear = (props) =>{
	return (
	<View style={{flex: 0.31, backgroundColor: '#242424'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{width: 176, justifyContent: 'center'}}> 
      <Text style={{color: "#FFF", fontSize: 20, marginLeft: "5%",fontFamily: 'Rajdhani',}}>{props.monthShowing}</Text>
      </View>
      <View style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      </View>
      <TouchableOpacity onPress={props.prevMonth} style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="chevron-left" size={35} color="#FFF" style={{textAlign : "center"}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.nextMonth} style={{width: 48, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="chevron-right" size={35} color="#FFF" style={{textAlign : "center"}}/>
      </TouchableOpacity>
      </View>
      </View>
	)
}
export default CalYear;