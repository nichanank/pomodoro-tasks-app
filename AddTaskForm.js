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
        <TextInput style={styles.input} />
        <TextInput style={styles.input}  />
        <Button title="New Task" onPress={this.setState({title: 'test'})} />
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
