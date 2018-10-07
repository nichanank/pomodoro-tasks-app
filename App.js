import React, { Component } from 'react'
import { StyleSheet, Text, Switch, View, Button, TouchableOpacity, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { vibrate } from './utils'

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

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      timeleft: TIME_LIMITS.activeTimer,
      activeMode: true,
      newSession: true
    }
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
      if (this.state.activeMode) {
        this.setState({
          newSession: false,
          timeleft: TIME_LIMITS.activeTimer
        })
      } else {
        this.setState({
          newSession: false,
          timeleft: TIME_LIMITS.breakTimer
        })
      }
    }
  }
  stopTimer() {
    clearInterval(this.timer)
    if (!this.state.newSession) {
      this.setState({
        timeleft: this.state.timeleft
      });
    }
  }
  resetTimer() {
    clearInterval(this.timer)
    if (this.state.activeMode) {
      this.setState({
        newSession: true,
        timeleft: TIME_LIMITS.activeTimer
      })
    } else {
      this.setState({
        newSession: true,
        timeleft: TIME_LIMITS.breakTimer
      })
    }
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
    marginTop: 40,
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
    margin: 30
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
    marginHorizontal: 15,
    color: '#ddd',
    fontSize: 18,
    fontWeight: '500',
  }
})
