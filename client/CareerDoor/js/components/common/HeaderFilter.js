import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker } from 'react-native'
import * as COLOR from '../../utils/colors'

export default class HeaderFilter extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      langauge:'java'
    }
  }

  render() {
    return (
      <View style={styles.loadingContainer}>
        <Picker
          style={{ width:100 }}
          selectedValue={this.state.language}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loadingContainer: {
    flex:1,
    backgroundColor: COLOR.lightBlue600,
    justifyContent:'center'
  },

});
