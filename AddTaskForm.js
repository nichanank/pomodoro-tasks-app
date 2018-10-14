import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import { createStackNavigator} from 'react-navigation'

export default class AddTaskForm extends React.Component {
  static navigationOptions = {
    headerTitle: "New Task",
  }

  state = {
    title: '',
    timeSpent: 0,
    isFormValid: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.title != prevState.title) {
      this.validateForm()
    }
  }

  validateForm = () => {
    (this.state.title.length > 0 && this.state.title.length <= 50) ? this.setState({isFormValid: true}) : this.setState({isFormValid: false})
  }

  handleTitleChange = title => {
    if (title.length <= 50) { //input validation
      this.setState({title})
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput placeholder="Task Title" value={this.state.title} onChangeText={this.handleTitleChange} />
        </View>
        <View style={styles.button}>
          <Button title="Add Task" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // margin: 40,
    borderRadius: 10,
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  button: {

  }
})
