import React, {Component} from 'react';

import {View, StyleSheet, Text, ListView, StatusBar} from 'react-native';
import moment from 'moment';

import SwipeableViews from 'react-swipeable-views-native';

import Calendar from './Calendar.js';
import Loader from './components/Loader.js';
import AddTask from './AddTask.js';

let tasks = [
{text: "dishes", date: "2017-06-18", timeStart : "02:00", completed : false},
{text: "cheese", date: "2017-06-18", timeStart : "12:00", completed : false},
{text: "filler Text", date: "2017-06-19", timeStart : "11:00", completed : false}
]
export default class MainLayout extends Component {
	constructor(props){
		super();

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2})

		this.state = {
			tasksDataSource : ds.cloneWithRows(tasks),
			monthShowing : moment().format("YYYY-MM-DDTHH:mm"),
			selectedDate: moment().format("YYYY-MM-DD"),
			today: moment().format("YYYY-MM-DD"),
			connected: false,
		}
	}
	selectDate(date){
		this.setState({
			selectedDate : date
		});
	}
	nextMonth(){
		this.setState({
			monthShowing: moment(this.state.monthShowing, "YYYY-MM-DD").add(1, 'months').format("YYYY-MM-DDTHH:mm")
		});
	}
	prevMonth(){
		this.setState({
			monthShowing: moment(this.state.monthShowing, "YYYY-MM-DD").subtract(1, 'months').format("YYYY-MM-DDTHH:mm")
		});
	}
	componentDidUpdate(){
    // alert(new Date().getTime() - t0);
}
toggleTask(newTask){
	let taskIndex = tasks.findIndex((task)=>{return task.text === newTask.text})
	tasks[taskIndex].completed = !tasks[taskIndex].completed;
}
render(){
	return(
		this.props.user === null ? 
		/* Display Loader */
		<Loader />
		:
		<SwipeableViews style={styles.slideContainer}>
		<Calendar 
		nextMonth={this.nextMonth.bind(this)}
		prevMonth={this.prevMonth.bind(this)}
		monthShowing={this.state.monthShowing}
		selectedDate={this.state.selectedDate}
		today={this.state.today}
		selectDate={this.selectDate.bind(this)}
		tasksDataSource={this.state.tasksDataSource}
		toggleTask={this.toggleTask.bind(this)}
		/>
		<AddTask />

		</SwipeableViews>

		)
}
}
const styles = {
	slideContainer : {
		height: "100%",
		width: "100%"
	}
};

