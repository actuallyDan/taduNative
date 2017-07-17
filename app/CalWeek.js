import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CalWeek = ()=>{
	return (
		<View style={{flex: 1, flexDirection: 'row'}}>
      <Text style={style}>S</Text>
      <Text style={style}>M</Text>
      <Text style={style}>T</Text>
      <Text style={style}>W</Text>
      <Text style={style}>T</Text>
      <Text style={style}>F</Text>
      <Text style={style}>S</Text>
      </View>
		)
}
export default CalWeek;

const style = {
      fontFamily: 'Rajdhani',
      width: 45,
      color: "#1de9b6",
      textAlign: "center"
}