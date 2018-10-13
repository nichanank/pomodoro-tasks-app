import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, Switch, View, Button, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { Constants } from 'expo'
import { vibrate } from './utils'

import tasks from './tasks'
import TasksList from './TasksList'
import AddTaskForm from './AddTaskForm'
import Row from './Row'

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

function TaskInput() {
  return (
    <View style={styles.taskInput}>
      <TextInput value="asdfasdfasdfadsf" />
    </View>
  )
}

export default class App extends Component {
  static propTypes = {
    timeleft: PropTypes.number,
    activeMode: PropTypes.bool,
    newSession: PropTypes.bool,
    showTasks: PropTypes.bool,
    showForm: PropTypes.bool,
  }
  state = {
      timeleft: TIME_LIMITS.activeTimer,
      activeMode: true,
      newSession: true,
      tasks: tasks,
      showForm: false,
      showTasks: false,
  }

  componentDidMount() {
    this.setState({
      timeleft: TIME_LIMITS.activeTimer,
      activeMode: true,
      newSession: true,
      tasks: tasks,
      showForm: false,
      showTasks: false,
    })
  }

  decrement = () => {
    if (this.state.timeleft === 0) {
      vibrate()
      clearInterval(this.timer)
      this.setState({ activeMode: !this.state.activeMode })
    } else {
      this.setState({
        timeleft: this.state.timeleft - 1
      })
    }
  }
  startTimer() {
    this.timer = setInterval(this.decrement, 1000)
    if (this.state.newSession) {
      (this.state.activeMode) ?
        this.setState({ newSession: false, timeleft: TIME_LIMITS.activeTimer }) :
        this.setState({ newSession: false, timeleft: TIME_LIMITS.breakTimer })
      }
    }
  stopTimer() {
    clearInterval(this.timer)
    !this.state.newSession && this.setState({ timeleft: this.state.timeleft });
  }
  resetTimer() {
    clearInterval(this.timer)
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

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm,
    }))
  }

  toggleTasks = () => {
    this.setState(prevState => ({
      showTasks: !prevState.showTasks,
    }))
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <StatusBar barStyle='light-content'/>
        <Text style={styles.titleText}>Pomodoro Timer</Text>
        <View style={styles.timerContainer}>
          <Timer interval={this.state.timeleft} />
        </View>
        <View style={styles.buttonsContainer}>
          <TimerButton title='Start' textColor='#ddd' backgroundColor='#3d7247' onPress={() => this.startTimer()} />
          <TimerButton title='Stop' textColor='#ddd' backgroundColor='#724141' onPress={() => this.stopTimer()} />
          <TimerButton title='Reset' textColor='#ddd' backgroundColor='#415f72' onPress={() => this.resetTimer()} />
        </View>
        <TimerSwitch activeMode={this.state.activeMode} onToggle={() => this.switchTimers()} />
        <Button title="Show Tasks" onPress={this.toggleTasks} />
        {this.state.showTasks && <ScrollView>
          {tasks.map(task => <Row {...task} /> )}
          </ScrollView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#1a1b1c',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60
  },
  titleText: {
    color: '#fff',
    fontSize: 28,
    marginTop: 30,
    padding: 20
  },
  timerContainer: {
    backgroundColor: '#1a1b1c',
    alignItems: 'center',
    marginVertical: 40
  },
  timerText: {
    fontSize: 76,
    color: '#fff',
    fontWeight: '200',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: 30
  },
  button: {
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 18,
  },
  buttonBorder: {
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderWidth: 2,
    borderRadius: 75,
    alignItems: 'center'
  },
  switchContainer: {
    flexDirection :'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
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
