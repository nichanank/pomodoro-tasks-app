import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, TextInput, Switch, View, Button, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { createStackNavigator } from 'react-navigation'
import AddTaskScreen from './screens/AddTaskScreen'
import TimerScreen from './screens/TimerScreen'

const AppNavigator = createStackNavigator(
  {
    AddTask: AddTaskScreen,
    Timer: TimerScreen
  },
  {
    initialRouteName: 'Timer',
  }
)

export default class App extends Component {

  render() {
    return ( <AppNavigator /> )
  }
}
