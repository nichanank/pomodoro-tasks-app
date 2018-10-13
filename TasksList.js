import React from 'react'
import { FlatList } from 'react-native'
import Row from './Row'
import { PropTypes } from 'prop-types'

const renderItem = obj => <Row title={obj.item.title} timeSpent={obj.item.timeSpent} />

const TasksList = props => (
  <FlatList renderItem={renderItem} data={props.tasks} />
)

TasksList.propTypes = {
    renderItem: PropTypes.func,
    tasks: PropTypes.array,
}

export default TasksList
