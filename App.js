import React, { Component } from 'react'
import { StyleSheet, FlatList, Text, TextInput, Switch, View, Button, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons'

import AddTaskScreen from './screens/AddTaskScreen'
import TimerScreen from './screens/TimerScreen'
import TaskListScreen from './screens/TaskListScreen'

const MainStack = createStackNavigator(
  {
    Timer: TimerScreen,
    AddTask: AddTaskScreen,
    Tasks: TaskListScreen
  },
  {
    initialRouteName: 'Timer',
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#1a1b1c'
      }
    }
  }
)

//top navigator
const MainNavigator = createBottomTabNavigator(
  {
    Timer: MainStack,
    Tasks: TaskListScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: '#d29104'
    }
  }
)

MainNavigator.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
      name={`ios-settings${focused ? "" : '-outline'}`}
      size={25}
      color={tintColor}
    />
  )
}

const AppNavigator = createSwitchNavigator({
    Timer: TimerScreen,
    Main: MainNavigator
  })

export default class App extends React.Component {
  render() {
    return(
    <AppNavigator />
  )}
}
