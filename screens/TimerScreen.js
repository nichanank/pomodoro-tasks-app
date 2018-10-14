import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, TextInput, Switch, View, Button, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { Constants } from 'expo'
import { vibrate } from '../utils'
import { createStackNavigator } from 'react-navigation'
import AddTaskScreen from './AddTaskScreen'
import TaskDetailsScreen from './TaskListScreen'

import tasks from '../tasks'
import TasksList from '../TasksList'
import AddTaskForm from '../AddTaskForm'
import Row from '../Row'

const TIME_LIMITS = {
  activeTimer: 1500, //25 minutes
  breakTimer: 300 //5 minutes
}

function Timer({ interval }) {
  let minutes = Math.floor(interval / 60);
  let seconds = interval % 60;
  return (
    <Text style={styles.timerText}>
      {minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
    </Text>
  )
}

function TimerButton({ title, textColor, backgroundColor, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPress={onPress}>
        <View style={styles.buttonBorder}>
          <Text style={[styles.buttonTitle, {color: textColor}]}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}

function TimerSwitch({ activeMode, onToggle }) {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchText}>Break</Text>
      <Switch thumbTintColor='#ddd' value={activeMode} onValueChange={onToggle} />
      <Text style={styles.switchText}>Active</Text>
    </View>
  )
}

export default class TimerScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    hideNavBar: true,
    headerTitle: 'Pomodoro Timer',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#1a1b1c'
    },
    headerRight: <Button title="Create Task" onPress={() => {navigation.navigate('AddTask', tasks: tasks)}} />,
})

  static propTypes = {
    timeleft: PropTypes.number,
    activeMode: PropTypes.bool,
    newSession: PropTypes.bool,
    timerIsRunning: PropTypes.bool,
  }
  state = {
      timeleft: TIME_LIMITS.activeTimer,
      activeMode: true,
      newSession: true,
      tasks: tasks,
      timerIsRunning: false,
  }

  decrement = () => {
    if (this.state.timeleft === 0) {
      vibrate()
      clearInterval(this.timer)
      this.setState({ timerIsRunning: false })
    } else {
      this.setState({
        timeleft: this.state.timeleft - 1
      })
    }
  }
  startTimer() {
    if (!this.state.timerIsRunning) {
      this.timer = setInterval(this.decrement, 1000)
      this.setState({ timerIsRunning: true })}
    if (this.state.newSession) {
      (this.state.activeMode) ?
        this.setState({ newSession: false, timeleft: TIME_LIMITS.activeTimer }) :
        this.setState({ newSession: false, timeleft: TIME_LIMITS.breakTimer })
      }
    }

  stopTimer() {
    clearInterval(this.timer)
    !this.state.newSession && this.setState({ timeleft: this.state.timeleft })
    this.state.timerIsRunning && this.setState({ timerIsRunning: false })
  }

  resetTimer() {
    clearInterval(this.timer)
    this.setState({ timerIsRunning: false })
    this.state.activeMode ?
      this.setState({ newSession: true, timeleft: TIME_LIMITS.activeTimer }) :
      this.setState({ newSession: true, timeleft: TIME_LIMITS.breakTimer })
    }

  switchTimers() {
    this.state.activeMode ? this.setState({ timeleft: TIME_LIMITS.breakTimer}) : this.setState({ timeleft: TIME_LIMITS.activeTimer})
    this.setState({
      activeMode: !this.state.activeMode,
      newSession: true,
    });
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={styles.timerContainer}>
          <Timer interval={this.state.timeleft} />
        </View>
        <View style={styles.buttonsContainer}>
          <TimerButton title='Start' textColor='#ddd' backgroundColor='#3d7247' onPress={() => this.startTimer()} />
          <TimerButton title='Stop' textColor='#ddd' backgroundColor='#724141' onPress={() => this.stopTimer()} />
          <TimerButton title='Reset' textColor='#ddd' backgroundColor='#415f72' onPress={() => this.resetTimer()} />
        </View>
        <TimerSwitch activeMode={this.state.activeMode} onToggle={() => this.switchTimers()} />
        <Button title="Show Tasks" onPress={() => {this.props.navigation.navigate('TaskList', tasks: tasks)}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1a1b1c',
    alignItems: 'center',
    padding: 40,
  },
  timerContainer: {
    backgroundColor: '#1a1b1c',
    alignItems: 'center',
    padding: 40,
    marginVertical: 30,
  },
  timerText: {
    fontSize: 82,
    color: '#fff',
    fontWeight: '200',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 40,
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 16,
  },
  buttonBorder: {
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center'
  },
  switchContainer: {
    flexDirection :'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchText: {
    margin: 15,
    color: '#ddd',
    fontSize: 18,
    fontWeight: '500',
  },
  taskInput: {
    borderColor: '#eee',
    backgroundColor: '#F5F5F5',
    height: 25,
    width: 250,
  }
})
