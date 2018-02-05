import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default class Splash extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          style={[{ height: 80 }]}
          size="large"
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent:'center'
  },

});
