import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
const ViewContainer = (props)=> {
 return(
 	<View style={[styles.viewContainer, props.style || {}]}>
 	      <StatusBar backgroundColor="#242424" barStyle="light-content"/> 

	<View style={{height: 20, backgroundColor: '#242424'}}/>
 	{props.children}
 	</View>
 	)
}

const styles = StyleSheet.create({
	viewContainer : {
	flex: 1,
	flexDirection: 'column',
	justifyContent: "flex-start",
	alignItems: 'stretch',
	backgroundColor: '#242424'
}
})
export default ViewContainer;