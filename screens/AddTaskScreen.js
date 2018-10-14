import React from 'react'
import { View } from 'react-native'
import { createStackNavigator} from 'react-navigation'
import AddTaskForm from '../AddTaskForm'
import TimerScreen from './TimerScreen'
import tasks from '../tasks'

export default class AddTaskScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: "New Task",
  })

  handleSubmit = formState => {
    this.props.navigation.navigate('Timer')
  }

  addTask = newTask => {
    this.props.navigation.setParams({tasks: [...tasks, newTask]})
    this.props.navigation.navigate('Timer', tasks: tasks)
  }

  render() {
    return(
      <AddTaskForm onSubmit={this.addTask}/>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    AddTask: AddTaskScreen,
    Timer: TimerScreen,
  },
  {
    initialRouteName: 'Timer',
  }
)
