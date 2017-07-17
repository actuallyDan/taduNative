import React, {Component} from 'react';

import {View, StyleSheet, Text, ListView, StatusBar} from 'react-native';
import moment from 'moment';

import SwipeableViews from 'react-swipeable-views-native';
import store from 'react-native-simple-store';

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

		// var ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2})

		this.state = {
			tasksDataSource : null
			monthShowing : moment().format("YYYY-MM-DDTHH:mm"),
			selectedDate: moment().format("YYYY-MM-DD"),
			today: moment().format("YYYY-MM-DD"),
			connected: false,
			tasks : []
			user: JSON.parse(store.get("taduUserObj"))
		}
	}
	componentDidMount(){
		/* Get tasks */
		this.props.ddp.call("getTasks", [this.state.user], (err, res)=>{
			if(err){
				Alert("Error in Getting Tasks");
				console.log(err)
			} else {		
				let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 != r2})
				this.setState({tasksDataSource : ds.cloneWithRows(res),tasks: res});
			}
		})
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
		tasks={this.state.tasks || []}
		/>
		<AddTask ddp={this.props.ddp} user={this.state.user}/>

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

