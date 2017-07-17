import React, {Component} from 'react';

import moment from 'moment';
import {View, StyleSheet, Text, ListView, StatusBar} from 'react-native';

import ViewContainer from './components/ViewContainer.js';
import CalMonth from './CalMonth.js';
import CalYear from './CalYear.js';
import CalWeek from './CalWeek.js';
import MonthView from './MonthView.js';
import Tasks from './Tasks.js';

export default class Calendar extends Component {
	render(){
		return (
			<ViewContainer>
			{/* Display Normal App Stuff */}
			<View style={{height: "8%", backgroundColor: '#242424'}} >
			<CalMonth monthShowing={moment(this.props.monthShowing, "YYYY-MM-DDTHH:mm").format("MMMM")} />
			</View>
			<View style={{height: "8%" , backgroundColor: '#242424'}} >
			<CalYear monthShowing={moment(this.props.monthShowing, "YYYY-MM-DDTHH:mm").format("YYYY")}
			nextMonth={this.props.nextMonth.bind(this)}
			prevMonth={this.props.prevMonth.bind(this)}
			/>
			</View>
			<View style={{height: "4%", backgroundColor: '#242424', marginBottom: 10}}>
			<CalWeek />
			</View>
			<View style={{height: "42.1%" , backgroundColor: '#242424'}}>
			<MonthView 
			monthShowing={this.props.monthShowing}
			month={this.props.monthShowing.substring(5,7)}
			year={this.props.monthShowing.substring(0,4)}
			tasks={[]}
			styles={styles}
			selectedDate={this.props.selectedDate}
			today={this.props.today}
			selectDate={this.props.selectDate.bind(this)}
			/>
			</View>
			<View style={{height: "35%", backgroundColor: "#242424"}}>
			<Tasks tasksDataSource={this.props.tasksDataSource} toggleTask={this.props.toggleTask.bind(this)}/>
			</View>
			</ViewContainer>
			)
	}
}
const styles = {
  calendarStyle : {
    flex: 0.8,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
};