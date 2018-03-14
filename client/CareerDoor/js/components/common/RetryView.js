import React,  { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Button
} from 'react-native'
import * as COLOR from '../../utils/colors'

export default class RetryView extends PureComponent {

  render() {
    return (
      <View style={styles.errorContainer}>
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
