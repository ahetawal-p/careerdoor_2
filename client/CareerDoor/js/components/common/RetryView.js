import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Button
} from 'react-native'
import LottieView from 'lottie-react-native'
import * as COLOR from '../../utils/colors'
import { DISCONNECTED } from '../../constants'


export default class RetryView extends PureComponent {

  componentDidMount() {
    this._anim.play()
  }

  render() {
    return (
      <View style={styles.errorContainer}>
        <View style={{ height:100 }}>
          <LottieView
            ref={(ref) => { this._anim = ref }}
            source={DISCONNECTED}
            loop
            enableMergePathsAndroidForKitKatAndAbove
          />
        </View>
        <Text style={styles.errorText}> {this.props.errorMsg} </Text>
        <Button
          onPress={this.props.onRetryClick}
          title="Retry"
          color={COLOR.blue600}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  errorContainer: {
    alignSelf:'center'
  },
  errorText:{
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'gray'
  }

});
