/* Day component for Tadu App 
*
* Displays a given date from this month
*
*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Day = (props) => {
	const selectDate = (e) => {
		props.selectDate(props.date);
		}
	return (
		<TouchableOpacity onPress={selectDate} style={props.style.dayBlock}>
		<Text style={props.style.dayText}>
		{parseInt(props.date.substring(8, 10))}
		</Text>				
		</TouchableOpacity>
		);
};
export default Day;