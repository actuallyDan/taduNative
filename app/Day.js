/* Day component for Tadu App 
*
* Displays a given date from this month
*
*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Day = (props) => {
	const selectDate = (e) => {
		props.selectDate(props.date);
		}
	return (
		<TouchableOpacity onPress={selectDate} style={props.style.dayBlock}>
		<Text style={props.style.dayText}>
		{parseInt(props.date.substring(8, 10))}
		</Text>	
			<Icon name="checkbox-blank-circle" size={30} style={{"height" : 10, width: "15%", color: props.events.length > 0 ? '#33FFCC' : "#242424"}}/>
		</TouchableOpacity>
		);
};
export default Day;