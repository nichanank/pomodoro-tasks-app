import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  row: {
    padding: 1,
  }
})

const Row = props => (
  <View style={styles.row}>
    <Text> {props.title} {props.timeSpent} </Text>
  </View>
)

export default Row
