import React, {Component} from 'react';

import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CalYear extends Component {
	constructor(props){
		super();
	}
	  _renderTaskRow(task){
    return(
      <TouchableOpacity onPress={()=>{console.log(task)}} style={styles.taskRow}>
	  <TouchableOpacity style={styles.taskCheckbox} onPress={()=>{this.props.toggleTask(task)}}>
	  <Icon name={task.completed ? "checkbox-marked-outline" : "checkbox-blank-outline"} style={{color: task.completed ? "#1de9b6" : "#424242"}}/>
	  </TouchableOpacity>
      <Text style={[styles.taskText, task.completed ? styles.taskCompleted : {}]}> 
      {task.text}
      </Text>
      <View style={{flex: 1}}/>
      </TouchableOpacity>
      )
  }
	render(){
	return (
		<ListView style={{marginTop: 10}} renderRow={(task)=>{return this._renderTaskRow(task)}} dataSource={this.props.tasksDataSource}>
      </ListView>
	)
}
}
const styles = StyleSheet.create({
	taskRow : { 
		height: 20,
		borderBottomColor: '#424242',
		flexDirection: 'row',
	},
	taskText : {
		color : "#FFF",
		marginLeft: 10,
		fontSize: 20,      
		fontFamily: 'Rajdhani',
	},
	taskCompleted : {
		textDecorationLine: 'line-through'
	},
	taskCheckbox : {
		width: 20,
		height: 20
	}
})
