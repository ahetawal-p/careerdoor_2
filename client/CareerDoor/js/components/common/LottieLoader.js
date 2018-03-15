import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import { TRAIL_LOADING } from '../../constants'


export default class LottieLoader extends PureComponent {

  componentDidMount() {
    this._anim.play()
  }

  render() {
    let animation = TRAIL_LOADING
    if (this.props.source) {
      animation = this.props.source
    }
    return (
      <View style={[styles.loader, this.props.style]}>
        <LottieView
          ref={(ref) => { this._anim = ref }}
          source={animation}
          loop
          enableMergePathsAndroidForKitKatAndAbove
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  loader: {
    height:100,
    paddingVertical: 20
  }

});
