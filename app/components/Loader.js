import React, {Component} from 'react';
import {View} from 'react-native';
import ViewContainer from './ViewContainer.js'
import { Bubbles} from 'react-native-loader';

const Loader = (props) => {
	return (
		<ViewContainer style={{justifyContent: 'flex-start', alignItems: 'center'}}>
		  <Bubbles size={10} color="#FFF" style={{marginTop: "5%"}}/>
		  <View style={{height: 10}}/>
		  <Bubbles size={10} color="#FFF" style={{marginTop: "5%"}}/>
		  <View style={{height: 10}}/>
		  <Bubbles size={10} color="#FFF" style={{marginTop: "5%"}}/>
		</ViewContainer>
		)
}
export default Loader;