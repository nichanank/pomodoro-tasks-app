import React from 'react'
import { FlatList } from 'react-native'
import Row from './Row'

const TasksList = props => {
  <FlatList
    renderItem={obj => <Row {...props} /> }
    data={tasks}
  />
}

export default TasksList
