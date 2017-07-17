import React, {Component} from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Day from './Day.js';

let t0 = null;
export default class MonthView extends Component {
	componentDidUpdate(){
		console.log(new Date().getTime() - t0);
	}
	shouldComponentUpdate(nextProps){
		return nextProps.monthShowing !== this.props.monthShowing || nextProps.selectedDate !== this.props.selectedDate;
	}
	render(){
		t0 = new Date().getTime();

		let _year = moment(this.props.monthShowing).format("MM"), _month = moment(this.props.monthShowing).format("MM");
		let daysBefore = moment(this.props.monthShowing).set('date', 1).format('e');
		let tempCal = {};
		for (let i = daysBefore; i > 0; --i) {
			let prevDay = moment(this.props.monthShowing).set('date', 1).subtract(i, 'days').format("YYYY-MM-DD");
			tempCal[prevDay] = {
				events: this.props.tasks.filter((event)=>{return event.dateStart === prevDay })
			};
		}
		for (let i = 0; i < 35 + (7 - daysBefore); i++) {
			let nextDay = moment(this.props.monthShowing).set('date', 1).add(i, 'days').format("YYYY-MM-DD");
			tempCal[nextDay] = {
				events: this.props.tasks.filter((event)=>{return event.dateStart === nextDay })
			};
		} /* To iteratively index into cal obj */
		let _calArray = Object.keys(tempCal); 
		/* Create calendar days with Day components, each has it's own style depending on whether its in the month, is selected, or is today */
		let i = -1;
		return (
			<View style={this.props.styles.calendarStyle}>
			{_calArray.map((day)=>{
				i++;
				let inThisMonth = _calArray[i].substring(5, 7) !== _month ? "#616161" : "#FFFFFF";
				let isToday = _calArray[i] === this.props.today ? true : false;
				let selectedDate = _calArray[i] === this.props.selectedDate ? true : false;
				let dayStyles = {
					dayText: {
						color: selectedDate ? "#242424" : isToday ? "#33FFCC" : inThisMonth,
						fontFamily: 'Rajdhani',
						fontSize: 20
					}, dayBlock: {
						borderWidth: selectedDate ? 1 : 0,
						borderColor: selectedDate ? "#33FFCC" : "transparent",
						backgroundColor: selectedDate ? "#33FFCC" : "transparent",
						paddingTop: 2,
						// width: '14.3%',
						width: 45.5,
						height: 40,
						alignItems: 'center'
					}
				};

				return (<Day date={_calArray[i]} style={dayStyles} key={i} tasks={tempCal[_calArray[i]]}selectDate={this.props.selectDate.bind(this)}/>)
			})}
			</View>
			)
	}
}