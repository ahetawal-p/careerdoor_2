import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import * as COLOR from '../../utils/colors'

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          style={[{ height: 80 }]}
          size="large"
          color={COLOR.white}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.lightBlue600,
    justifyContent:'center'
  },

});
