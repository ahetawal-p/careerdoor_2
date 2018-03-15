import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import * as COLOR from '../../utils/colors'
import LottieLoader from '../common/LottieLoader'
import { SPLASH_LOADING } from '../../constants'

export default class Splash extends PureComponent {

  render() {
    return (
      <View style={styles.loadingContainer}>
        <LottieLoader style={styles.loader} source={SPLASH_LOADING} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
    justifyContent:'center'
  },
  loader: {
    height:200,
  }

});
