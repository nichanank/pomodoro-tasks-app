import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Constants } from 'expo'

export default class AddTaskForm extends React.Component {
  static propTypes = {
    addTask: PropTypes.func,
  }
  state = {
    title: '',
    timeSpent: 0,
  }
  render() {
    return(
      <View>
        <TextInput value={this.state.title} />
        <TextInput value={this.state.timeSpent} />
        <Button title="New Task" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
  }
})
