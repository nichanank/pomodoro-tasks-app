import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createStackNavigator} from 'react-navigation'
import AddTaskForm from '../AddTaskForm'
import TimerScreen from './TimerScreen'
import AddTaskScreen from './AddTaskScreen'
import TasksList from '../TasksList'
import tasks from '../tasks'

export default class TaskListScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: "Task List",
  })

  render() {
    return(
      <View style={styles.taskListContainer}>
        <TasksList tasks={tasks} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  taskListContainer: {
    flex: 1,
    padding: 20,
  }
})
